import React from 'react'
import ReactDOM from 'react-dom/client'
import './scss/index.scss'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'
import { HashRouter } from "react-router-dom"



const root = ReactDOM.createRoot(document.getElementById('root'))

// Убрал <React.StrictMode> - чтобы useEffect вызывался 1 раз
root.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
)

/* root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>
    </React.StrictMode>
) */

