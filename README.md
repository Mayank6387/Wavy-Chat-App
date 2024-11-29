Wavy Chat App
A real-time chat application built with React, Node.js, Socket.io, and MongoDB.
Overview
Wavy Chat App is a full-stack web application that allows users to communicate in real-time. It features user authentication, role-based access control (RBAC), and secure messaging. The app is designed for seamless user interaction with a modern UI and robust backend.

Features
Authentication:
Secure user registration, login, and logout using JWT.
Passwords hashed using bcrypt for enhanced security.
Role-Based Access Control (RBAC):
Role-specific permissions for Admins, Users.
Controlled access to specific resources based on user roles.
Real-Time Communication:
Instant messaging with Socket.io.
User connection management and real-time notifications.
File Sharing:
Profile picture uploads and file sharing capabilities.
Responsive Design:
Modern UI built with React and Tailwind CSS.

Core Requirements
The project meets the following key requirements:
Implements secure authentication with JWT.
Role-based authorization for Admins, Users, and Moderators.
Role-specific resource access control.
Secure session management with cookies.

Technologies Used
Frontend:
React.js
Vite.js
Tailwind CSS
Backend:
Node.js
Express.js
Socket.io
Database:
MongoDB (using Mongoose ORM)
Authentication:
JSON Web Tokens (JWT)
bcrypt (password hashing)

Installation
Prerequisites
Ensure you have the following installed:
Node.js
MongoDB
npm or yarn
Steps
Clone the repository:
bash
Copy code
git clone <repository-url>
cd Wavy-Chat-App
Install dependencies:
bash
Copy code
cd client
npm install
cd ../server
npm install
Install dependencies:
bash
Copy code
cd client
npm install
cd ../server
npm install
3.Set up environment variables:
Create a .env file in the server directory with the following:
makefile
Copy code
DATABASE_URL=<your-mongo-db-url>
JWT_SECRET=<your-jwt-secret>
ORIGIN=<frontend-url>


Start the development servers:
Backend:
bash
Copy code
cd server
npm start


Frontend:
bash
Copy code
cd client
npm run dev


Access the application at http://localhost:3000.

Folder Structure
bash
Copy code
Wavy-Chat-App/
  client/       # Frontend React code
  server/       # Backend Node.js and Express code
  routes/       # API routes (e.g., AuthRoute.js)
  models/       # Mongoose schemas
  socket.js     # Real-time socket events
  uploads/      # Uploaded files and profiles


Usage
Register as a new user or log in with existing credentials.
Start a chat with other users.
Admins and Moderators can manage content and access restricted endpoints.

