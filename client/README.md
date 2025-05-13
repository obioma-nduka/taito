# Taito Freelancer Platform

## Overview

Taito is a full-stack web application designed to connect freelancers and customers. As of 06:34 PM EEST on Tuesday, May 13, 2025, Taito allows users to register as customers or freelancers, log in to access role-specific dashboards, create gigs (freelancers only), and search for available gigs (customers only). The platform features a modern, responsive user interface with a teal-and-gray color scheme, enhanced with Google Fonts (Roboto and Poppins). Security is implemented through token-based authentication, and data is stored in a MySQL database.

## Features

- User registration with roles (customer or freelancer).
- Secure login with token-based authentication.
- Freelancer dashboard for creating and managing gigs.
- Customer dashboard for browsing and searching gigs.
- Homepage restricted to logged-in customers for gig visibility.
- Personalized welcome messages displaying usernames on dashboards.
- Responsive design optimized for desktop, tablet, and mobile devices.

## Setup Instructions

### Prerequisites

- Node.js (v18.x or later)
- npm (v9.x or later)
- MySQL (v8.x or later)
- Git (optional, for version control)
- Windows environment

### Installation

1. **Clone the Repository**:
git clone https://github.com/yourusername/taito.git
cd taito

text

Copy

2. **Set Up the Database**:
- Install MySQL and start the server.
- Create a database named `taito`:
CREATE DATABASE taito;
USE taito;

text

Copy
- Create the required tables by running the following SQL commands:
CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
username VARCHAR(50) UNIQUE NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
role ENUM('customer', 'freelancer') NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gigs (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
price DECIMAL(10, 2) NOT NULL,
freelancer_id INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (freelancer_id) REFERENCES users(id)
);

text

Copy
- Insert a test user (e.g., `johndoe`):
INSERT INTO users (name, username, email, password, role) VALUES ('John Doe', 'johndoe', 'john@example.com', '$2b$10$...hashedpassword...', 'freelancer');

text

Copy

3. **Configure Environment Variables**:
- Create a `.env` file in the `server` directory:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=taito
PORT=5000

text

Copy
- Replace `your_password` with your MySQL root password.

4. **Install Dependencies**:
- **Backend**:
cd server
npm install

text

Copy
- **Frontend**:
cd ..\client
npm install

text

Copy

5. **Run the Application**:
- Start the backend server:
cd ..\server
node index.js

text

Copy
- In a new Command Prompt, start the frontend:
cd ..\client
npm start

text

Copy
- Open your browser at `http://localhost:3000`.

## Usage

- **Registration**: Visit `/register` to create a new account. Choose a role (customer or freelancer) and provide a username, email, and password.
- **Login**: Use `/login` with your credentials to access the platform. You’ll be redirected to your dashboard based on your role.
- **Freelancer Dashboard**: Create gigs with a title, description, and price. Gigs are stored in the database and visible to customers.
- **Customer Dashboard**: Browse and search available gigs using the search bar. Only registered customers can see gigs.
- **Homepage**: Displays a welcome message for all users. Logged-in customers can view and search gigs; others are prompted to log in or register.
- **Logout**: Click “Logout” in the navbar to end your session and return to the homepage.

## Database

- **Schema**: The `taito` database contains two tables:
- `users`: Stores user details (id, name, username, email, password, role, created_at).
- `gigs`: Stores gig details (id, title, description, price, freelancer_id, created_at) with a foreign key linking to `users`.
- **Access**: Managed via a MySQL connection in the backend using the `mysql2/promise` package.
- **Sample Data**: Use the provided SQL commands to insert a test user. Gigs are dynamically added via the freelancer dashboard.

## Technologies Used

- **Frontend**:
- React (v18.x) with `createRoot` for rendering.
- React Router DOM for navigation.
- Axios for HTTP requests.
- CSS for styling with Google Fonts (Roboto, Poppins).
- **Backend**:
- Node.js with Express for the server.
- MySQL2/promise for database interactions.
- JSON Web Tokens (JWT) for authentication.
- **Development Environment**: Windows with Command Prompt for running scripts.
- **Other Tools**: npm for package management, Git for version control (optional).