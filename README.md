# Customer Management Panel

A simple customer management system built using **React** and **Next.js 15**, designed for single-user access. The panel user can manage customer records and update their own password.

## 🛠️ Tech Stack

- **React 19**
- **Next.js 15**
- **Axios** for API requests

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/customer-management-panel.git
   cd customer-management-panel
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## 🚀 Running the App

### Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## 🔐 Authentication

- This panel supports only **one user**.
- User can **register** and then **log in** to access the panel.
- Authentication protects access to customer management features.

## 👥 Features

- **User Authentication**
  - Register / Login (Single user only)
  - Update Password

- **Customer Management**
  - Add Customer
  - Edit Customer
  - List Customers
  - Delete Customer

## 📌 Notes

- No multi-user support — this app is meant for **a single panel user only**.
- For production use, consider securing API routes and storing user credentials safely (e.g., using JWT, sessions, or OAuth).
- Backend logic should handle secure password hashing, authentication, and customer data persistence.

---

## 📄 License

This project is licensed under the MIT License.
