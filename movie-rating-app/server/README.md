# Backend Server

This directory contains the Node.js/Express backend server for the Movie Rating App.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - The `.env` file is already configured with your MongoDB Atlas connection string
   - Make sure not to commit this file to version control

3. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie by ID
- `GET /api/movies/category/:category` - Get movies by category
- `GET /api/movies/genre/:genre` - Get movies by genre

## Project Structure

```
server/
├── config/
│   └── db.js           # MongoDB connection configuration
├── models/
│   ├── User.js         # User schema
│   └── Movie.js        # Movie schema
├── routes/
│   ├── users.js        # User API routes
│   └── movies.js       # Movie API routes
├── .env                # Environment variables (DO NOT COMMIT)
├── .gitignore
├── package.json
└── server.js           # Main server entry point
```

## Environment Variables

- `MONGODB_URI` - MongoDB Atlas connection string
- `PORT` - Server port (default: 5000)
- `CLIENT_URL` - Frontend URL for CORS (default: http://localhost:5173)
