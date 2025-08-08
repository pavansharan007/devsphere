# 💻 Devsphere

**Devsphere** is a modern and minimal platform for developers to showcase their projects and build their personal tech portfolio.

Built with React and powered by Appwrite, it provides a seamless way to upload, view, and manage developer projects in a clean UI.

---

## 🌐 Live Demo

[🔗 View Live Project](https://devsphere-encr.vercel.app/)

---

## 🚀 Features

- 🔐 User authentication (Appwrite)
- 📤 Create and upload your own projects
- 📁 View a list of your posted projects
- 🧑‍💻 Clean and responsive UI with Tailwind CSS
- ⚡ Fast performance using React and Vite

---

## 🛠️ Tech Stack

| Technology      | Description                    |
|-----------------|--------------------------------|
| React           | Frontend framework             |
| Tailwind CSS    | Utility-first CSS framework    |
| Material Tailwind | Pre-built UI components     |
| Appwrite        | Backend (auth, database)       |
| Vite            | Build tool                     |

---


## 📦 Installation

### 1. Clone the repository


git clone https://github.com/pavansharan007/devsphere.git
cd devsphere

###2. Install dependencies
npm install

###3. Configure Appwrite


Create an Appwrite project
Enable authentication
Create a database and collection for projects
Add your Appwrite project settings in a .env file:

VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id

###4.Start Development Server

npm run dev

## 📁 Folder Structure



```plaintext
devsphere/
├── public/                 # Static assets (favicon, images, etc.)
├── src/
│   ├── appwrite/           # Appwrite config & services
│   ├── assets/             # Local images and other assets
│   ├── components/         # Reusable React components
│   ├── conf/               # App configuration files (env, constants)
│   ├── pages/              # Route pages (Home, Login, Dashboard, etc.)
│   ├── store/              # Redux store and slices (if used)
│   ├── App.jsx             # Main App component
│   ├── App.css             # Global styles
│   ├── index.css           # Tailwind & base styles
│   └── main.jsx            # React entry point
├── .gitignore
├── README.md
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML template for React
├── newfile.env.sample      # Sample environment file for Appwrite configs
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js          # Vite build configuration
```







vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv


