import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
import { RouterProvider } from 'react-router-dom'
import route from './Route/index.jsx'
import { Toaster } from './components/ui/toaster.jsx'
import { Provider } from "react-redux";



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <div>
   <Provider>
        <RouterProvider router={route}/>
        <Toaster/>
    </Provider>
   </div>
  </React.StrictMode>,
)
