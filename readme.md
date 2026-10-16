# 🚀 MERN Stack Admin Panel & Dashboard

A modern, clean, and fully responsive Admin Panel built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) and styled with **Tailwind CSS**. Designed for seamless backend management, inventory tracking, category organization, user administration, and real-time data visualization.

---

## ✨ Key Features

### 1. 📊 Dashboard & Analytics
- **Live Summary Cards:** Real-time metrics tracking total products, categories, and registered users.
- **Dynamic Charts:** Powered by **Recharts**, displaying live database trends and stock distribution.
- **Navigation Layout:** Responsive sidebar navigation and clean top control bar.

### 2. 📦 Product Management
- **Structured Data Tables:** View all inventory items with SKU, pricing, stock levels, and status badges.
- **CRUD Operations:** Complete capabilities to add new products, view inventory details, and delete records.
- **Category Linking:** Associate products dynamically with active categories from the database.

### 3. 📂 Category Management
- **Hierarchical Tables:** Structured listing of all product categories and descriptions.
- **Full CRUD Support:** Easily create, update, and remove categories with instant UI updates.

### 4. 👥 User Management
- **Admin & User Directories:** View registered user accounts, roles (`Admin` / `User`), and status tags.
- **Account Administration:** Secure removal and role oversight.

### 5. 🔒 Authentication & Security
- **Secure Access:** Password hashing via `bcryptjs` and session tokens via JSON Web Tokens (`JWT`).
- **Protected Routes:** Guarded backend API endpoints and protected frontend views.

---

## 🛠️ Technology Stack

- **Frontend:** React.js, Tailwind CSS, Recharts, Lucide Icons, React Router DOM, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose ODM
- **Security:** JSON Web Tokens (JWT), bcryptjs, CORS

---

## 📁 Project Directory Structure

```text
mern-admin-panel/
│
├── server/                   # Backend (Node.js & Express)
│   ├── config/               # Database connection
│   ├── controllers/          # Business logic handlers
│   ├── middleware/           # Authentication & route protection
│   ├── models/               # Mongoose schemas (User, Product, Category)
│   ├── routes/               # Express API endpoints
│   └── server.js             # Server entry point
│
└── client/                   # Frontend (React.js & Tailwind CSS)
    ├── public/               # Static assets & index.html
    ├── src/
    │   ├── layouts/          # Dashboard wrapper layout
    │   ├── pages/            # Views (Dashboard, Products, Categories, Users, Login, Register)
    │   ├── services/         # Axios API service configuration
    │   ├── App.js            # Root component
    │   ├── routes.js         # Client-side router configuration
    │   └── index.css         # Tailwind directives
    └── package.json
```

---

## ⚙️ Installation & Setup Guide

### Prerequisites
Make sure you have **Node.js** and **MongoDB** installed on your local machine.

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/mern-admin-panel.git
cd mern-admin-panel
```

### 2. Backend Setup
Navigate to the server directory, install dependencies, and start the server:
```bash
cd server
npm install
# or yarn install
```
Create a `.env` file inside the `server/` folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern_admin_db
JWT_SECRET=your_super_secret_jwt_key
```
Start the backend development server:
```bash
npm run dev
# or yarn dev
```

### 3. Frontend Setup
Open a new terminal window, navigate to the client directory, install dependencies, and start the React app:
```bash
cd client
npm install
# or yarn install
npm start
# or yarn start
```

The React client will run on `http://localhost:3000` and connect automatically to your Express backend on `http://localhost:5000`.

---

## 📄 API Endpoints Reference

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register a new admin/user | Public |
| **POST** | `/api/auth/login` | Authenticate admin & return JWT | Public |
| **GET** | `/api/products` | Retrieve all products | Public |
| **POST** | `/api/products` | Create a new product | Protected |
| **DELETE**| `/api/products/:id` | Delete a product | Protected |
| **GET** | `/api/products/stats` | Fetch dashboard counts & trends | Protected |
| **GET** | `/api/categories` | Retrieve all categories | Public |
| **POST** | `/api/categories` | Create a new category | Protected |
| **DELETE**| `/api/categories/:id` | Delete a category | Protected |
| **GET** | `/api/users` | Retrieve registered users | Protected |
| **DELETE**| `/api/users/:id` | Delete a user account | Protected |

---

## 💡 Usage Workflow
1. Navigate to `http://localhost:3000/register` to create your initial admin account.
2. Sign in using your credentials on the login page.
3. Use the sidebar to navigate between **Dashboard**, **Products**, **Categories**, and **Users**.
4. Add new categories first, then add products assigned to those categories to watch the charts and summary metrics update in real time!

---

## 🛡️ License
This project is open-source and available under the [MIT License](LICENSE).