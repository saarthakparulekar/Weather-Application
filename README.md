# 🌦 Weather Dashboard

A responsive **Weather Dashboard** built with **HTML, CSS, JavaScript, and React.js**.
It uses the **Open-Meteo Geolocation API** to detect user location and the **Open-Meteo Weather API** to fetch and display real-time weather information.

👉 **Live Demo:** [Weather Application](https://saarthakparulekar.github.io/Weather-Application)

---

## ✨ Features

* 🔍 **Search by location** (via Open-Meteo Geolocation API)

* 🌡 **Current Weather Data**:

  * Current temperature
  * Feels-like temperature
  * Humidity percentage
  * Precipitation levels
  * Wind speed

* 📅 **7-Day Forecast**:

  * Weather icon based on weather code
  * Daily high and low temperatures

* ⏰ **Hourly Forecast**:

  * Select any of the next 7 days
  * Hourly temperature
  * Weather icon per hour

---

## 🛠 Tech Stack

* **Frontend:** HTML, CSS, JavaScript, React.js
* **APIs:**

  * [Open-Meteo Geolocation API](https://open-meteo.com/en/docs/geocoding-api)
  * [Open-Meteo Weather API](https://open-meteo.com/en/docs)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/weather-dashboard.git
cd weather-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm start
```

Your app should now be running on [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

```
/public         → static files
/src
  ├── components → React components (ResultPage, SearchBar)
  ├── images     → Icons and background images
  ├── App.js     → Main app logic
  ├── index.js   → React entry point
```

---

## 🔗 API Usage

* **Geolocation API** → fetches latitude & longitude for a given location
* **Weather API** → uses those coordinates to get:

  * Current conditions
  * 7-day daily forecast
  * Hourly forecast for each day

---

## 📸 Screenshots (Optional)

<img width="1875" height="1004" alt="image" src="https://github.com/user-attachments/assets/f1a9e124-1380-4458-9cd3-ade8ecebcf13" />
<img width="1875" height="1004" alt="image" src="https://github.com/user-attachments/assets/6dfe7e05-10c5-4c7f-8068-51a456a15d1e" />
<img width="1875" height="1004" alt="image" src="https://github.com/user-attachments/assets/da2cc5ae-fe8e-4c64-a67a-55a78d087f87" />
<img width="1875" height="1004" alt="image" src="https://github.com/user-attachments/assets/cc895af2-c437-477b-85b0-448ee703dd7b" />


---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo, open issues, and submit pull requests.

---

## 🙌 Acknowledgements

* [Frontend-Mentor](https://www.frontendmentor.io/home) for figma templates, guides, icons and backgrounds
* [Open-Meteo](https://open-meteo.com/) for free weather APIs
* [React](https://react.dev/) for the frontend framework

