// Navigation functionality
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Show selected section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Add active class to clicked nav link
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Close mobile menu if open
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.classList.remove('active');
    }
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Medical Report Simplifier loaded!');

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Show success message
            alert(`Thank you, ${name}! Your message has been sent. We'll get back to you at ${email} soon.`);
            
            // Reset form
            this.reset();
        });
    }

    // Medical Report Upload Functionality
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const filePreview = document.getElementById('filePreview');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const removeFile = document.getElementById('removeFile');
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadText = document.getElementById('uploadText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const results = document.getElementById('results');

    let selectedFile = null;
    let extractedText = '';

    // Only initialize upload functionality if elements exist (on upload page)
    if (dropZone && fileInput) {
        initializeUploadFunctionality();
    }

    function initializeUploadFunctionality() {
        // Click to select file
        dropZone.addEventListener('click', () => fileInput.click());

        // Drag & Drop Events
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileSelect(files[0]);
            }
        });

        // File input change
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFileSelect(e.target.files[0]);
            }
        });

        // Remove file button
        if (removeFile) {
            removeFile.addEventListener('click', () => {
                selectedFile = null;
                extractedText = '';
                filePreview.style.display = 'none';
                fileInput.value = '';
                resetDropZone();
                disableUploadButton();
                results.innerHTML = '<h2>📊 Simplified Report</h2><p>Your simplified medical report will appear here...</p>';
            });
        }

        // Upload button
        if (uploadBtn) {
            uploadBtn.addEventListener('click', async () => {
                if (!selectedFile) return;
                await handleUpload();
            });
        }
    }

    // Handle file selection
    function handleFileSelect(file) {
        const allowedTypes = ['application/pdf', 'text/plain', 'image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            alert('Please select a PDF, text file, or image (JPG/PNG)');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            alert('File size must be less than 10MB');
            return;
        }

        selectedFile = file;
        showFilePreview(file);
        enableUploadButton();
    }

    // Show file preview
    function showFilePreview(file) {
        if (fileName) fileName.textContent = file.name;
        if (fileSize) fileSize.textContent = formatFileSize(file.size);
        if (filePreview) filePreview.style.display = 'block';
        
        dropZone.style.padding = '25px';
        const dropContent = dropZone.querySelector('.drop-content');
        if (dropContent) {
            dropContent.innerHTML = 
                '<p style="margin: 0; color: #27ae60; font-size: 18px;">✓ File selected - you can drop another to replace it</p>';
        }
    }

    // Reset drop zone
    function resetDropZone() {
        dropZone.style.padding = '50px';
        const dropContent = dropZone.querySelector('.drop-content');
        if (dropContent) {
            dropContent.innerHTML = `
                <div class="upload-icon">📄</div>
                <p class="drop-text">Drag & drop your medical report here</p>
                <p class="drop-subtext">or click to browse files</p>
            `;
        }
    }

    // Enable upload button
    function enableUploadButton() {
        if (uploadBtn) {
            uploadBtn.disabled = false;
        }
        if (uploadText) {
            uploadText.textContent = '🚀 Upload & Extract Text';
        }
    }

    // Disable upload button
    function disableUploadButton() {
        if (uploadBtn) {
            uploadBtn.disabled = true;
        }
        if (uploadText) {
            uploadText.textContent = 'Select a file first';
        }
    }

    // OCR function for images using Tesseract.js
    async function performOCR(file) {
        // Load Tesseract.js from CDN if not already loaded
        if (typeof Tesseract === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/2.1.5/tesseract.min.js';
            document.head.appendChild(script);
            
            // Wait for script to load
            await new Promise((resolve) => {
                script.onload = resolve;
            });
        }

        console.log('🔍 Starting OCR on image...');
        if (results) {
            results.innerHTML = `
                <h2>🔍 Processing Image...</h2>
                <div style="display: flex; align-items: center; gap: 15px; margin: 20px 0;">
                    <div class="spinner"></div>
                    <p>Performing OCR (text recognition) on your image. This may take a moment...</p>
                </div>
            `;
        }

        try {
            const result = await Tesseract.recognize(file, 'eng', {
                logger: m => {
                    if (m.status === 'recognizing text' && results) {
                        const progress = Math.round(m.progress * 100);
                        results.innerHTML = `
                            <h2>🔍 Processing Image...</h2>
                            <div style="margin: 20px 0;">
                                <p>OCR Progress: ${progress}%</p>
                                <div style="background: #e0e0e0; border-radius: 10px; overflow: hidden; margin-top: 10px;">
                                    <div style="background: linear-gradient(45deg, #3498db, #2980b9); height: 10px; width: ${progress}%; transition: width 0.3s ease;"></div>
                                </div>
                            </div>
                        `;
                    }
                }
            });

            console.log('✅ OCR completed. Confidence:', result.data.confidence);
            return result.data.text;
        } catch (error) {
            console.error('❌ OCR error:', error);
            throw new Error('OCR failed: ' + error.message);
        }
    }

    // Handle upload process
    async function handleUpload() {
        if (!selectedFile) return;

        // Show loading state
        if (uploadBtn) uploadBtn.disabled = true;
        if (uploadText) uploadText.style.display = 'none';
        if (loadingSpinner) loadingSpinner.style.display = 'block';
        
        if (results) {
            results.innerHTML = `
                <h2>⏳ Processing...</h2>
                <div style="display: flex; align-items: center; gap: 15px; margin: 20px 0;">
                    <div class="spinner"></div>
                    <p>Uploading and extracting text from your medical report...</p>
                </div>
            `;
        }

        try {
            let textToShow = '';
            let extractionMethod = '';

            // For images, perform OCR on frontend first
            if (selectedFile.type.startsWith('image/')) {
                textToShow = await performOCR(selectedFile);
                extractionMethod = 'Client-side OCR';
            } else if (selectedFile.type === 'text/plain') {
                // For text files, read directly
                textToShow = await readTextFile(selectedFile);
                extractionMethod = 'Direct text reading';
            } else {
                // For PDFs, simulate extraction
                textToShow = 'Sample medical report text extracted from PDF:\n\nHemoglobin: 12.5 g/dL\nTotal Cholesterol: 220 mg/dL\nBlood Glucose: 140 mg/dL\nWhite Blood Cells: 7,500/μL\nRed Blood Cells: 4.8 million/μL';
                extractionMethod = 'PDF text extraction (simulated)';
            }

            // Simulate server processing time
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulate successful result
            const result = {
                success: true,
                filename: selectedFile.name,
                size: selectedFile.size,
                extraction: {
                    success: true,
                    text: textToShow,
                    method: extractionMethod
                }
            };

            if (result.success) {
                console.log('Upload result:', result);
                extractedText = textToShow;
                showTextExtractionResults(result, textToShow, extractionMethod);
            } else {
                throw new Error('Upload failed');
            }

        } catch (error) {
            console.error('Upload error:', error);
            if (results) {
                results.innerHTML = `
                    <h2>❌ Processing Failed</h2>
                    <div style="background: #ffe6e6; padding: 20px; border-radius: 10px; border-left: 4px solid #e74c3c;">
                        <p style="color: #c0392b; margin-bottom: 10px;"><strong>Error:</strong> ${error.message}</p>
                        <p>Please try again with a different file.</p>
                    </div>
                `;
            }
        } finally {
            // Reset button state
            if (uploadBtn) uploadBtn.disabled = false;
            if (uploadText) uploadText.style.display = 'block';
            if (loadingSpinner) loadingSpinner.style.display = 'none';
        }
    }

    // Read text file
    async function readTextFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(new Error('Failed to read text file'));
            reader.readAsText(file);
        });
    }

    // Show text extraction results
    function showTextExtractionResults(uploadResult, extractedText, method) {
        const hasText = extractedText && extractedText.trim().length > 0;
        
        if (results) {
            results.innerHTML = `
                <h2>✅ Text Extraction Complete</h2>
                
                <div style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); padding: 20px; border-radius: 12px; margin: 20px 0;">
                    <h3 style="color: #2c3e50; margin-bottom: 15px;">📄 File Information:</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                        <p><strong>📁 File:</strong> ${uploadResult.filename}</p>
                        <p><strong>📏 Size:</strong> ${formatFileSize(uploadResult.size)}</p>
                        <p><strong>🔧 Method:</strong> ${method}</p>
                        <p><strong>📝 Characters:</strong> ${extractedText.length}</p>
                    </div>
                </div>

                ${hasText ? `
                    <h3 style="color: #2c3e50; margin: 25px 0 15px 0;">📝 Extracted Text (Review & Edit if needed):</h3>
                    <textarea 
                        id="extractedTextArea" 
                        rows="12" 
                        style="width: 100%; padding: 15px; border: 2px solid #e0e0e0; border-radius: 10px; font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.5; resize: vertical;"
                        placeholder="Extracted text will appear here..."
                    >${extractedText}</textarea>
                    
                    <div style="margin: 20px 0;">
                        <button id="analyzeTextBtn" style="background: linear-gradient(45deg, #27ae60, #2ecc71); color: white; padding: 15px 30px; border: none; border-radius: 30px; cursor: pointer; font-size: 16px; font-weight: bold; box-shadow: 0 5px 15px rgba(39, 174, 96, 0.3); transition: all 0.3s ease;">
                            🤖 Analyze with AI
                        </button>
                        <p style="font-size: 14px; color: #7f8c8d; margin-top: 12px; font-style: italic;">
                            Review the extracted text above, make any corrections, then click "Analyze with AI"
                        </p>
                    </div>
                ` : `
                    <div style="background: linear-gradient(135deg, #fff3cd, #ffeaa7); padding: 20px; border-radius: 10px; border-left: 5px solid #ffc107;">
                        <h3 style="color: #856404;">⚠️ No Text Extracted</h3>
                        <p style="margin: 10px 0; color: #856404;">Unable to extract text from this file. This could mean:</p>
                        <ul style="color: #856404; margin-left: 20px;">
                            <li>The PDF is image-based/scanned (try uploading as an image for OCR)</li>
                            <li>The image quality is too poor for text recognition</li>
                            <li>The file doesn't contain readable text</li>
                        </ul>
                        <p style="margin-top: 10px; color: #856404;"><strong>Try:</strong> Converting your PDF to an image (JPG/PNG) and uploading again.</p>
                    </div>
                `}
            `;

            // Add event listener for analyze button if text was extracted
            if (hasText) {
                const analyzeBtn = document.getElementById('analyzeTextBtn');
                if (analyzeBtn) {
                    analyzeBtn.addEventListener('click', () => {
                        const textArea = document.getElementById('extractedTextArea');
                        const editedText = textArea ? textArea.value : extractedText;
                        analyzeTextWithAI(editedText);
                    });
                }
            }
        }
    }

    // AI Analysis function (simulated)
    async function analyzeTextWithAI(text) {
        if (!text || text.trim().length === 0) {
            alert('Please enter some text to analyze.');
            return;
        }

        // Show loading state
        if (results) {
            results.innerHTML = `
                <h2>🤖 Analyzing with AI...</h2>
                <div style="display: flex; align-items: center; gap: 15px; margin: 20px 0;">
                    <div class="spinner"></div>
                    <p>Sending your report to AI for analysis. This may take a moment...</p>
                </div>
            `;
        }

        try {
            // Simulate AI analysis delay
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Simulated AI response
            const result = {
                success: true,
                analysis: {
                    summary: "Based on the medical report analysis, most parameters appear to be within normal ranges with a few values requiring attention.",
                    parameters: [
                        {
                            parameter: "Hemoglobin",
                            original_value: "12.5 g/dL",
                            normal_range: "12.0-15.5 g/dL (Female)",
                            interpretation: "Your hemoglobin level is within the normal range. This indicates adequate oxygen-carrying capacity of your blood.",
                            severity: "normal",
                            confidence: "95%"
                        },
                        {
                            parameter: "Total Cholesterol",
                            original_value: "220 mg/dL",
                            normal_range: "< 200 mg/dL",
                            interpretation: "Your cholesterol level is slightly elevated. Consider dietary modifications and regular exercise.",
                            severity: "borderline",
                            confidence: "92%"
                        },
                        {
                            parameter: "Blood Glucose",
                            original_value: "140 mg/dL",
                            normal_range: "70-100 mg/dL (Fasting)",
                            interpretation: "Your blood glucose level is elevated and may indicate pre-diabetes. Please consult your healthcare provider.",
                            severity: "abnormal",
                            confidence: "98%"
                        }
                    ],
                    recommendations: [
                        "Schedule a follow-up appointment with your healthcare provider to discuss elevated glucose levels",
                        "Consider dietary modifications to reduce cholesterol intake",
                        "Maintain regular physical activity",
                        "Monitor blood pressure regularly"
                    ],
                    disclaimer: "This analysis is for educational purposes only and should not replace professional medical advice. Always consult with your healthcare provider for proper medical interpretation."
                },
                tokensUsed: 1250
            };

            if (result.success) {
                displayAIAnalysis(result.analysis, result.tokensUsed);
            } else {
                throw new Error('AI analysis failed');
            }

        } catch (error) {
            console.error('AI Analysis error:', error);
            if (results) {
                results.innerHTML = `
                    <h2>❌ AI Analysis Failed</h2>
                    <div style="background: linear-gradient(135deg, #ffe6e6, #ffcccc); padding: 20px; border-radius: 12px; border-left: 5px solid #e74c3c;">
                        <p style="color: #c0392b; margin-bottom: 15px;"><strong>Error:</strong> ${error.message}</p>
                        <p style="color: #c0392b;">This could be due to:</p>
                        <ul style="color: #c0392b; margin-left: 20px; margin: 10px 0;">
                            <li>Network connectivity problems</li>
                            <li>Server temporarily unavailable</li>
                            <li>Invalid text format</li>
                        </ul>
                        <p style="color: #c0392b;"><strong>What to try:</strong></p>
                        <ul style="color: #c0392b; margin-left: 20px;">
                            <li>Check your internet connection</li>
                            <li>Wait a moment and try again</li>
                            <li>Ensure the text contains medical data</li>
                        </ul>
                    </div>
                    <button onclick="location.reload()" style="margin-top: 20px; padding: 12px 25px; background: linear-gradient(45deg, #3498db, #2980b9); color: white; border: none; border-radius: 25px; cursor: pointer; font-weight: bold;">
                        🔄 Try Again
                    </button>
                `;
            }
        }
    }

    // Display AI analysis results
    function displayAIAnalysis(analysis, tokensUsed) {
        let parametersHtml = '';
        
        if (analysis.parameters && analysis.parameters.length > 0) {
            parametersHtml = analysis.parameters.map(param => {
                const severityConfig = {
                    'normal': { color: '#27ae60', icon: '✅', bgColor: '#d5f4e6' },
                    'borderline': { color: '#f39c12', icon: '⚠️', bgColor: '#fff3cd' },
                    'abnormal': { color: '#e74c3c', icon: '❌', bgColor: '#ffe6e6' }
                };
                const config = severityConfig[param.severity] || { color: '#95a5a6', icon: '❓', bgColor: '#f8f9fa' };

                return `
                    <div style="background: white; border-radius: 12px; padding: 20px; margin: 15px 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-left: 5px solid ${config.color}; transition: transform 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                            <h4 style="margin: 0; color: #2c3e50; font-size: 18px;">${param.parameter}</h4>
                            <span style="background: ${config.color}; color: white; padding: 6px 12px; border-radius: 15px; font-size: 12px; font-weight: bold;">
                                ${config.icon} ${param.severity.toUpperCase()}
                            </span>
                        </div>
                        
                        <div style="background: ${config.bgColor}; padding: 12px; border-radius: 8px; margin-bottom: 12px;">
                            ${param.original_value ? `<p style="margin: 5px 0;"><strong>📊 Your Value:</strong> ${param.original_value}</p>` : ''}
                            ${param.normal_range !== 'Not specified' ? `<p style="margin: 5px 0;"><strong>📋 Normal Range:</strong> ${param.normal_range}</p>` : ''}
                        </div>
                        
                        <p style="color: #34495e; line-height: 1.6; margin-bottom: 10px;">${param.interpretation}</p>
                        
                        <div style="font-size: 12px; color: #7f8c8d; text-align: right;">
                            <span>Confidence: ${param.confidence}</span>
                        </div>
                    </div>
                `;
            }).join('');
        }

        let recommendationsHtml = '';
        if (analysis.recommendations && analysis.recommendations.length > 0) {
            recommendationsHtml = `
                <div style="background: linear-gradient(135deg, #e8f8f5, #d5f4e6); border-radius: 12px; padding: 25px; margin: 25px 0;">
                    <h3 style="color: #27ae60; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                        💡 Recommendations
                    </h3>
                    <ul style="color: #2c3e50; line-height: 1.8; padding-left: 20px;">
                        ${analysis.recommendations.map(rec => `<li style="margin-bottom: 8px;">${rec}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        if (results) {
            results.innerHTML = `
                <h2 style="color: #2c3e50; margin-bottom: 25px;">🤖 AI Analysis Results</h2>
                
                <div style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); border-radius: 12px; padding: 25px; margin: 20px 0;">
                    <h3 style="color: #2c3e50; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">📋 Summary</h3>
                    <p style="color: #34495e; line-height: 1.7; font-size: 16px;">${analysis.summary}</p>
                </div>

                ${analysis.parameters && analysis.parameters.length > 0 ? 
                    `<div>
                        <h3 style="color: #2c3e50; margin: 30px 0 15px 0; display: flex; align-items: center; gap: 10px;">📊 Detailed Analysis</h3>
                        ${parametersHtml}
                    </div>` : 
                    '<div style="padding: 20px; text-align: center; color: #7f8c8d;"><p>No specific parameters were identified for detailed analysis.</p></div>'
                }

                ${recommendationsHtml}

                <div style="background: linear-gradient(135deg, #fff3cd, #ffeaa7); border-radius: 12px; padding: 20px; margin: 25px 0; border-left: 5px solid #ffc107;">
                    <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
                        ⚠️ <strong>Important:</strong> ${analysis.disclaimer}
                    </p>
                </div>

                <div style="display: flex; gap: 15px; margin: 25px 0; flex-wrap: wrap; justify-content: center;">
                    <button onclick="downloadPDF()" style="background: linear-gradient(45deg, #e74c3c, #c0392b); color: white; padding: 12px 25px; border: none; border-radius: 25px; cursor: pointer; font-weight: bold; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                        📄 Download PDF
                    </button>
                    <button onclick="readAloud()" style="background: linear-gradient(45deg, #9b59b6, #8e44ad); color: white; padding: 12px 25px; border: none; border-radius: 25px; cursor: pointer; font-weight: bold; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(155, 89, 182, 0.3);" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                        🔊 Read Aloud
                    </button>
                    <button onclick="analyzeAnother()" style="background: linear-gradient(45deg, #3498db, #2980b9); color: white; padding: 12px 25px; border: none; border-radius: 25px; cursor: pointer; font-weight: bold; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                        📋 Analyze Another Report
                    </button>
                </div>

                ${tokensUsed ? `
                    <div style="font-size: 12px; color: #7f8c8d; text-align: center; margin-top: 25px; padding: 15px; background: rgba(248, 249, 250, 0.8); border-radius: 8px;">
                        Analysis completed using ${tokensUsed} tokens • Processing time: 3.2 seconds
                    </div>
                ` : ''}
            `;
        }
    }

    // Utility function to format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Test server connection (simulated)
    console.log('🚀 Medical Report Simplifier with enhanced UI loaded successfully!');
});

// Global utility functions for buttons
window.downloadPDF = function() {
    alert('🚧 PDF download feature will be implemented in the next step! This will generate a downloadable PDF summary of your analysis.');
}

window.readAloud = function() {
    alert('🚧 Text-to-speech feature will be implemented in the next step! This will read your analysis results aloud.');
}

window.analyzeAnother = function() {
    if (confirm('Are you sure you want to analyze another report? This will clear your current results.')) {
        location.reload();
    }
}