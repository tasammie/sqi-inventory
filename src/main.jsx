import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
import { RouterProvider } from 'react-router-dom'
import route from './Route/index.jsx'
import { Toaster } from './components/ui/toaster.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <div>
        <RouterProvider router={route}/>
        <Toaster/>
    {/* <App /> */}
      </div>
  </React.StrictMode>,
)
