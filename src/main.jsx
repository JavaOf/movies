import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store/store';
import App from './app/routes/App';
import './app/scss/app.scss'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)
