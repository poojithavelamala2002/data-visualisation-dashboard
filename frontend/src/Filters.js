import React from "react";
import "./Filters.css";

const Filters = ({ filters, setFilters }) => {
  const updateFilter = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="filters-container">
      <h3>Filters</h3>

      <div className="filters-grid">
        <select onChange={(e) => updateFilter("country", e.target.value)}>
          <option value="">All Countries</option>
          <option value="India">India</option>
          <option value="United States of America">USA</option>
          <option value="China">China</option>
        </select>

        <select onChange={(e) => updateFilter("sector", e.target.value)}>
          <option value="">All Sectors</option>
          <option value="Energy">Energy</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Environment">Environment</option>
        </select>

        <select onChange={(e) => updateFilter("topic", e.target.value)}>
          <option value="">All Topics</option>
          <option value="gas">Gas</option>
          <option value="oil">Oil</option>
          <option value="climate">Climate</option>
        </select>

        <select onChange={(e) => updateFilter("region", e.target.value)}>
          <option value="">All Regions</option>
          <option value="Northern America">Northern America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;

