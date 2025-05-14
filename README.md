# Taito Freelancer Platform

## Overview

Taito is a full-stack web application designed to connect freelancers and customers. Taito allows users to register as customers or freelancers, log in to access role-specific dashboards, create gigs (freelancers only), and search for available gigs (customers only). The platform features a modern, responsive user interface with a teal-and-gray color scheme, enhanced with Google Fonts (Roboto and Poppins). Security is implemented through token-based authentication, and data is hosted on Google Cloud SQL with a free trial. The frontend is deployed on Vercel’s free Hobby plan.

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
- MySQL client (for local testing)
- Git (optional, for version control)
- Windows environment
- Google Cloud account (for Cloud SQL free trial)
- Vercel account (for frontend deployment)

### Installation

1. **Clone the Repository**:
git clone https://github.com/obioma-nduka/taito.git
cd taito

text

Copy

2. **Set Up Google Cloud SQL**:
- Sign up for a Google Cloud free trial at `https://cloud.google.com` (90-day, $300 credit).
- Create a MySQL instance:
  - In the Google Cloud Console, go to `SQL` > `Create Instance` > Select `MySQL`.
  - Instance ID: `taito-mysql`, Root Password: Set a secure password.
  - Region: Choose a nearby region (e.g., `europe-west1`).
  - Machine Type: `db-f1-micro`, Storage: 10 GB.
  - Enable Public IP and add network `0.0.0.0/0` for testing.
- Create the `taito` database and run schema SQL:
gcloud sql connect taito-mysql --user=root
USE taito;
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
INSERT INTO users (name, username, email, password, role) VALUES ('John Doe', 'johndoe', 'john@example.com', '$2b$10$...hashedpassword...', 'freelancer');

text

Copy
- Note the public IP (e.g., `34.123.45.67`) and update the `.env` file in the `server` directory:
DB_HOST=34.123.45.67
DB_USER=root
DB_PASSWORD=your_root_password
DB_NAME=taito
DB_PORT=3306
PORT=5000

text

Copy

3. **Install Dependencies**:
- **Backend**:
cd server
npm install mysql2 dotenv cors

text

Copy
- **Frontend**:
cd ..\client
npm install

text

Copy

4. **Run Locally**:
- Start the backend server:
cd ..\server
node index.js

text

Copy
- In a new Command Prompt, start the frontend (for local testing):
cd ..\client
npm start

text

Copy
- Open your browser at `http://localhost:3000`.

5. **Deploy to Vercel**:
- Sign up at `https://vercel.com` with your GitHub account.
- Import the `taito` repository, set the root directory to `client`, and deploy.
- Add environment variable `REACT_APP_API_URL=http://localhost:5000` in Vercel settings.
- Get the deployed URL (e.g., `taito-client-xyz.vercel.app`).

## Usage

- **Registration**: Visit `/register` (local: `http://localhost:3000/register`, Vercel: `taito-client-xyz.vercel.app/register`) to create an account. Choose a role and provide details.
- **Login**: Use `/login` with credentials to access your dashboard.
- **Freelancer Dashboard**: Create gigs with title, description, and price.
- **Customer Dashboard**: Browse and search gigs (visible to registered customers).
- **Homepage**: Shows a welcome message; logged-in customers see gigs.
- **Logout**: Click “Logout” in the navbar to end the session.

## Database

- **Schema**: The `taito` database on Google Cloud SQL contains:
- `users`: Stores user details (id, name, username, email, password, role, created_at).
- `gigs`: Stores gig details (id, title, description, price, freelancer_id, created_at) with a foreign key to `users`.
- **Access**: Managed via `mysql2/promise` with connection pooling in the backend.
- **Sample Data**: Inserted via the schema SQL; gigs are added dynamically.

## Technologies Used

- **Frontend**:
- React (v18.x) with `createRoot` for rendering.
- React Router DOM for navigation.
- Axios for HTTP requests.
- CSS with Google Fonts (Roboto, Poppins).
- **Backend**:
- Node.js with Express for the server.
- MySQL2/promise for Google Cloud SQL interactions.
- JSON Web Tokens (JWT) for authentication.
- CORS for cross-origin requests.
- **Development Environment**: Windows with Command Prompt.
- **Hosting**:
- Google Cloud SQL (free trial) for the database.
- Vercel (Hobby plan) for the frontend.
- **Other Tools**: npm, Git.