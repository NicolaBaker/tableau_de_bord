import React, { useState, useEffect, useMemo } from 'react';
import styles from './DashboardTable.module.css';

const DashboardTable = ({ data, lang }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [maxVisible, setMaxVisible] = useState(6);

  const provinces = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }
    const keys = Object.keys(data[0]);
    const filteredKeys = [];
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== 'year') {
        filteredKeys.push(key);
      }
    }
    return filteredKeys;
  }, [data]);

  useEffect(() => {
    function handleResize() {
      let newMax;
      if (window.innerWidth < 900) {
        newMax = 3;
      } 
      else {
        newMax = 6;
      }
      setMaxVisible(newMax);

      setStartIndex(prev => Math.min(prev, Math.max(0, provinces.length - newMax)));
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [provinces.length]);

  // Vérifie les données après filtre
  if (!data || data.length === 0) {
    return <p>{lang === 'fr' ? 'Aucune donnée disponible. Veuillez choisir une année valide.' : 'No data available. Please select a valid year.'}</p>;
  }

  const safeStartIndex = Math.min(startIndex, Math.max(0, provinces.length - maxVisible));
  const visibleProvinces = provinces.slice(safeStartIndex, safeStartIndex + maxVisible);

  const handlePrev = () => {
    setStartIndex(prev => Math.max(0, prev - maxVisible));
  };

  const handleNext = () => {
    if (safeStartIndex + maxVisible < provinces.length) {
      setStartIndex(prev => Math.min(provinces.length - maxVisible, prev + maxVisible));
    }
  };

  return (
    <div className={styles.container}>

      {/* Titre */}
      <h2 className={styles.title}>
        {lang === 'fr' ? `Tableau des prix des maisons par ville` : `Table of Average House Prices by City`}
      </h2>
      {/* Suivent et pres */}
      <div className={styles.navButtons}>
        <button onClick={handlePrev} disabled={safeStartIndex === 0} className={styles.arrowBtn}>←</button>
        <button onClick={handleNext} disabled={safeStartIndex + maxVisible >= provinces.length} className={styles.arrowBtn}>→</button>
      </div>

      {/* La tableau */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>{lang === 'fr' ? 'Année' : 'Year'}</th>
            {visibleProvinces.map(province => (
              <th key={province} className={styles.th}>{province}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className={`${idx % 2 === 1 ? styles.stripedRow : ''} ${styles.hoverRow}`}>
              <td className={styles.td}>{row.year}</td>
              {visibleProvinces.map(province => (
                <td key={province} className={styles.td}>
                  {row[province] != null ? row[province].toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' }) : <span style={{ color: '#888' }}>N/A</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
