<div align="center">
  <h1>Welcome to Taskify 👋💻</h1>
  <h3>Live Website for Taskify: <a href="https://group-1-taskify.vercel.app/">Click Here to Visit</a></h3>
</div>

<br>

<p align="center">
<a href="https://codecov.io/gh/EthanTianyiWu/Group-1_Taskify"><img src="https://codecov.io/gh/EthanTianyiWu/Group-1_Taskify/graph/badge.svg" alt="codecov"></a> 
<a href="https://github.com/DSCKGEC/Taskify"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat&logo=github"></a> 
<a href="https://github.com/DSCKGEC/Taskify"><img src="https://img.shields.io/badge/Open%20Source-%F0%9F%A4%8D-Green"></a> 
<a href="https://github.com/DSCKGEC/Taskify"><img src="https://img.shields.io/static/v1.svg?label=Contributions&message=Welcome&color=0059b3&style=flat-square"></a>
</p>

## 🚀 CPT304 Coursework 1: Software Enhancement
This repository has been extensively audited, refactored, and enhanced as part of the **CPT304 Software Engineering 2** coursework to meet professional, responsible, and legal software standards.

### 🌟 Baseline Standards Achieved
- **Live Deployment:** Successfully deployed on Vercel with 7+ days of continuous uptime.
- **Test Coverage:** Achieved **>85% statement coverage** using Jest and Codecov (See badge above).
- **Accessibility (a11y):** Reached a perfect **100 Lighthouse Accessibility Score** by implementing strict semantic HTML and visible keyboard focus identifiers.
- **Internationalization (i18n):** Implemented a working toggle between English and Chinese languages.
- **Legal Compliance:** Integrated a functional Cookie Consent banner and a comprehensive Privacy Policy page to ensure user data transparency.

### 🛠️ Defect Resolutions
Our team systematically identified and resolved 4 critical defects across the application:

* **Student A (Authentication Routing):** Resolved broken form submissions by implementing `POST /signup` and `POST /login` RESTful endpoints. Integrated `bcryptjs` for secure password hashing and MongoDB for persistent user storage.
* **Student B (Authorization & Session Management):** Patched a critical security vulnerability where the `/dashboard` was publicly accessible. Implemented a robust `requireAuth` middleware utilizing `express-session` and `connect-mongo` to protect sensitive routes.
* **Student C (Accessibility Enhancement):** Fixed critical WCAG violations by removing suppressive `outline: none;` CSS rules and applying global `:focus-visible` states, ensuring the application is fully navigable via keyboard for visually impaired users.
* **Student D (DOM Integrity & Templating):** Refactored the EJS component architecture. Stripped illegal root tags (`<html>`, `<body>`) from partials to ensure a single, valid DOM tree. Achieved **0 errors/warnings on W3C Markup Validation Service**.

---

## 📋 Repository Overview

**Taskify** is a task management system for everyone. It is designed to help you manage your tasks and projects from ideation to delivery. This task manager helps to bring in only the necessary parts – without all the annoying clutter.

## 💻 Tech Stacks

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"> <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"> <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white">

## ⚙️ Installation & Setup

1. **Install dependencies:**
```bash
   npm install

```

2. **Configure environmental variables:**
Create a `.env` file in the root directory and add your settings:
```env
NODE_ENV=development
PORT=80
MONGO_URI=[your_mongo_uri]
SECRET=[your_session_secret_key]

```


3. **Run tests (Jest + Coverage):**
```bash
npm test

```


4. **Start the server:**
```bash
npm start

```



## 📁 Folder Structure

```text
├── .github
│   └── workflows       # CI/CD pipelines (Codecov)
├── src
│   ├── db              # MongoDB connection setup
│   ├── middleware      # Auth & Language middlewares
│   ├── models          # Mongoose schemas (User)
│   ├── routes          # Express routers
│   └── app.js          # Application entry point
├── static
│   ├── assets          # Images and icons
│   └── styles          # CSS stylesheets
├── tests               # Jest unit tests
├── views               # EJS templates and partials
├── package.json
└── .env

```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=./LICENSE) file for details.
