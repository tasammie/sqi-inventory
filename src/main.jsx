import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import route from './Route/index.jsx'
import { Toaster } from './components/ui/toaster.jsx'
import { store } from './store.js'
import { Provider } from 'react-redux'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <div>
   <Provider store={store}>
        <RouterProvider router={route}/>
        <Toaster/>
    </Provider>
   </div>
  </React.StrictMode>,
)
