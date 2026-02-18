import React from "react";

const DataTable = ({ data }) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#eee" }}>
          <th>Country</th>
          <th>Topic</th>
          <th>Published Year</th>
          <th>Intensity</th>
          <th>Likelihood</th>
        </tr>
      </thead>

      <tbody>
        {data.slice(0, 20).map((item, i) => (
          <tr key={i}>
            <td>{item.country || "-"}</td>
            <td>{item.topic || "-"}</td>
            <td>{item.published?.slice(0, 4) || "-"}</td>
            <td>{item.intensity ?? 0}</td>
            <td>{item.likelihood ?? 0}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;