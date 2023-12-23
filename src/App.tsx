import React, { useEffect, useState } from 'react';
import './App.css';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { resources } from './utils/Translations';
import Splash from './components/Splash/Splash';
import Main from './components/Main/Main';

i18n.init({
  resources: resources,
  lng: 'zh',
  fallbackLng: 'zh',
  interpolation: {
    escapeValue: false,
  },
});

function App() {

  const [logging, setLogging] = useState(true);

  // initial effect
  useEffect(() => {
    // to main page after seconds 
    setTimeout(() => setLogging(false), 2400);
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      {logging ? <Splash/> : <Main/>}
    </I18nextProvider>
  );
}

export default App;
