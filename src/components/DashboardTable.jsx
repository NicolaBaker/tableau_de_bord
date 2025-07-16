import React, { useState } from 'react';
import styles from './DashboardTable.module.css';

const DashboardTable = ({ data, lang }) => {
  const [startIndex, setStartIndex] = useState(0); // ✅ TOUJOURS appelé

  if (!data || data.length === 0) {
    return <p>{lang === 'fr' ? 'Aucune donnée disponible.' : 'No data available.'}</p>;
  }

  const provinces = Object.keys(data[0]).filter(key => key !== 'year');
  const maxVisible = 6;
  const visibleProvinces = provinces.slice(startIndex, startIndex + maxVisible);

  const handlePrev = () => {
    setStartIndex(prev => Math.max(0, prev - maxVisible));
  };

  const handleNext = () => {
    if (startIndex + maxVisible < provinces.length) {
      setStartIndex(prev => prev + maxVisible);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {lang === 'fr' ? 'Tableau des prix' : 'Price Table'}
      </h2>

      <div className={styles.navButtons}>
        <button onClick={handlePrev} disabled={startIndex === 0} className={styles.arrowBtn}>
          ◀
        </button>
        <button onClick={handleNext} disabled={startIndex + maxVisible >= provinces.length} className={styles.arrowBtn}>
          ▶
        </button>
      </div>

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
            <tr
              key={idx}
              className={`${idx % 2 === 1 ? styles.stripedRow : ''} ${styles.hoverRow}`}
            >
              <td className={styles.td}>{row.year}</td>
              {visibleProvinces.map(province => (
                <td key={province} className={styles.td}>
                  {row[province] != null
                    ? row[province].toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })
                    : <span style={{ color: '#888' }}>N/A</span>}
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
