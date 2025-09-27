import { useCallback, useEffect, useState} from "react"
import axios from "axios"
import Card from "./componentes/card"
import SearchInput from "./componentes/SearchInput"
import Loader from "./componentes/Loader"
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [usuarios, setUsuarios] = useState([]);  
  const [filtrados, setFiltrados] = useState([]);
  const [loading, setLoading] = useState(false); // 👈 nuevo estado

  const obtenerUsuarios = async () => {
    try {
      setLoading(true); // 👈 empieza carga
      const response = await axios.get("http://localhost:4000/usuarios");
      setUsuarios(response.data);
      setFiltrados(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setLoading(false); // 👈 termina carga
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const filtrarUsuarios = useCallback(
    (query) => {
      setLoading(true); // 👈 loader mientras filtra
      const q = query.trim().toLowerCase();
      const resultados = usuarios.filter((usuario) =>
        [usuario.nombre, usuario.perfil, usuario.intereses, usuario.email].some((campo) =>
          String(campo).toLowerCase().includes(q)
        )
      );
      // pequeño delay opcional para que se note el loader
      setTimeout(() => {
        setFiltrados(resultados);
        setLoading(false);
      }, 500);
    },
    [usuarios]
  );

  return (
    <div className="min-h-screen bg-white p-4 ">
      <h1 className="text-3xl font-bold text-center mb-4">Buscador de Usuarios</h1>
      <SearchInput onSearch={filtrarUsuarios} />

      {/* Mostrar loader si está cargando */}
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {filtrados.map((usuario) => (
            <Card
              key={usuario.id}
              usuario={usuario}
              onClick={() => setUsuarioSeleccionado(usuario)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {usuarioSeleccionado && (
          <motion.div
            className="fixed inset-0 pt-16 bg-black bg-opacity-60 flex justify-center items-start z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 max-h-[85vh] flex flex-col overflow-hidden relative"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-red-500 font-bold text-2xl"
                onClick={() => setUsuarioSeleccionado(null)}
              >
                ✕
              </button>

              <div className="overflow-y-auto px-8 py-6">
                <img
                  src={usuarioSeleccionado.foto}
                  alt={usuarioSeleccionado.nombre}
                  className="w-full max-h-96 object-contain rounded-xl mb-6 shadow-inner"
                />
                <h2 className="text-3xl font-bold mb-2 text-gray-800">
                  {usuarioSeleccionado.nombre}
                </h2>
                <p className="text-2xl text-green-600 font-bold mb-4">
                  {usuarioSeleccionado.perfil}
                </p>
                <p className="text-gray-700 text-lg mb-6">
                  {usuarioSeleccionado.intereses}
                </p>
                <p className="text-gray-700 text-lg mb-6">
                  {usuarioSeleccionado.email}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
