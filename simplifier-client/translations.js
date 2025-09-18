// translations.js - Multilingual Support for Medical Report Simplifier

const translations = {
    en: {
        // Navigation
        nav: {
            logo: "🏥 MedSimplify",
            home: "Home",
            upload: "Upload Report",
            about: "About Us",
            contact: "Contact"
        },
        
        // Home Page
        home: {
            title: "🤖 AI-Powered Medical Report Simplifier",
            subtitle: "Transform complex medical reports into easy-to-understand explanations using advanced AI technology",
            getStarted: "Get Started Now 🚀",
            trustedBy: "🏥 Trusted by Healthcare Professionals",
            features: {
                aiAnalysis: {
                    title: "Advanced AI Analysis",
                    description: "Our AI technology analyzes your medical reports with high accuracy and provides detailed explanations for each parameter."
                },
                multipleFormats: {
                    title: "Multiple Formats",
                    description: "Support for PDFs, images, and text files. Advanced OCR technology extracts text from scanned documents."
                },
                secure: {
                    title: "Secure & Private",
                    description: "Your medical data is processed securely and never stored permanently. Complete privacy guaranteed."
                }
            }
        },
        
        // Upload Page
        upload: {
            title: "📋 Upload Your Medical Report",
            disclaimer: "⚠️ For educational purposes only. Not a substitute for professional medical advice.",
            selectReport: "Select Your Report",
            dragDrop: "Drag & drop your medical report here",
            orClick: "or click to browse files",
            fileSelected: "✓ File selected - you can drop another to replace it",
            selectFirst: "Select a file first",
            uploadExtract: "🚀 Upload & Extract Text",
            processing: "⏳ Processing...",
            uploading: "Uploading and extracting text from your medical report...",
            simplifiedReport: "📊 Simplified Report",
            reportAppear: "Your simplified medical report will appear here...",
            
            // File processing
            processingImage: "🔍 Processing Image...",
            ocrProgress: "Performing OCR (text recognition) on your image. This may take a moment...",
            ocrProgressPercent: "OCR Progress:",
            
            // Results
            extractionComplete: "✅ Text Extraction Complete",
            fileInfo: "📄 File Information:",
            fileName: "📁 File:",
            fileSize: "📏 Size:",
            method: "🔧 Method:",
            characters: "📝 Characters:",
            extractedText: "📝 Extracted Text (Review & Edit if needed):",
            analyzeAI: "🤖 Analyze with AI",
            reviewText: "Review the extracted text above, make any corrections, then click \"Analyze with AI\"",
            
            // No text extracted
            noTextExtracted: "⚠️ No Text Extracted",
            noTextReason: "Unable to extract text from this file. This could mean:",
            reasons: [
                "The PDF is image-based/scanned (try uploading as an image for OCR)",
                "The image quality is too poor for text recognition",
                "The file doesn't contain readable text"
            ],
            tryConverting: "Try: Converting your PDF to an image (JPG/PNG) and uploading again.",
            
            // Errors
            processingFailed: "❌ Processing Failed",
            error: "Error:",
            tryAgain: "Please try again with a different file.",
            
            // File validation
            invalidFileType: "Please select a PDF, text file, or image (JPG/PNG)",
            fileTooLarge: "File size must be less than 10MB"
        },
        
        // AI Analysis
        analysis: {
            analyzing: "🤖 Analyzing with AI...",
            sending: "Sending your report to AI for analysis. This may take a moment...",
            results: "🤖 AI Analysis Results",
            summary: "📋 Summary",
            detailedAnalysis: "📊 Detailed Analysis",
            recommendations: "💡 Recommendations",
            important: "Important:",
            
            // Severity levels
            severity: {
                normal: "NORMAL",
                borderline: "BORDERLINE", 
                abnormal: "ABNORMAL"
            },
            
            // Parameter details
            yourValue: "📊 Your Value:",
            normalRange: "📋 Normal Range:",
            confidence: "Confidence:",
            
            // Buttons
            downloadPDF: "📄 Download PDF",
            readAloud: "🔊 Read Aloud",
            analyzeAnother: "📋 Analyze Another Report",
            
            // Analysis failed
            analysisFailed: "❌ AI Analysis Failed",
            analysisErrors: [
                "Network connectivity problems",
                "Server temporarily unavailable",
                "Invalid text format"
            ],
            tryThese: [
                "Check your internet connection",
                "Wait a moment and try again",
                "Ensure the text contains medical data"
            ],
            tryAgainBtn: "🔄 Try Again",
            
            // Sample analysis
            sampleSummary: "Based on the medical report analysis, most parameters appear to be within normal ranges with a few values requiring attention.",
            sampleRecommendations: [
                "Schedule a follow-up appointment with your healthcare provider to discuss elevated glucose levels",
                "Consider dietary modifications to reduce cholesterol intake",
                "Maintain regular physical activity",
                "Monitor blood pressure regularly"
            ],
            disclaimer: "This analysis is for educational purposes only and should not replace professional medical advice. Always consult with your healthcare provider for proper medical interpretation."
        },
        
        // About Page
        about: {
            title: "🏥 About MedSimplify",
            mission: "Our Mission",
            missionText: "We believe that understanding your health shouldn't require a medical degree. Our AI-powered platform transforms complex medical reports into clear, understandable explanations, empowering patients to take control of their healthcare journey.",
            whyChoose: "Why Choose MedSimplify?",
            technology: "Our Technology",
            technologyText: "MedSimplify uses cutting-edge natural language processing and machine learning technologies to analyze medical reports. Our system is trained on vast medical databases and continuously updated with the latest medical knowledge to ensure accuracy and reliability.",
            
            features: {
                aiPowered: {
                    title: "AI-Powered Analysis",
                    description: "Advanced machine learning algorithms trained on medical literature to provide accurate interpretations."
                },
                instant: {
                    title: "Instant Results",
                    description: "Get simplified explanations in seconds, not hours. Our system processes reports in real-time."
                },
                personalized: {
                    title: "Personalized Insights", 
                    description: "Tailored explanations based on your specific test results and medical parameters."
                },
                userFriendly: {
                    title: "User-Friendly Interface",
                    description: "Simple drag-and-drop functionality with mobile-responsive design for accessibility."
                },
                dataSecurity: {
                    title: "Data Security",
                    description: "HIPAA-compliant processing with end-to-end encryption and no permanent data storage."
                },
                globalAccess: {
                    title: "Global Accessibility",
                    description: "Available 24/7 from anywhere in the world, supporting multiple report formats and languages."
                }
            }
        },
        
        // Contact Page
        contact: {
            title: "📞 Contact Us",
            subtitle: "Have questions or need support? We're here to help!",
            fullName: "Full Name",
            emailAddress: "Email Address",
            subject: "Subject",
            selectTopic: "Select a topic...",
            topics: {
                general: "General Inquiry",
                technical: "Technical Support",
                feature: "Feature Request",
                bug: "Bug Report",
                partnership: "Partnership"
            },
            message: "Message",
            messagePlaceholder: "Please describe your inquiry in detail...",
            sendMessage: "Send Message 📨",
            otherWays: "Other Ways to Reach Us",
            email: "📧 Email",
            phone: "📱 Phone",
            hours: "🕒 Hours",
            businessHours: "Mon-Fri: 9AM-6PM EST",
            
            // Form messages
            thankYou: "Thank you, {name}! Your message has been sent. We'll get back to you at {email} soon.",
            pleaseEnterText: "Please enter some text to analyze.",
            confirmAnalyzeAnother: "Are you sure you want to analyze another report? This will clear your current results."
        },
        
        // Footer
        footer: {
            copyright: "© 2024 MedSimplify. All rights reserved. | Built with ❤️ for better healthcare",
            disclaimer: "Educational tool only. Always consult healthcare professionals for medical advice."
        },
        
        // Common
        common: {
            loading: "Loading...",
            close: "Close",
            cancel: "Cancel",
            confirm: "Confirm",
            save: "Save",
            edit: "Edit",
            delete: "Delete",
            yes: "Yes",
            no: "No",
            ok: "OK",
            back: "Back",
            next: "Next",
            previous: "Previous"
        },
        
        // Alerts and notifications
        alerts: {
            comingSoon: "🚧 This feature will be implemented in the next step!",
            pdfDownload: "🚧 PDF download feature will be implemented in the next step! This will generate a downloadable PDF summary of your analysis.",
            textToSpeech: "🚧 Text-to-speech feature will be implemented in the next step! This will read your analysis results aloud."
        }
    },
    
    es: {
        // Navegación
        nav: {
            logo: "🏥 MedSimplificar",
            home: "Inicio",
            upload: "Subir Reporte",
            about: "Acerca de",
            contact: "Contacto"
        },
        
        // Página de inicio
        home: {
            title: "🤖 Simplificador de Reportes Médicos con IA",
            subtitle: "Transforma reportes médicos complejos en explicaciones fáciles de entender usando tecnología de IA avanzada",
            getStarted: "Comenzar Ahora 🚀",
            trustedBy: "🏥 Con la Confianza de Profesionales de la Salud",
            features: {
                aiAnalysis: {
                    title: "Análisis Avanzado con IA",
                    description: "Nuestra tecnología de IA analiza tus reportes médicos con alta precisión y proporciona explicaciones detalladas para cada parámetro."
                },
                multipleFormats: {
                    title: "Múltiples Formatos",
                    description: "Soporte para PDFs, imágenes y archivos de texto. Tecnología OCR avanzada extrae texto de documentos escaneados."
                },
                secure: {
                    title: "Seguro y Privado",
                    description: "Tus datos médicos se procesan de forma segura y nunca se almacenan permanentemente. Privacidad completa garantizada."
                }
            }
        },
        
        // Página de subida
        upload: {
            title: "📋 Sube tu Reporte Médico",
            disclaimer: "⚠️ Solo para fines educativos. No es un sustituto del consejo médico profesional.",
            selectReport: "Selecciona tu Reporte",
            dragDrop: "Arrastra y suelta tu reporte médico aquí",
            orClick: "o haz clic para examinar archivos",
            fileSelected: "✓ Archivo seleccionado - puedes soltar otro para reemplazarlo",
            selectFirst: "Selecciona un archivo primero",
            uploadExtract: "🚀 Subir y Extraer Texto",
            processing: "⏳ Procesando...",
            uploading: "Subiendo y extrayendo texto de tu reporte médico...",
            simplifiedReport: "📊 Reporte Simplificado",
            reportAppear: "Tu reporte médico simplificado aparecerá aquí...",
            
            // Procesamiento de archivos
            processingImage: "🔍 Procesando Imagen...",
            ocrProgress: "Realizando OCR (reconocimiento de texto) en tu imagen. Esto puede tomar un momento...",
            ocrProgressPercent: "Progreso OCR:",
            
            // Resultados
            extractionComplete: "✅ Extracción de Texto Completa",
            fileInfo: "📄 Información del Archivo:",
            fileName: "📁 Archivo:",
            fileSize: "📏 Tamaño:",
            method: "🔧 Método:",
            characters: "📝 Caracteres:",
            extractedText: "📝 Texto Extraído (Revisa y edita si es necesario):",
            analyzeAI: "🤖 Analizar con IA",
            reviewText: "Revisa el texto extraído arriba, haz las correcciones necesarias, luego haz clic en \"Analizar con IA\"",
            
            // Sin texto extraído
            noTextExtracted: "⚠️ No se Extrajo Texto",
            noTextReason: "No se pudo extraer texto de este archivo. Esto podría significar:",
            reasons: [
                "El PDF está basado en imágenes/escaneado (intenta subirlo como imagen para OCR)",
                "La calidad de la imagen es muy pobre para el reconocimiento de texto",
                "El archivo no contiene texto legible"
            ],
            tryConverting: "Intenta: Convertir tu PDF a una imagen (JPG/PNG) y subirla de nuevo.",
            
            // Errores
            processingFailed: "❌ Procesamiento Falló",
            error: "Error:",
            tryAgain: "Por favor intenta de nuevo con un archivo diferente.",
            
            // Validación de archivos
            invalidFileType: "Por favor selecciona un PDF, archivo de texto o imagen (JPG/PNG)",
            fileTooLarge: "El tamaño del archivo debe ser menor a 10MB"
        },
        
        // Análisis IA
        analysis: {
            analyzing: "🤖 Analizando con IA...",
            sending: "Enviando tu reporte a la IA para análisis. Esto puede tomar un momento...",
            results: "🤖 Resultados del Análisis de IA",
            summary: "📋 Resumen",
            detailedAnalysis: "📊 Análisis Detallado",
            recommendations: "💡 Recomendaciones",
            important: "Importante:",
            
            // Niveles de severidad
            severity: {
                normal: "NORMAL",
                borderline: "LÍMITE",
                abnormal: "ANORMAL"
            },
            
            // Detalles de parámetros
            yourValue: "📊 Tu Valor:",
            normalRange: "📋 Rango Normal:",
            confidence: "Confianza:",
            
            // Botones
            downloadPDF: "📄 Descargar PDF",
            readAloud: "🔊 Leer en Voz Alta",
            analyzeAnother: "📋 Analizar Otro Reporte",
            
            // Análisis falló
            analysisFailed: "❌ Análisis de IA Falló",
            analysisErrors: [
                "Problemas de conectividad de red",
                "Servidor temporalmente no disponible",
                "Formato de texto inválido"
            ],
            tryThese: [
                "Verifica tu conexión a internet",
                "Espera un momento e intenta de nuevo",
                "Asegúrate de que el texto contenga datos médicos"
            ],
            tryAgainBtn: "🔄 Intentar de Nuevo",
            
            // Análisis de muestra
            sampleSummary: "Basado en el análisis del reporte médico, la mayoría de los parámetros parecen estar dentro de rangos normales con algunos valores que requieren atención.",
            sampleRecommendations: [
                "Programa una cita de seguimiento con tu proveedor de salud para discutir los niveles elevados de glucosa",
                "Considera modificaciones dietéticas para reducir la ingesta de colesterol",
                "Mantén actividad física regular",
                "Monitorea la presión arterial regularmente"
            ],
            disclaimer: "Este análisis es solo para fines educativos y no debe reemplazar el consejo médico profesional. Siempre consulta con tu proveedor de salud para una interpretación médica adecuada."
        },
        
        // Página Acerca de
        about: {
            title: "🏥 Acerca de MedSimplificar",
            mission: "Nuestra Misión",
            missionText: "Creemos que entender tu salud no debería requerir un título médico. Nuestra plataforma impulsada por IA transforma reportes médicos complejos en explicaciones claras y comprensibles, empoderando a los pacientes para tomar control de su jornada de salud.",
            whyChoose: "¿Por Qué Elegir MedSimplificar?",
            technology: "Nuestra Tecnología",
            technologyText: "MedSimplificar usa tecnologías de procesamiento de lenguaje natural y aprendizaje automático de vanguardia para analizar reportes médicos. Nuestro sistema está entrenado en vastas bases de datos médicas y se actualiza continuamente con el conocimiento médico más reciente para asegurar precisión y confiabilidad.",
            
            features: {
                aiPowered: {
                    title: "Análisis Impulsado por IA",
                    description: "Algoritmos avanzados de aprendizaje automático entrenados en literatura médica para proporcionar interpretaciones precisas."
                },
                instant: {
                    title: "Resultados Instantáneos",
                    description: "Obtén explicaciones simplificadas en segundos, no horas. Nuestro sistema procesa reportes en tiempo real."
                },
                personalized: {
                    title: "Perspectivas Personalizadas",
                    description: "Explicaciones adaptadas basadas en tus resultados específicos de pruebas y parámetros médicos."
                },
                userFriendly: {
                    title: "Interfaz Amigable",
                    description: "Funcionalidad simple de arrastrar y soltar con diseño responsivo móvil para accesibilidad."
                },
                dataSecurity: {
                    title: "Seguridad de Datos",
                    description: "Procesamiento compatible con HIPAA con cifrado de extremo a extremo y sin almacenamiento permanente de datos."
                },
                globalAccess: {
                    title: "Accesibilidad Global",
                    description: "Disponible 24/7 desde cualquier lugar del mundo, soportando múltiples formatos de reportes e idiomas."
                }
            }
        },
        
        // Página de contacto
        contact: {
            title: "📞 Contáctanos",
            subtitle: "¿Tienes preguntas o necesitas soporte? ¡Estamos aquí para ayudar!",
            fullName: "Nombre Completo",
            emailAddress: "Dirección de Email",
            subject: "Asunto",
            selectTopic: "Selecciona un tema...",
            topics: {
                general: "Consulta General",
                technical: "Soporte Técnico",
                feature: "Solicitud de Funcionalidad",
                bug: "Reporte de Error",
                partnership: "Asociación"
            },
            message: "Mensaje",
            messagePlaceholder: "Por favor describe tu consulta en detalle...",
            sendMessage: "Enviar Mensaje 📨",
            otherWays: "Otras Formas de Contactarnos",
            email: "📧 Email",
            phone: "📱 Teléfono",
            hours: "🕒 Horarios",
            businessHours: "Lun-Vie: 9AM-6PM EST",
            
            // Mensajes del formulario
            thankYou: "¡Gracias, {name}! Tu mensaje ha sido enviado. Te contactaremos pronto en {email}.",
            pleaseEnterText: "Por favor ingresa algún texto para analizar.",
            confirmAnalyzeAnother: "¿Estás seguro de que quieres analizar otro reporte? Esto borrará tus resultados actuales."
        },
        
        // Pie de página
        footer: {
            copyright: "© 2024 MedSimplificar. Todos los derechos reservados. | Hecho con ❤️ para mejor atención médica",
            disclaimer: "Herramienta educativa únicamente. Siempre consulta profesionales de la salud para consejo médico."
        },
        
        // Común
        common: {
            loading: "Cargando...",
            close: "Cerrar",
            cancel: "Cancelar",
            confirm: "Confirmar",
            save: "Guardar",
            edit: "Editar",
            delete: "Eliminar",
            yes: "Sí",
            no: "No",
            ok: "OK",
            back: "Atrás",
            next: "Siguiente",
            previous: "Anterior"
        },
        
        // Alertas y notificaciones
        alerts: {
            comingSoon: "🚧 ¡Esta funcionalidad se implementará en el siguiente paso!",
            pdfDownload: "🚧 ¡La funcionalidad de descarga de PDF se implementará en el siguiente paso! Esto generará un resumen PDF descargable de tu análisis.",
            textToSpeech: "🚧 ¡La funcionalidad de texto a voz se implementará en el siguiente paso! Esto leerá en voz alta los resultados de tu análisis."
        }
    },
    
    fr: {
        // Navigation
        nav: {
            logo: "🏥 MedSimplifier",
            home: "Accueil",
            upload: "Télécharger Rapport",
            about: "À Propos",
            contact: "Contact"
        },
        
        // Page d'accueil
        home: {
            title: "🤖 Simplificateur de Rapports Médicaux Alimenté par IA",
            subtitle: "Transformez des rapports médicaux complexes en explications faciles à comprendre grâce à une technologie IA avancée",
            getStarted: "Commencer Maintenant 🚀",
            trustedBy: "🏥 Approuvé par les Professionnels de Santé",
            features: {
                aiAnalysis: {
                    title: "Analyse IA Avancée",
                    description: "Notre technologie IA analyse vos rapports médicaux avec une grande précision et fournit des explications détaillées pour chaque paramètre."
                },
                multipleFormats: {
                    title: "Formats Multiples",
                    description: "Support pour PDF, images et fichiers texte. Technologie OCR avancée extrait le texte des documents scannés."
                },
                secure: {
                    title: "Sécurisé et Privé",
                    description: "Vos données médicales sont traitées en sécurité et ne sont jamais stockées de manière permanente. Confidentialité complète garantie."
                }
            }
        },
        
        // Page de téléchargement
        upload: {
            title: "📋 Téléchargez Votre Rapport Médical",
            disclaimer: "⚠️ À des fins éducatives uniquement. Ne remplace pas les conseils médicaux professionnels.",
            selectReport: "Sélectionnez Votre Rapport",
            dragDrop: "Glissez-déposez votre rapport médical ici",
            orClick: "ou cliquez pour parcourir les fichiers",
            fileSelected: "✓ Fichier sélectionné - vous pouvez en déposer un autre pour le remplacer",
            selectFirst: "Sélectionnez d'abord un fichier",
            uploadExtract: "🚀 Télécharger et Extraire le Texte",
            processing: "⏳ Traitement...",
            uploading: "Téléchargement et extraction du texte de votre rapport médical...",
            simplifiedReport: "📊 Rapport Simplifié",
            reportAppear: "Votre rapport médical simplifié apparaîtra ici...",
            
            // Traitement des fichiers
            processingImage: "🔍 Traitement de l'Image...",
            ocrProgress: "Exécution de l'OCR (reconnaissance de texte) sur votre image. Cela peut prendre un moment...",
            ocrProgressPercent: "Progrès OCR:",
            
            // Résultats
            extractionComplete: "✅ Extraction de Texte Terminée",
            fileInfo: "📄 Informations du Fichier:",
            fileName: "📁 Fichier:",
            fileSize: "📏 Taille:",
            method: "🔧 Méthode:",
            characters: "📝 Caractères:",
            extractedText: "📝 Texte Extrait (Vérifiez et éditez si nécessaire):",
            analyzeAI: "🤖 Analyser avec l'IA",
            reviewText: "Vérifiez le texte extrait ci-dessus, apportez les corrections nécessaires, puis cliquez sur \"Analyser avec l'IA\"",
            
            // Aucun texte extrait
            noTextExtracted: "⚠️ Aucun Texte Extrait",
            noTextReason: "Impossible d'extraire le texte de ce fichier. Cela pourrait signifier:",
            reasons: [
                "Le PDF est basé sur des images/scanné (essayez de le télécharger comme image pour l'OCR)",
                "La qualité de l'image est trop faible pour la reconnaissance de texte",
                "Le fichier ne contient pas de texte lisible"
            ],
            tryConverting: "Essayez: Convertir votre PDF en image (JPG/PNG) et le télécharger à nouveau.",
            
            // Erreurs
            processingFailed: "❌ Traitement Échoué",
            error: "Erreur:",
            tryAgain: "Veuillez réessayer avec un fichier différent.",
            
            // Validation des fichiers
            invalidFileType: "Veuillez sélectionner un PDF, fichier texte ou image (JPG/PNG)",
            fileTooLarge: "La taille du fichier doit être inférieure à 10MB"
        },
        
        // Analyse IA
        analysis: {
            analyzing: "🤖 Analyse avec l'IA...",
            sending: "Envoi de votre rapport à l'IA pour analyse. Cela peut prendre un moment...",
            results: "🤖 Résultats de l'Analyse IA",
            summary: "📋 Résumé",
            detailedAnalysis: "📊 Analyse Détaillée",
            recommendations: "💡 Recommandations",
            important: "Important:",
            
            // Niveaux de sévérité
            severity: {
                normal: "NORMAL",
                borderline: "LIMITE",
                abnormal: "ANORMAL"
            },
            
            // Détails des paramètres
            yourValue: "📊 Votre Valeur:",
            normalRange: "📋 Plage Normale:",
            confidence: "Confiance:",
            
            // Boutons
            downloadPDF: "📄 Télécharger PDF",
            readAloud: "🔊 Lire à Haute Voix",
            analyzeAnother: "📋 Analyser un Autre Rapport",
            
            // Analyse échouée
            analysisFailed: "❌ Analyse IA Échouée",
            analysisErrors: [
                "Problèmes de connectivité réseau",
                "Serveur temporairement indisponible",
                "Format de texte invalide"
            ],
            tryThese: [
                "Vérifiez votre connexion internet",
                "Attendez un moment et réessayez",
                "Assurez-vous que le texte contient des données médicales"
            ],
            tryAgainBtn: "🔄 Réessayer",
            
            // Analyse d'exemple
            sampleSummary: "Basé sur l'analyse du rapport médical, la plupart des paramètres semblent être dans les plages normales avec quelques valeurs nécessitant attention.",
            sampleRecommendations: [
                "Planifiez un rendez-vous de suivi avec votre prestataire de soins pour discuter des niveaux de glucose élevés",
                "Considérez des modifications alimentaires pour réduire l'apport en cholestérol",
                "Maintenez une activité physique régulière",
                "Surveillez régulièrement la pression artérielle"
            ],
            disclaimer: "Cette analyse est à des fins éducatives uniquement et ne doit pas remplacer les conseils médicaux professionnels. Consultez toujours votre prestataire de soins pour une interprétation médicale appropriée."
        },
        
        // Page À Propos
        about: {
            title: "🏥 À Propos de MedSimplifier",
            mission: "Notre Mission",
            missionText: "Nous croyons que comprendre votre santé ne devrait pas nécessiter un diplôme médical. Notre plateforme alimentée par IA transforme des rapports médicaux complexes en explications claires et compréhensibles, permettant aux patients de prendre le contrôle de leur parcours de santé.",
            whyChoose: "Pourquoi Choisir MedSimplifier?",
            technology: "Notre Technologie",
            technologyText: "MedSimplifier utilise des technologies de pointe de traitement du langage naturel et d'apprentissage automatique pour analyser les rapports médicaux. Notre système est formé sur de vastes bases de données médicales et mis à jour en continu avec les dernières connaissances médicales pour assurer précision et fiabilité.",
            
            features: {
                aiPowered: {
                    title: "Analyse Alimentée par IA",
                    description: "Algorithmes d'apprentissage automatique avancés formés sur la littérature médicale pour fournir des interprétations précises."
                },
                instant: {
                    title: "Résultats Instantanés",
                    description: "Obtenez des explications simplifiées en secondes, pas en heures. Notre système traite les rapports en temps réel."
                },
                personalize