// DonutChart.jsx
"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const data = [
  { name: "North East", value: 400, color: "#64FFDA" },
  { name: "South East", value: 300, color: "#FFD740" },
  { name: "North West", value: 100, color: "#F4436" },
  { name: "South West", value: 200, color: "#90CAF9" },
];

const COLORS = data.map((item) => item.color);

const DonutChart = () => {
  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            dataKey="value"
            label={({ name }) => name} // Display region names on the chart
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;
