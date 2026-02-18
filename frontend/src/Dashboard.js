import React, { useEffect, useState } from "react";
import axios from "axios";
import Filters from "./Filters";
import Charts from "./Charts";
import DataTable from "./DataTable";
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});

  const fetchData = async () => {
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

  setData(response.data);
};


  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [filters]);

  return (
    <div className="dashboard-container">
      <h1 className="title">Data Visualization Dashboard</h1>

      {/* Filter Box */}
      <div className="filters-box">
        <Filters filters={filters} setFilters={setFilters} />
      </div>

      {/* Summary Cards */}
      <div className="cards-grid">
        <div className="card">
          <h4>Total Records</h4>
          <p>{data.length}</p>
        </div>

        <div className="card">
          <h4>Avg Intensity</h4>
          <p>
            {(
              data.reduce((a, b) => a + (b.intensity || 0), 0) / data.length || 0
            ).toFixed(2)}
          </p>
        </div>

        <div className="card">
          <h4>Avg Likelihood</h4>
          <p>
            {(
              data.reduce((a, b) => a + (b.likelihood || 0), 0) / data.length || 0
            ).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Charts */}
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

      {/* Data Table */}
      <div className="table-box">
        <h2>Data Table</h2>
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default Dashboard;

