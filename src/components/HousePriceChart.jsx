import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // source : https://recharts.org/en-US
import styles from './HousePriceChart.module.css';

// Couleur
export const colors = [ "#e07ec3", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c","#d0ed57", "#e7001f", "#0396ff", "#111827", "#7a5432",
  "#405e1a", "#8e44ad", "#2ecc71", "#f1c40f", "#e67e22", "#1abc9c", "#9b59b6", "#3498db", "#34495e", "#95a5a6",
  "#16a085", "#27ae60", "#2980b9", "#f39c12", "#d35400", "#c0392b", "#7f8c8d", "#bdc3c7", "#2c3e50", "#ff69b4",
  "#00ced1", "#ff6347", "#6a5acd", "#3cb371", "#ffa500"
];


const HousePriceChart = ({ data, lang, province }) => {
  
  const getCitiesFromData = (data) => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]).filter(key => key !== 'year');
  };

// Détermine si la sélection est toutes les provinces = Canada
const isAll = province === 'all' || province === 'all province' || province === 'toutes les provinces';

const regionLabel = isAll ? (lang === 'fr' ? 'Canada' : 'Canada') : province;

  const [selectedCities, setSelectedCities] = useState(getCitiesFromData(data));

  // Réinitialiser les villes
  useEffect(() => {
    const cities = getCitiesFromData(data);
    setSelectedCities(cities);
  }, [data, province]);

  const labelYear = lang === 'fr' ? 'Année' : 'Year';
  const allCities = getCitiesFromData(data);
  const [chartType, setChartType] = useState('bar');

  const toggleCity = (city) => {
    setSelectedCities((prev) => {
      let newCities;
      if (prev.includes(city)) {
        newCities = prev.filter((c) => c !== city);
      } 
      else {
        newCities = [...prev, city];
      }
      return newCities;
    });
  };


  return (

    <div className={styles.chart}>

      {/* BOUTONS DE TYPE DE diagramme */}
      <div className={styles.chartButtons}>
        <button onClick={() => setChartType('bar')} className={chartType === 'bar' ? styles.active : ''}>{lang === 'fr' ? 'Diagramme à barres' : 'Bar Chart'}</button>
        <button onClick={() => setChartType('line')} className={chartType === 'line' ? styles.active : ''}>{lang === 'fr' ? 'Diagramme à courbes' : 'Line Chart'}</button>
      </div>

      {/* TITRE DU GRAPHIQUE*/}
      <h2 className={styles.chartTitle}>
        {lang === 'fr' ? `Évolution des prix des maisons dans les villes - ${regionLabel}` : `House Price Trends in the city - ${regionLabel}`}
      </h2>
      {/* GRAPHIQUE */}
      <ResponsiveContainer width="100%" height={300} >
        
        {chartType === 'bar' ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" label={{ value: labelYear, position: 'insideBottom', offset: -5 }} />
            <YAxis width={70} tickFormatter={(value) => `${value.toLocaleString()}$`} />
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
            <YAxis width={70} tickFormatter={(value) => `${value.toLocaleString()}$`}/>

            <Tooltip />
            <Legend wrapperStyle={{ paddingTop: 20 }} key={selectedCities.join(',')}/>

            {selectedCities.map((city, index) => (
              <Line key={city} type="monotone" dataKey={city} stroke={colors[index % colors.length]} strokeWidth={2}/>
            ))}
          </LineChart>
        )}
      </ResponsiveContainer>

      {/* Case a caucher */}
      <div className={styles.checkboxes}>
        {allCities.map(city => (
          <label key={city} className={styles.checkbox}>
            <input type="checkbox" checked={selectedCities.includes(city)} onChange={() => toggleCity(city)}/>
            {city}
          </label>
        ))}
      </div>
    </div>
  );
};

export default HousePriceChart;
