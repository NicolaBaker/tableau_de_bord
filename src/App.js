import React, { useState } from 'react';
import './App.css';
import { housePrices } from './data/housePrices';
import HousePriceChart from './components/HousePriceChart';
import DashboardTable from './components/DashboardTable';
import ChartControls from './components/ChartControls';
import { provinceMap } from './data/housePrices';
import img1 from './img/maison.jpg' ;


function App() {
  const [lang, setLang] = useState('fr');
  const [startYear, setStartYear] = useState(2005);
  const [endYear, setEndYear] = useState(2025);
  const allCities = Object.values(provinceMap).flat();
  const [selectedProvinces, setSelectedProvinces] = useState(allCities);
  const [selectedProvince, setSelectedProvince] = useState('all');

  const t = (fr, en) => (lang === 'fr' ? fr : en);


  const allYears = housePrices.map(entry => entry.year);

  // filtre
  const filteredData = housePrices.filter(entry => entry.year >= startYear && entry.year <= endYear).map(entry => {
      const filteredEntry = { year: entry.year };
      selectedProvinces.forEach(province => {
        filteredEntry[province] = entry[province];
      });
      return filteredEntry;
  });

  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
    if (province === 'all') {
      setSelectedProvinces(allCities);
    } 
    else if (provinceMap[province]) {
      setSelectedProvinces(provinceMap[province]);
    } 
    else {
      setSelectedProvinces([]);
    }
  };

  return (
    <div className="container">
      <section className="aceul" style={{ backgroundImage: `url(${img1})` }}>
        <div className="textA">
          <h1>{t("Tableau de bord des prix des maisons", "House Price Dashboard")}</h1>
          <p>{t("Évolution des prix de 2005 à 2025 dans plusieurs villes canadiennes.", "House prices from 2005 to 2025 in several Canadian cities.")}</p>
        </div>

        {/*Controles de langue */}
        <ChartControls lang={lang} setLang={setLang} />

        {/* Filtres */}
        <div className="filters">
          <div>
            <label>{t("De l'année", "From year")}:</label>
            <select className="deroulent" value={startYear} onChange={(e) => setStartYear(Number(e.target.value))}>
              {allYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div>
            <label>{t("À l'année", "To year")}:</label>
            <select className="deroulent" value={endYear} onChange={(e) => setEndYear(Number(e.target.value))}>
              {allYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div>
            <label>{t("Province", "Province")}:</label>
            <select className="deroulent" value={selectedProvince} onChange={handleProvinceChange}>
              <option value="all">{t("Toutes les provinces", "All provinces")}</option>
              {Object.keys(provinceMap).map((prov) => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Graphique + Tableau */}
      <HousePriceChart data={filteredData} lang={lang} province={selectedProvince}/>
      <DashboardTable data={filteredData} lang={lang} />

      {/* Footer */}
      <footer className="footer">
        <p> © {new Date().getFullYear()} NicolaBaker - {t("Tous droits réservés.", "All rights reserved.")}</p>
      </footer>
    </div>
  );
}

export default App;
