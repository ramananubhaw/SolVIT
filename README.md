# SolVIT - VIT Hostel Complaint Management System

A web application for managing hostel complaints at VIT University.

## Features

- User registration and authentication
- Admin registration and authentication
- Complaint submission and tracking
- Complaint categorization with AI
- Priority-based complaint management
- Real-time status updates

## Tech Stack

- Frontend: React.js with Vite
- Backend: Node.js with Express
- Database: MongoDB
- Testing: Selenium with Python
- AI: Hugging Face for complaint categorization

## Prerequisites

- Node.js (v14 or higher)
- Python 3.8 or higher
- MongoDB
- Chrome browser (for Selenium tests)

## Setup Instructions

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Solvit_v2
```

2. Set up the backend:
```bash
cd server
npm install
# Create a .env file with required environment variables
npm start
```

3. Set up the frontend:
```bash
cd client
npm install
npm run dev
```

4. Set up the test environment:
```bash
# Create and activate virtual environment
python -m venv venv
# On Windows
.\venv\Scripts\activate
# On Unix/MacOS
source venv/bin/activate

# Install test dependencies
pip install -r tests/requirements.txt
```

## Running Tests

With the virtual environment activated:
```bash
python tests/test_solvit.py
```

## Environment Variables

Create a `.env` file in the server directory with the following variables:
```
PORT=3000
MONGO_URL=your_mongodb_url
SECRET_ACCESS_TOKEN=your_secret_token
GMAIL_USERNAME=your_gmail
GMAIL_PASSWORD=your_gmail_password
JWT_TOKEN_EXPIRY_TIME=1h
AUTHENTICATION_COOKIE_EXPIRY_TIME=55000
HF_TOKEN_NAME=solvit_token
HF_ACCESS_TOKEN=your_huggingface_token
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 