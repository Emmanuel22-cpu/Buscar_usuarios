import { createContext, use, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const login = (username, password) => {
    // Aquí iría la lógica real de autenticación
    if (username === 'admin' && password === 'password') {
      setUser({ username: 'admin' })
      toast.success('Login exitoso!')
      navigate('/usuarios')
    } else {
      toast.error('Credenciales incorrectas')
    }
  }

  const logout = () => {
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}