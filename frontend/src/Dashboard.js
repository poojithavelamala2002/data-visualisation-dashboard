import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Filters from "./Filters";
import Charts from "./Charts";
import DataTable from "./DataTable";
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Memoized fetch function (ESLint safe)
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const cleanFilters = {};
      Object.keys(filters).forEach((key) => {
        if (filters[key]) cleanFilters[key] = filters[key];
      });

      const query = new URLSearchParams(cleanFilters).toString();

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/data?${query}`
      );

      setData(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to load data");
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // ✅ Correct dependency
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ✅ Safety check
  const safeData = Array.isArray(data) ? data : [];

  const avgIntensity =
    safeData.length > 0
      ? (
          safeData.reduce((sum, i) => sum + (Number(i.intensity) || 0), 0) /
          safeData.length
        ).toFixed(2)
      : "0.00";

  const avgLikelihood =
    safeData.length > 0
      ? (
          safeData.reduce((sum, i) => sum + (Number(i.likelihood) || 0), 0) /
          safeData.length
        ).toFixed(2)
      : "0.00";

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (error) return <h2 style={{ textAlign: "center" }}>{error}</h2>;

  return (
    <div className="dashboard-container">
      <h1 className="title">Data Visualization Dashboard</h1>

      <div className="filters-box">
        <Filters filters={filters} setFilters={setFilters} />
      </div>

      <div className="cards-grid">
        <div className="card">
          <h4>Total Records</h4>
          <p>{safeData.length}</p>
        </div>

        <div className="card">
          <h4>Avg Intensity</h4>
          <p>{avgIntensity}</p>
        </div>

        <div className="card">
          <h4>Avg Likelihood</h4>
          <p>{avgLikelihood}</p>
        </div>
      </div>

      <div className="charts-grid">
  <div className="chart-box">
    <div className="chart-title">Intensity</div>
    <Charts data={safeData} chartType="intensity" />
  </div>

  <div className="chart-box">
    <div className="chart-title">Likelihood</div>
    <Charts data={safeData} chartType="likelihood" />
  </div>

  <div className="chart-box">
    <div className="chart-title">Region</div>
    <Charts data={safeData} chartType="region" />
  </div>

  <div className="chart-box">
    <div className="chart-title">Relevance</div>
    <Charts data={safeData} chartType="relevance" />
  </div>
</div>

      <div className="table-box">
        <h2>Data Table</h2>
        <DataTable data={safeData} />
      </div>
    </div>
  );
};

export default Dashboard;