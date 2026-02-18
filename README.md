# Visualization Dashboard - Test Assignment

## Overview
This project is a **Data Visualization Dashboard** built to analyze and visualize insights from the provided JSON data (`jsondata.json`). The dashboard provides interactive charts, graphs, and filters to explore key variables such as **Intensity, Likelihood, Relevance, Year, Country, Topics, Region, and City**. The goal is to help users easily interpret trends and patterns in the dataset.

---

## Features

### Data & Backend
- JSON data (`jsondata.json`) is imported into a **MongoDB** database.
- A **RESTful API** is developed using **Node.js / Python (FastAPI / Django)** to fetch data from MongoDB.
- Data retrieval endpoints support dynamic filtering for enhanced interactivity.

### Frontend & Visualization
- Built with **React.js / Next.js / Angular / JavaScript** (choose as per your stack).
- Interactive charts and graphs created using **D3.js**, **Chart.js**, or **Plotly.js**.
- Filters include:
  - End Year
  - Topics
  - Sector
  - Region
  - PEST
  - Source
  - SWOT
  - Country
  - City
  - Additional filters based on dataset for enhanced analysis
- Users can interact with charts to explore data dynamically.

---

## Key Variables Visualized
- **Intensity** – Measure of impact or significance.
- **Likelihood** – Probability of occurrence.
- **Relevance** – Importance to the sector/topic.
- **Year** – Timeline of events/data points.
- **Country / Region / City** – Geographic insights.
- **Topics / Sector / PEST / SWOT / Source** – Contextual and domain-specific insights.

---

## Installation

### Backend
1. Clone the repository:
```bash
git clone <repo-url>
cd visualization-dashboard/backend
```
2. Install dependencies:
```
npm install 
```
3. Start the server:
```
npm start
```
## Frontend

1. Navigate to the frontend folder:
```
cd ../frontend
```

2. Install dependencies:
```
npm install
```

3. Start the frontend server:
```
npm start
```

---
## Usage

- Open the frontend application in the browser (usually at http://localhost:3000).

- Use the filters to select Year, Topics, Sector, Region, Country, City, and other dimensions.

- Explore interactive charts to gain insights from the data.

---

## Technologies Used

Frontend: React.js 

Backend: Node.js / Express 

Database: MongoDB

Visualization: Chart.js

Others: Axios / Fetch API for data fetching

---
## License

This project is for educational purposes only.