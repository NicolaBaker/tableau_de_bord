import React from 'react';

const ChartControls = ({ chartType, setChartType, lang, setLang }) => {
  return (
    <div className="controls">
      <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}>{lang === 'fr' ? 'Français' : 'English'}</button>
    </div>
  );
};

export default ChartControls;
