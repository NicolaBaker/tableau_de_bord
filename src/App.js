import React, { useState } from 'react';
import './App.css';
import { housePrices } from './data/housePrices';
import HousePriceChart from './components/HousePriceChart';
import DashboardTable from './components/DashboardTable';
import ChartControls from './components/ChartControls';
import { provinceMap } from './data/housePrices'; // ajuste le chemin si nécessaire


function App() {
  const [lang, setLang] = useState('fr');
  const [startYear, setStartYear] = useState(2005);
  const [endYear, setEndYear] = useState(2025);
  const allCities = Object.values(provinceMap).flat();
  const [selectedProvinces, setSelectedProvinces] = useState(allCities); // villes sélectionnées
  const [selectedProvince, setSelectedProvince] = useState('all');   // province sélectionnée

  const t = (fr, en) => (lang === 'fr' ? fr : en);


  const allYears = housePrices.map(entry => entry.year);

  // 📦 Données filtrées
  const filteredData = housePrices
    .filter(entry => entry.year >= startYear && entry.year <= endYear)
    .map(entry => {
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
    } else if (provinceMap[province]) {
      setSelectedProvinces(provinceMap[province]);
    } else {
      setSelectedProvinces([]);
    }
  };



  return (
    <div className="container">
      <h1>{t("Tableau de bord des prix des maisons", "House Price Dashboard")}</h1>
      <p>{t(
        "Évolution des prix de 2005 à 2025 dans trois grandes villes canadiennes.",
        "House prices from 2005 to 2025 in three major Canadian cities."
      )}</p>

      {/* 🌐 Contrôles de langue (facultatif) */}
      <ChartControls lang={lang} setLang={setLang} />

      {/* 📊 Filtres */}
      <div className="filters">
        <div>
          <label>{t("De l'année", "From year")}:</label>
          <select className="custom-select" value={startYear} onChange={(e) => setStartYear(Number(e.target.value))}>
            {allYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label>{t("À l'année", "To year")}:</label>
          <select className="custom-select" value={endYear} onChange={(e) => setEndYear(Number(e.target.value))}>
            {allYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label>{t("Province", "Province")}:</label>
          <select className="custom-select" value={selectedProvince} onChange={handleProvinceChange}>
            <option value="all">{t("Toutes les provinces", "All provinces")}</option>
            {Object.keys(provinceMap).map((prov) => (
              <option key={prov} value={prov}>{prov}</option>
            ))}
          </select>
        </div>



       

      </div>

      {/* 📈 Graphique + Tableau */}
      <HousePriceChart data={filteredData} lang={lang} />
      <DashboardTable data={filteredData} lang={lang} />
    </div>
  );
}

export default App;
