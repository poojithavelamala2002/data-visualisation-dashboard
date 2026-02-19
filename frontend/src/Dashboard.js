import React, { useEffect, useState } from "react";
import axios from "axios";
import Filters from "./Filters";
import Charts from "./Charts";
import DataTable from "./DataTable";
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const cleanFilters = {};

      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          cleanFilters[key] = filters[key];
        }
      });

      const query = new URLSearchParams(cleanFilters).toString();

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/data?${query}`
      );

      if (Array.isArray(response.data)) {
        setData(response.data);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to load data. Please try again.");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [filters]);

  return (
    <div className="dashboard-container">
      <h1 className="title">Data Visualization Dashboard</h1>

      {/* Filters */}
      <div className="filters-box">
        <Filters filters={filters} setFilters={setFilters} />
      </div>

      {/* Loading */}
      {loading && <p style={{ textAlign: "center" }}>Loading data...</p>}

      {/* Error */}
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      )}

      {/* Cards */}
      {!loading && !error && (
        <div className="cards-grid">
          <div className="card">
            <h4>Total Records</h4>
            <p>{data.length}</p>
          </div>

          <div className="card">
            <h4>Avg Intensity</h4>
            <p>
              {data.length > 0
                ? (
                    data.reduce(
                      (sum, item) => sum + (Number(item.intensity) || 0),
                      0
                    ) / data.length
                  ).toFixed(2)
                : "0.00"}
            </p>
          </div>

          <div className="card">
            <h4>Avg Likelihood</h4>
            <p>
              {data.length > 0
                ? (
                    data.reduce(
                      (sum, item) => sum + (Number(item.likelihood) || 0),
                      0
                    ) / data.length
                  ).toFixed(2)
                : "0.00"}
            </p>
          </div>
        </div>
      )}

      {/* Charts */}
      {!loading && !error && data.length > 0 && (
        <div className="charts-grid">
          <div className="chart-box">
            <Charts data={data} chartType="intensity" />
          </div>
          <div className="chart-box">
            <Charts data={data} chartType="likelihood" />
          </div>
          <div className="chart-box">
            <Charts data={data} chartType="region" />
          </div>
          <div className="chart-box">
            <Charts data={data} chartType="relevance" />
          </div>
        </div>
      )}

      {/* Table */}
      {!loading && !error && data.length > 0 && (
        <div className="table-box">
          <h2>Data Table</h2>
          <DataTable data={data} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;




