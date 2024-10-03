# Quiz App API

### Prerequisites

- Node.js
- MongoDB

### Setup

1. Clone the repository.
2. Navigate to Quiz-App the directory.
3. Run `npm install` to install dependencies.
4. Start MongoDB (if not running).
5. Create a `.env` file in the Quiz-App folder with your MongoDB URI.
6. Run `npm start` to start the server.

### API Endpoints

- `POST /api/quizzes` - Create a new quiz
- `GET /api/quizzes/:id` - Fetch a quiz by ID
- `POST /api/quizzes/:id/answers` - Submit an answer for a question
- `POST /api/quizzes/:id/results` - Get user's results for a quiz
