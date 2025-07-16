import React from 'react';

const ChartControls = ({ chartType, setChartType, lang, setLang }) => {
  return (
    <div className="controls">
      <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}>
        {lang === 'fr' ? 'Langue: Français' : 'Language: English'}
      </button>
    </div>
  );
};

export default ChartControls;
