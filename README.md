# 📌 AnimeScope

##  Project Overview
AnimeScope is a **web-based platform** for tracking, managing, and reviewing anime. Users can **browse anime**, **review them**, and view **top-rated series** on a leaderboard. The platform features a modern React frontend and a Node.js + Express + MySQL backend for reliable data management.  

## 🖼️ Project Screenshots
| Home Page | Review Page | Leaderboard |
|-----------|---------------|-------------|
| <img width="1919" height="1019" alt="Screenshot 2025-08-26 062204" src="https://github.com/user-attachments/assets/6a587a62-ba9e-4a19-817a-a9b2ca1a2be5" /> |<img width="1919" height="1017" alt="Screenshot 2025-08-26 062139" src="https://github.com/user-attachments/assets/3438eda5-490c-4c82-bb28-cd2c200878f1" /> | <img width="1919" height="1000" alt="Screenshot 2025-08-26 062038" src="https://github.com/user-attachments/assets/db6d4042-f7af-49ad-97eb-400caca2414f" /> |

## 🚀 Key Features
### 📌 Core Features
- **View all anime** with detailed descriptions and cover images  
- **Add, update, delete anime** (admin functionality)  
- **Review and rate anime** for community feedback  
- **Leaderboard** of top-rated anime  
- **Responsive UI** for desktop and mobile devices  

## 🛠️ Tech Stack
### 🖥️ Frontend
- **React.js** - Core UI framework  
- **React Router** - Client-side navigation  
- **Axios** - HTTP requests to backend  

### ⚙️ Backend
- **Node.js + Express** - Server-side logic  
- **MySQL (mysql2)** - Relational database for storing anime and reviews  
- **CORS** - Cross-origin request handling  

### 🗄️ Database
- **MySQL** - Relational DB with `books` and `reviews` tables  


## 🚀 Installation Guide

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/animescope.git
cd animescope
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
The frontend will run at: `http://localhost:3000`

### 3. Backend Setup
```bash
cd ../backend
npm install
npm install dotenv
```

### 4. Environment Configuration
Configure the `.env` file in the backend folder:
```env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=
```

### 5. Database Setup
Connect to MySQL and run the following commands:

```sql
-- Create database
CREATE DATABASE manga;
USE manga;

-- Create books table
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    cover VARCHAR(500),
    price DECIMAL(10,2),
   
);

-- Create reviews table
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    reviewer_name VARCHAR(100) NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);


```

### 6. Start the Backend Server
```bash
npm start
```

The backend will run at: `http://localhost:8800`

---

## 📁 Project Structure

```
animescope/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── uassets/
│   │   └── App.js
│   └── package.json
├── backend/                # Node.js backend
│   ├── index.js
│   ├── .env
│   └── package.json
├── README.md
└── .gitignore
```


## 🔧 API Endpoints

### Books
- `GET /` - Backend status check
- `GET /books` - Get all books
- `GET /books/:id` - Get single book with reviews and ratings
- `POST /books` - Add new book
- `PUT /books/:id` - Update book
- `DELETE /books/:id` - Delete book

### Reviews
- `POST /books/:id/reviews` - Add review to a book

### Leaderboard
- `GET /leaderboard` - Get top-rated books (top 10)


## 📊 Database Schema

### Books Table
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Auto-increment primary key |
| title | VARCHAR(255) | Book title |
| description | TEXT | Book description |
| cover | VARCHAR(500) | Cover image URL |
| price | DECIMAL(10,2) | Book price |


### Reviews Table
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Auto-increment primary key |
| book_id | INT (FK) | Foreign key to books table |
| reviewer_name | VARCHAR(100) | Name of reviewer |
| rating | INT | Rating (1-5) |
| review_text | TEXT | Review content |
| created_at | TIMESTAMP | Creation timestamp |




