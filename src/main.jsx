import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import Login from './pages/Login.jsx'
import PrivateRoute from './componentes/PrivateRoute.jsx'
import { Navigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/usuarios"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <ToastContainer position='top-right'  autoClose={3000} />
    </AuthProvider>
  </BrowserRouter>
)