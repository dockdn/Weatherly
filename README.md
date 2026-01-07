# Weatherly ☁️🌦

Weatherly is a simple full-stack weather app built with **Node.js** and **Express**.  
Enter a city name and Weatherly will fetch the current conditions from a weather API and display them in a clean, responsive interface.

> Built as a BCS 377 (Full Web App Development) final project.

---

## ✨ Features

- Search the weather by **city name**
- Live data from a third-party weather API (e.g. OpenWeatherMap)
- Displays:
  - Current temperature
  - Weather description
  - Location name
  - Weather icon / styling based on conditions
- Server-side rendering using **'EJS'**
- Custom styling in **`public/styles.css`**
- Basic error handling for invalid cities

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express
- **View Engine:** EJS (`views/index.ejs`)
- **Frontend:** JavaScript (`public/script.js`), HTML via EJS, CSS
- **Environment Variables:** `.env` for API keys and configuration
- **Package Manager:** npm

---

## 📁 Project Structure

```text
BCS 377 - Final Exam / Weatherly
├── public/
│   ├── script.js      # Client-side JS: handles form, fetch, DOM updates
│   └── styles.css     # Layout and styling for the page
├── views/
│   └── index.ejs      # Main page template rendered by Express
├── .env               # Environment variables (NOT committed)
├── .gitignore         # Ignore node_modules, .env, etc.
├── package.json       # Dependencies and npm scripts
├── server.js          # Express server + routing + API call logic
└── README.md
