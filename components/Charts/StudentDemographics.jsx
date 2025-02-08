// StudentDemographics.jsx
"use client";

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { category: 'Male', value: 280 },
  { category: 'Female', value: 220 },
  { category: '5-10 yrs', value: 150 },
  { category: '11-15 yrs', value: 200 },
  { category: '16-20 yrs', value: 150 },
];

const StudentDemographics = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#F97316" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StudentDemographics;
