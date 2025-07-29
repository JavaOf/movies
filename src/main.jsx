import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import store from './app/store/store';
import App from './app/routes/App';
import i18 from './i18'; 
import './app/scss/app.scss'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <I18nextProvider i18n={i18}>
      <Router>
        <App />
      </Router>
    </I18nextProvider>
  </Provider>
);
