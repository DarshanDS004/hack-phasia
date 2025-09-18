const express = require('express');
const cors = require('cors');
const path = require('path');
const mysql = require('mysql2');
const multer = require('multer');
const fs = require('fs');
const pdf = require('pdf-parse');
const Groq = require('groq-sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Groq AI
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('📁 Created uploads directory:', uploadsDir);
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const extension = path.extname(file.originalname);
        const nameWithoutExt = path.basename(file.originalname, extension);
        const uniqueName = `${timestamp}-${nameWithoutExt}${extension}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'text/plain', 'image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, text, and image files are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: fileFilter
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from client folder
app.use(express.static(path.join(__dirname, '../simplifier-client')));

// Database connection (optional for MVP)
let db = null;
if (process.env.DB_HOST) {
    db = mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'medical_reports'
    });

    db.connect((err) => {
        if (err) {
            console.log('Database connection failed:', err.message);
            console.log('Continuing without database (using localStorage instead)');
        } else {
            console.log('Connected to MySQL database');
        }
    });
}

// Function to extract text from different file types
async function extractTextFromFile(filePath, mimeType) {
    console.log('🔍 Attempting to extract text from:', path.basename(filePath));
    console.log('📄 File type:', mimeType);

    try {
        if (mimeType === 'text/plain') {
            const text = fs.readFileSync(filePath, 'utf8');
            console.log('✅ Extracted', text.length, 'characters from text file');
            return {
                success: true,
                text: text,
                method: 'direct_text_read'
            };

        } else if (mimeType === 'application/pdf') {
            const dataBuffer = fs.readFileSync(filePath);
            const pdfData = await pdf(dataBuffer);
            
            console.log('📋 PDF pages:', pdfData.numpages);
            console.log('✅ Extracted', pdfData.text.length, 'characters from PDF');
            
            if (pdfData.text.trim().length === 0) {
                return {
                    success: false,
                    text: '',
                    method: 'pdf_parse',
                    message: 'PDF appears to be scanned/image-based. Use OCR on frontend.'
                };
            }
            
            return {
                success: true,
                text: pdfData.text,
                method: 'pdf_parse'
            };

        } else if (mimeType.startsWith('image/')) {
            return {
                success: false,
                text: '',
                method: 'image_requires_ocr',
                message: 'Image file detected. OCR will be performed on frontend.'
            };

        } else {
            return {
                success: false,
                text: '',
                method: 'unsupported',
                message: 'Unsupported file type for text extraction'
            };
        }

    } catch (error) {
        console.error('❌ Text extraction error:', error.message);
        return {
            success: false,
            text: '',
            method: 'error',
            message: `Text extraction failed: ${error.message}`
        };
    }
}

// Function to analyze medical report text with Groq AI
async function analyzeReportWithAI(reportText) {
    console.log('🤖 Starting Groq AI analysis...');
    console.log('📝 Text length:', reportText.length, 'characters');

    // Limit input text to prevent issues (max ~4000 chars)
    const maxLength = 4000;
    const truncatedText = reportText.length > maxLength ? 
        reportText.substring(0, maxLength) + '...[truncated]' : reportText;

    const prompt = `You are a medical report simplifier. Analyze this medical/academic report and provide a JSON response with simplified, patient-friendly explanations.

REPORT TEXT:
${truncatedText}

Please return a JSON object with this exact structure:
{
  "summary": "Brief overall summary in simple language",
  "parameters": [
    {
      "parameter": "Test/Course name",
      "original_value": "Original value from report",
      "normal_range": "Normal range if available, or 'Not specified'",
      "interpretation": "Simple 1-2 sentence explanation",
      "severity": "normal|borderline|abnormal",
      "confidence": "high|medium|low"
    }
  ],
  "recommendations": [
    "Simple recommendation 1",
    "Simple recommendation 2"
  ],
  "disclaimer": "This is an automated analysis for educational purposes only. Consult healthcare professionals for medical advice."
}

Focus on:
- Use simple, non-technical language
- Explain what abnormal values might mean
- Provide reassurance for normal values
- Include actionable recommendations when appropriate
- If this is academic data (grades, courses), adapt explanations accordingly`;

    try {
        const completion = await groq.chat.completions.create({
            model: "llama-3.1-70b-versatile", // Fast and capable model
            messages: [
                {
                    role: "system",
                    content: "You are a helpful medical/academic report simplifier. Always respond with valid JSON only."
                },
                {
                    role: "user", 
                    content: prompt
                }
            ],
            max_tokens: 1500,
            temperature: 0.3
        });

        const aiResponse = completion.choices[0].message.content.trim();
        console.log('✅ Groq AI analysis completed');
        console.log('💰 Tokens used:', completion.usage?.total_tokens || 'unknown');

        // Try to parse JSON response
        try {
            const parsedResponse = JSON.parse(aiResponse);
            return {
                success: true,
                analysis: parsedResponse,
                tokensUsed: completion.usage?.total_tokens || 0
            };
        } catch (parseError) {
            console.error('❌ JSON parsing error:', parseError.message);
            console.log('Raw AI response:', aiResponse);
            
            // Fallback: create a simple structure
            return {
                success: true,
                analysis: {
                    summary: "AI analysis completed, but response format needs adjustment.",
                    parameters: [],
                    recommendations: ["Please review the original report with a healthcare professional."],
                    disclaimer: "This is an automated analysis. Please consult healthcare professionals for medical advice.",
                    raw_response: aiResponse
                },
                tokensUsed: completion.usage?.total_tokens || 0
            };
        }

    } catch (error) {
        console.error('❌ Groq API error:', error.message);
        return {
            success: false,
            error: error.message,
            message: 'Failed to analyze report with AI'
        };
    }
}

// Test route
app.get('/api/test', (req, res) => {
    const groqConfigured = !!process.env.GROQ_API_KEY;
    res.json({ 
        message: 'Backend server running with Groq AI integration!',
        database: db ? 'Connected' : 'Not connected (using localStorage)',
        groq: groqConfigured ? 'API key configured' : 'API key missing',
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        server: 'running',
        database: db ? 'connected' : 'disconnected',
        groq: !!process.env.GROQ_API_KEY
    });
});

// File upload endpoint with text extraction
app.post('/api/upload', upload.single('medicalReport'), async (req, res) => {
    console.log('📤 File upload attempt...');
    
    try {
        if (!req.file) {
            console.log('❌ No file received');
            return res.status(400).json({ 
                success: false, 
                error: 'No file uploaded' 
            });
        }

        console.log('✅ File uploaded successfully:');
        console.log('   Original name:', req.file.originalname);
        console.log('   Saved as:', req.file.filename);
        console.log('   Size:', req.file.size, 'bytes');
        console.log('   Type:', req.file.mimetype);

        // Attempt text extraction
        const extraction = await extractTextFromFile(req.file.path, req.file.mimetype);
        
        // Return response with extraction results
        res.json({
            success: true,
            message: 'File uploaded successfully',
            filename: req.file.originalname,
            savedAs: req.file.filename,
            size: req.file.size,
            type: req.file.mimetype,
            uploadTime: new Date().toISOString(),
            extraction: extraction
        });

    } catch (error) {
        console.error('❌ Upload/extraction error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Internal server error during upload or text extraction' 
        });
    }
});

// NEW: AI Analysis endpoint
app.post('/api/analyze', async (req, res) => {
    console.log('🤖 AI analysis request received');
    
    try {
        const { text } = req.body;
        
        if (!text || text.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No text provided for analysis'
            });
        }

        if (!process.env.GROQ_API_KEY) {
            return res.status(500).json({
                success: false,
                error: 'Groq API key not configured'
            });
        }

        // Analyze with AI
        const analysisResult = await analyzeReportWithAI(text);
        
        if (analysisResult.success) {
            res.json({
                success: true,
                analysis: analysisResult.analysis,
                tokensUsed: analysisResult.tokensUsed,
                timestamp: new Date().toISOString()
            });
        } else {
            res.status(500).json({
                success: false,
                error: analysisResult.error,
                message: analysisResult.message
            });
        }

    } catch (error) {
        console.error('❌ Analysis endpoint error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error during AI analysis'
        });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        console.log('❌ Multer error:', error.message);
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ 
                success: false, 
                error: 'File too large. Maximum size is 10MB.' 
            });
        }
        return res.status(400).json({ 
            success: false, 
            error: error.message 
        });
    } else if (error) {
        console.log('❌ General error:', error.message);
        return res.status(400).json({ 
            success: false, 
            error: error.message 
        });
    }
    next();
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📁 Serving frontend from: ${path.join(__dirname, '../simplifier-client')}`);
    console.log(`📂 Upload directory: ${uploadsDir}`);
    console.log(`🤖 Groq API: ${process.env.GROQ_API_KEY ? 'Configured ✅' : 'Not configured ❌'}`);
    console.log('Ready for AI-powered medical report analysis with Groq!');
});