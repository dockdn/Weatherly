# Weatherly ☁️🌦

A clean and simple full-stack weather app!
Search any city to instantly view up-to-date weather conditions — powered by **Node.js**, **Express**, and a third-party weather API.

> Built as a **BCS 377 Final Project**.

---

## 🚀 Features

### 🔍 Weather Search

* Search by **city name**
* Fetches live weather data from a weather API (e.g., **OpenWeatherMap**)
* Displays:

  * 🌡️ Current temperature
  * 🌤️ Weather description
  * 📍 City/location name
  * 🖼️ Matching weather icon + dynamic styling

### 🖥️ Server-Side Rendering

* Uses **EJS templates** for clean page rendering
* Central `index.ejs` view pulls in all weather data

### 🛡️ Error Handling

* Error messages for:

  * Invalid city names
  * Missing API responses
  * API key issues

---

## 🛠️ Tech Stack

| Layer       | Tech                                |
| ----------- | ----------------------------------- |
| Frontend    | HTML (EJS), CSS, JS                 |
| Backend     | Node.js, Express                    |
| API         | OpenWeatherMap (or any weather API) |
| Environment | `.env` for API keys                 |
| Deployment  | Render (Free Hosting)               |

---

## 📁 Project Structure

```
project/
├─ public/
│  ├─ script.js        # Handles form submission + fetch + DOM updates
│  ├─ styles.css       # Responsive styling + condition-based visuals
│
├─ views/
│  └─ index.ejs        # Main page rendered by Express
│
├─ server.js           # Weather API call + routing + server config
├─ package.json        # Dependencies + npm scripts
├─ .env                # API key (not committed)
├─ .gitignore
└─ README.md
```

---

## 🔗 Live Site

Try it here: **[https://weatherly-cr07.onrender.com/](https://weatherly-cr07.onrender.com/)**
A fast, clean weather search app with dynamic UI based on live conditions.

*Note: Free Render hosting may take a few minutes if inactive. Once awake, everything loads normally!*

---

## ▶️ Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/dockdn/weatherly.git
cd weatherly
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```
API_KEY=your-weather-api-key-here
```

### 4. Start the server

```bash
npm start
```

### 5. Open the app

Visit:

```
http://localhost:3000
```

---

## 📚 References & Sources

### Weather API Docs

* OpenWeatherMap API
  [https://openweathermap.org/current](https://openweathermap.org/current)

### Node + Express Guides

* Express Routing
  [https://expressjs.com/en/guide/routing.html](https://expressjs.com/en/guide/routing.html)

### Professor Baci – BCS 377

* Lecture slides on Express servers
* In-class demos of API requests via Node
* Tutorials on server-side rendering with EJS

---

## ✔️ Final Notes

This project demonstrates:

* Server-side rendering with **EJS**
* API integration using async fetch
* Node/Express routing
* Clean UI design + real-time data
* Environment variable security
* Deployment to Render
