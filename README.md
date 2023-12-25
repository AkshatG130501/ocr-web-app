# Project Overview
    The Thai ID OCR App is a web application designed to perform OCR on Thai ID cards, extracting key information such as name, last name, identification number, date of issue, date of expiry, and date of birth.

  # Setup Instructions
    To set up the project locally, follow these steps:

    Clone the repository: git clone <repository-url>
    Install dependencies:
    Frontend: cd client && npm install
    Backend: cd server && npm install
    Run the application:
    Frontend: cd client && npm start
    Backend: cd server && npm start
    How to Run
    To start the application, follow these steps:
    
    Open a terminal.
    Navigate to the project directory.
    Run the command: npm start
    Access the application at http://localhost:3000.
    
# API Endpoints
    The application exposes the following API endpoints:

    /api/ocr: POST, PUT, GET, DELETE for managing OCR records.
    User Interface Guide
    Access the web application.
    Upload a Thai ID card image (PNG, JPEG, JPG) using the provided form.
    View the JSON output displaying extracted information.
    Filter the OCR history based on criteria.
    
# Database Setup
    MongoDB is used as the database for storing OCR data. No manual setup is required as the application handles database interactions.

