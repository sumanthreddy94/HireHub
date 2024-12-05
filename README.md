# HireHub

## Table of Contents
- [HireHub](#hirehub)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Tech Stack](#tech-stack)
      - [Backend](#backend)
      - [Frontend](#frontend)
    - [Special Libraries \& Their Usage](#special-libraries--their-usage)
      - [Backend Libraries](#backend-libraries)
      - [Frontend Libraries](#frontend-libraries)
  - [Roles](#roles)
    - [Employer](#employer)
    - [Job Seeker](#job-seeker)
    - [Admin](#admin)
  - [Folder Structure](#folder-structure)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
  - [Installation Instructions](#installation-instructions)

## Overview
This web application is designed to cater to the needs of three primary user roles: Job Seeker, Employer, and Admin. Each role has specific access to various functionalities, which are built on a backend using Node.js, Express, and MongoDB, while the frontend is powered by React. The application provides features such as resume upload and viewing, job application tracking, data visualization, and admin management tools.

### Tech Stack

#### Backend
- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for Node.js used to handle routing and middleware.
- **MongoDB**: NoSQL database for storing data, including user profiles.

#### Frontend
- **React**: JavaScript library for building user interfaces.
- **Redux**: For managing the application state.
- **React Router**: For handling client-side routing.
- **Axios**: For making HTTP requests to interact with the backend.

### Special Libraries & Their Usage

#### Backend Libraries
- **Multer**: Middleware for handling file uploads (e.g., resume upload).
- **JWT (JSON Web Token)**: For authenticating users and managing sessions.

#### Frontend Libraries
- **Recharts**: For creating data visualizations, such as charts or graphs.
- **@react-three/fiber**: For rendering 3D graphics in React applications.
- **React PDF**: For viewing PDF documents like resumes.
- **React PDF Viewer**: For viewing PDFs with advanced features like zooming, downloading, printing.

## Roles

### Employer
- Employer can post jobs.
- Receive applications from Job Seekers.
- View all posted jobs.
- View current job openings.

### Job Seeker
- Job Seeker can search for jobs.
- Delete application.
- Apply for jobs, upload resume.

### Admin
- Admin can view analytics, based on aggregated data from the backend API.
- Admin can view the list of users and their roles.
- Admin can delete users.

## Folder Structure

### Backend
- **controllers/**: Contains the controllers to handle API routes.
- **models/**: Defines the Mongoose models (e.g., User).
- **middleware/**: Authentication, token management, error handling.
- **routes/**: Route mapping to controllers.
- **uploads/**: Upload directory to store files.
- **utils/**: Utility files like token generator.

### Frontend
- **assets/**: To store app images, etc.
- **components/**: Functionality-based folders, each folder with its own React components.
- **styles/**: Common CSS files for styling.
  - **Components/Common**: Reusable common components like delete confirmation box.
  - **Components/Admin**: User list, dashboard components.
  - **Components/Canvas**: 3D rendering, Three.js components.
  - **Components/redux**: Store management for user authentication and session management.
  - **Components/Layout**: Footer, navbar.
  - **Components/NotFound**: NotFound page component.

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone <repo_url>
   
   cd backend
   npm install
   nodemon index.js
   
   cd frontend
   npm install
   npm run dev