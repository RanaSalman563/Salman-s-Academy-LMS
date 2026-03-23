## Live Links
 Frontend (Vercel): https://salman-s-academy-lms-ner8.vercel.app
  Backend (Railway): https://marvelous-prosperity-production.up.railway.app

 GitHub Repository: https://github.com/RanaSalman563/Salman-s-Academy-LMS

#  Salman's Academy  MERN Stack LMS

A full-featured Learning Management System built with the MERN stack (MongoDB, Express, React, Node.js).

##  Features

 **Three User Roles**: Admin, Instructor, Student
 **Authentication**: JWT-based auth with bcrypt password hashing
 **Role-Based Access Control**: Protected routes and API endpoints
 **Course Management**: Create, edit, delete, publish courses with lessons
 **Enrollment System**: Students can browse and enroll in courses
 **Progress Tracking**: Track lesson completion and course progress
 **Admin Dashboard**: Analytics, user management, course oversight
 **Responsive Design**: Bootstrap 5 + custom CSS

## 🛠️Tech Stack

## Frontend
 React 18 with Hooks
 React Router v6
 Axios for API calls
 Bootstrap 5 + React Bootstrap
 Context API for state management

## Backend
 Node.js + Express.js
 MongoDB + Mongoose
 JWT Authentication
 Bcryptjs for password hashing
 CORS enabled

Project Structure

The LMS project is divided into two main parts: backend and frontend.

Backend

The backend handles the server, database, and API logic.

config/ Database connection setup

controllers/  Handles request and response logic

middleware/  Authentication and other middle functions

models/  Mongoose schemas for database data

routes/  API endpoints for the application

seed.js  Script to add sample data to the database

server.js   Main file that starts the server

.env.example  Example environment variables file

###Frontend

The frontend is built with React and handles the user interface.

components/  Reusable UI components

context/  Global state management (like authentication)

pages/  Main pages of the app

public/  Pages for all users

student/  Student dashboard and features

instructor/  Instructor related pages

admin/  Admin management pages

routes/  Protected routes and navigation logic

services/  API request functions to communicate with backend

#  Installation & Setup

## Prerequisites
 Node.js (v16+)
 MongoDB (local or MongoDB Atlas)


## Setup Backend

cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env and set your MONGO_URI and JWT_SECRET

# Seed the database with demo data
node seed.js

# Start the server
npm run dev   # development (nodemon)
npm start     # production


## Setup Frontend

cd frontend
npm install
npm start


The app will run at `http://localhost:3000` and backend at `https://marvelous-prosperity-production.up.railway.app`.

## API Endpoints

## Auth
POST /api/auth/register – public

POST /api/auth/login – public

GET /api/auth/me – private (needs token)

PUT /api/auth/profile – private

### Courses
I built these endpoints for managing courses. Anyone can view courses, but only instructors and admins can create, update, or delete them.

GET /api/courses  public, shows all courses

GET /api/courses/:id   public, shows one course

POST /api/courses  instructors/admins can create a new course

PUT /api/courses/:id   instructors/admins can update a course

DELETE /api/courses/:id  instructors/admins can delete a course

POST /api/courses/:id/lessons   instructors/admins can add a lesson to a course

## Users (Admin only)
GET /api/users 

DELETE /api/users/:id 

GET /api/users/analytics 

### Enrollments
POST /api/enrollments/enroll 
GET /api/enrollments/my-courses 
GET /api/enrollments/check/:courseId 
PUT /api/enrollments/:courseId/progress 

##  Demo Accounts

After running `node seed.js`:

Admin: admin@lms.com / admin123
Instructor: instructor@lms.com / pass123
Student: student@lms.com / pass123

##  Database Models

### User
 name, email, password (hashed), role, bio, avatar, timestamps

### Course  
 title, description, instructor (ref), category, price, level, lessons[], isPublished, enrollmentCount, timestamps

### Enrollment
 student (ref), course (ref), progress, completedLessons[], isCompleted, enrolledAt

## 🔐 Security Features
- Passwords hashed with bcryptjs 
- JWT tokens expire after 30 days
- Role based route protection
- Environment variables for secrets
- Admin accounts are protected from deletion

# Salman-s-Academy-LMS
MERN Stack Learning Management System  with Admin, Instructor and Student roles.

