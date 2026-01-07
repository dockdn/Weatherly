require("dotenv").config();

// SETUP (07-EXPRESS-JS.SERVER)
const express = require("express");
const app = express();

const PORT = 3000;
const API_KEY = process.env.OPENWEATHER_API_KEY;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

// NORMALIZE AND VALIDATE INPUTS
function normalizeOptions(q) {
  const city = (q.city || "").trim();
  const units = (q.units === "imperial" || q.units === "metric") ? q.units : "metric";
  const lang = (q.lang === "es" || q.lang === "en") ? q.lang : "en";
  const type = (q.type === "5day") ? "5day" : "today";
  return { city, units, lang, type };
}

// FORM.UNITS / FORM.LANG WIRING
function unitsLabel(units) {
  return units === "imperial" ? "°F" : "°C";
}
function windLabel(units) {
  return units === "imperial" ? "mph" : "m/s";
}

// 1 ITEM PER CARD FOR 5-DAY FORECAST
function pickDailyForecast(list) {
  const byDate = {};
  for (const item of list) {
    const dtTxt = item.dt_txt; // "YYYY-MM-DD HH:MM:SS"
    const [date, time] = dtTxt.split(" ");
    if (!byDate[date]) byDate[date] = [];
    byDate[date].push(item);
  }

  const dates = Object.keys(byDate).sort();
  const picked = [];

  // 5 FROM OPENWEATHER
  return picked.slice(0, 5);
}

// GET /
app.get("/", (req, res) => {
  res.render("index", {
    form: { city: "", units: "metric", lang: "en", type: "today" },
    result: null,
    forecast: null,
    error: null
  });
});

// GET /search
app.get("/search", async (req, res) => {
  const form = normalizeOptions(req.query);

  if (!API_KEY) {
    return res.render("index", {
      form,
      result: null,
      forecast: null,
      error: "Server error: OPENWEATHER_API_KEY is missing. Check your .env file."
    });
  }

  if (!form.city) {
    return res.render("index", {
      form,
      result: null,
      forecast: null,
      error: "Please enter a city name."
    });
  }

  try {
    if (form.type === "today") {
      const url =
        `https://api.openweathermap.org/data/2.5/weather` +
        `?q=${encodeURIComponent(form.city)}` +
        `&appid=${API_KEY}` +
        `&units=${form.units}` +
        `&lang=${form.lang}`;

      const r = await fetch(url);
      const data = await r.json();

      if (!r.ok) {
        const msg = data?.message ? `OpenWeather: ${data.message}` : "Invalid city or API error.";
        return res.render("index", { form, result: null, forecast: null, error: msg });
      }

      const result = {
        city: `${data.name}, ${data.sys?.country || ""}`.trim(),
        temp: Math.round(data.main.temp),
        feels: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        wind: data.wind.speed,
        condition: data.weather?.[0]?.description || "—",
        iconUrl: data.weather?.[0]?.icon
          ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
          : null,
        units: unitsLabel(form.units),
        windUnits: windLabel(form.units)
      };

      return res.render("index", { form, result, forecast: null, error: null });
    }

    // 5-DAY FORECAST REQUEST W/ API PARAMETERS
    const url =
      `https://api.openweathermap.org/data/2.5/forecast` +
      `?q=${encodeURIComponent(form.city)}` +
      `&appid=${API_KEY}` +
      `&units=${form.units}` +
      `&lang=${form.lang}`;

    const r = await fetch(url);
    const data = await r.json();

    // API ERROR HANDLING (BAD REQUEST / INVALID INPUT)
    if (!r.ok) {
      const msg = data?.message ? `OpenWeather: ${data.message}` : "Invalid city or API error.";
      return res.render("index", { form, result: null, forecast: null, error: msg });
    }

    //CLEAN LIST FOR 5-DAY FORECAST (ONE ITEM PER CARD)
    const daily = pickDailyForecast(data.list || []);
    const forecast = daily.map(item => ({
      date: item.dt_txt.split(" ")[0],
      temp: Math.round(item.main.temp),
      humidity: item.main.humidity,
      wind: item.wind.speed,
      condition: item.weather?.[0]?.description || "—",
      iconUrl: item.weather?.[0]?.icon
        ? `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
        : null
    }));

    // CITY/TITLE INFO
    const result = {
      city: `${data.city?.name || form.city}, ${data.city?.country || ""}`.trim(),
      units: unitsLabel(form.units),
      windUnits: windLabel(form.units)
    };

    // ERROR HANDLING
    return res.render("index", { form, result, forecast, error: null });
  } catch (err) {
    return res.render("index", {
      form,
      result: null,
      forecast: null,
      error: "Network/server error. Please try again."
    });
  }
});

// START SERVER ON PORT 3000 (USUAL CLASS SETUP)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
