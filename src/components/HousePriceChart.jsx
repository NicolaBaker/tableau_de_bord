import React, { useState, useEffect } from 'react';

import {
  LineChart, Line, BarChart, Bar, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import styles from './HousePriceChart.module.css';


const colors = ['#e07ec3ff', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57', "#e7001fff","#0396ff", "#111827", "#7a5432ff", "#405e1aff"];

const HousePriceChart = ({ data, lang, province }) => {
    const getCitiesFromData = (data) => {
        if (!data || data.length === 0) return [];
        return Object.keys(data[0]).filter(key => key !== 'year');
    };

  const [selectedCities, setSelectedCities] = useState(getCitiesFromData(data));

  // Réinitialiser les villes chaque fois que la province change
  useEffect(() => {
    const cities = getCitiesFromData(data);
    setSelectedCities(cities);
  }, [data, province]);
  const labelYear = lang === 'fr' ? 'Année' : 'Year';
  const allCities = getCitiesFromData(data);


  const [chartType, setChartType] = useState('bar');

  const toggleCity = (city) => {
    setSelectedCities(prev =>
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  };

  return (
    <div className={styles.chart}>
      {/* BOUTONS DE TYPE DE CHART */}
      <div className={styles.chartButtons}>
        <button
          onClick={() => setChartType('bar')}
          className={chartType === 'bar' ? styles.active : ''}
        >
          Bar
        </button>
        <button
          onClick={() => setChartType('line')}
          className={chartType === 'line' ? styles.active : ''}
        >
          Line
        </button>
      </div>

      {/* GRAPHIQUE */}
      <ResponsiveContainer width="100%" height={300} >
        
        {chartType === 'bar' ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" label={{ value: labelYear, position: 'insideBottom', offset: -5 }} />
            <YAxis width={70}
             tickFormatter={(value) => `${value.toLocaleString()}$`}
            />

            <Tooltip />
            <Legend wrapperStyle={{ paddingTop: 20 }} key={selectedCities.join(',')}/>
            {selectedCities.map((city, index) => (
              <Bar key={city} dataKey={city} fill={colors[index % colors.length]} />
            ))}
          </BarChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" label={{ value: labelYear, position: 'insideBottom', offset: -5 }} />
            <YAxis width={70}
  tickFormatter={(value) => `${value.toLocaleString()}$`}
/>

            <Tooltip />
            <Legend wrapperStyle={{ paddingTop: 20 }} key={selectedCities.join(',')}/>

            {selectedCities.map((city, index) => (
              <Line
                key={city}
                type="monotone"
                dataKey={city}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        )}
      </ResponsiveContainer>

      {/* CASES À COCHER */}
      <div className={styles.checkboxes}>
        {allCities.map(city => (
          <label key={city} className={styles.checkbox}>
            <input
              type="checkbox"
              checked={selectedCities.includes(city)}
              onChange={() => toggleCity(city)}
            />
            {city}
          </label>
        ))}
      </div>
    </div>
  );
};

export default HousePriceChart;
