// InteractiveLinePlot.jsx
"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', Projects: 40 },
  { name: 'Feb', Projects: 30 },
  { name: 'Mar', Projects: 20 },
  { name: 'Apr', Projects: 27 },
  { name: 'May', Projects: 18 },
  { name: 'Jun', Projects: 23 },
  { name: 'Jul', Projects: 34 },
  { name: 'Aug', Projects: 40 },
  { name: 'Sep', Projects: 30 },
  { name: 'Oct', Projects: 20 },
  { name: 'Nov', Projects: 27 },
  { name: 'Dec', Projects: 18 },
];

const InteractiveLinePlot = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Projects" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default InteractiveLinePlot;
