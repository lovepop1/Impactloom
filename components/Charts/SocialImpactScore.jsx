// SocialImpactScore.jsx
"use client";
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const data = [{ name: 'Filled', value: 78 }, { name: 'Empty', value: 22 }]; // 7.8 out of 10 = 78%
const COLORS = ['#29ABE2', '#E0E0E0'];

const SocialImpactScore = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="70%"
          startAngle={180}
          endAngle={0}
          innerRadius="60%"
          outerRadius="80%"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: '1.2em', fill: '#29ABE2' }}>
          7.8/10
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SocialImpactScore;
