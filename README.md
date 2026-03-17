# 🍽️ Food Distribution Platform (MERN)
A full-stack web application built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)** that helps distribute surplus food efficiently between donors and recipients.
This platform aims to **reduce food waste** by connecting restaurants, individuals, and organizations with NGOs or people in need.
## 📌 Features
* 🔐 User Authentication (Login / Signup)
* 🍱 Food Donation Listing
* 📦 Request & Distribution Management
* 📊 Admin Dashboard
* 🔎 Browse Available Food Donations
* 📍 Real-time Updates (status tracking)
* 📱 Responsive UI
  
## 🛠️ Tech Stack
### Frontend
* React.js
* HTML5, CSS3
* Axios (API calls)
  
### Backend
* Node.js
* Express.js
  
### Database
* MongoDB (Mongoose ODM)
  
### Other Tools
* JWT Authentication
* REST APIs
* dotenv (Environment variables)
 
## 📂 Project Structure

food-distribution-mern/
│
├── client/          # React Frontend
├── server/          # Node.js + Express Backend
├── models/          # Database Models
├── routes/          # API Routes
├── controllers/     # Business Logic
├── .env             # Environment Variables
└── README.md

## 🚀 Getting Started

### Prerequisites

* Node.js installed
* MongoDB (local or Atlas)
* npm or yarn

### 3️⃣ Setup Environment Variables

Create a `.env` file inside the `server` folder and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

### 4️⃣ Run the Application

#### Start Backend
cd server
npm start

#### Start Frontend
cd client
npm start

## 🌐 Usage
* Register or login as a user
* Add surplus food details
* Browse available food donations
* Request food or manage distribution
* Admin can monitor and manage all activities
  
## 🎯 Objectives
* Reduce food wastage
* Enable efficient food redistribution
* Support NGOs and communities
* Promote sustainable practices
