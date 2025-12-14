import "./Admin.css";
import FormularioProducto from "../../components/FormularioProducto/FormularioProducto";
import FormularioEdicion from "../../components/FormularioEdicion/FormularioEdicion";
import { useAuth } from "../../Context/AuthContext";
import { useAdmin } from "../../Context/AdminContext";
import Header from "../../components/Header/Header";

const BASE_IMAGE_DIR = 'Productos';
const DEFAULT_IMAGE_NAME = 'default.png'; 

const getImagePath = (fileName) => {
    const file = fileName && fileName.trim() !== '' ? fileName : DEFAULT_IMAGE_NAME;
    
    return `/${BASE_IMAGE_DIR}/${file}`;
};
// -----------------------------------------------------------------------------


const Admin = () => {
  const { isAuth, setIsAuth } = useAuth();
  const {
    productos, loading, open, setOpen, seleccionado, setSeleccionado,
    openEditor, setOpenEditor, cargarProductos,
    agregarProducto, actulizarProducto, eliminarProducto } = useAdmin();


  return (
    <div className="admin-background">
      <Header />
      <div className="admin-container">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <>

            <h1 className="admin-title">Panel Administrativo</h1>
            <ul className="admin-list">
              {productos.map((product) => {
                const imagePath = getImagePath(product.imagen);
                
                return (
                  <li key={product.id} className="admin-listItem">
                    <img 
                      src={imagePath} 
                      alt={product.nombreProducto} 
                      className="admin-listItemImage" 
                      onError={(e) => { 
                        e.currentTarget.src = getImagePath(DEFAULT_IMAGE_NAME);
                      }}
                    />

                    <span>{product.nombreProducto}</span>
                    <span>${product.precio}</span>
                    <div>
                      <button
                        className="admin-editButton"
                        onClick={() => {
                          setOpenEditor(true);
                          setSeleccionado(product);
                        }}
                      >
                        Editar
                      </button>
                      <button className="admin-deleteButton" onClick={() => eliminarProducto(product.id)}>
                        Eliminar
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        <button className="admin-addButton" onClick={() => setOpen(true)}>
          Agregar producto nuevo
        </button>

        {open && <FormularioProducto onAgregar={agregarProducto} />}
        {openEditor && <FormularioEdicion productoSeleccionado={seleccionado} onActualizar={actulizarProducto} />}
      </div>
    </div>
  );
};

export default Admin;

