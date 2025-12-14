import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

const URL = "http://localhost:8080/api/productos";
const PEDIDO_URL = "http://localhost:8080/api/pedidos";

export const AdminProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const [openEditor, setOpenEditor] = useState(false);
  const [pedidos, setPedidos] = useState([]); // Array de PedidoResponseDTO
  const [pedidosLoading, setPedidosLoading] = useState(true);

  useEffect(() => {
    cargarProductos();
    cargarPedidos();
  }, []);

  // ============================================================
  // GET TODOS LOS PRODUCTOS
  // ============================================================
  const cargarProductos = async () => {
    try {
      const res = await fetch(URL);
      const data = await res.json();
      setProductos(data);
      setLoading(false);
    } catch (error) {
      console.log("Error al cargar productos ", error);
    }
  };

  // ============================================================
  // POST: AGREGAR PRODUCTO
  // ============================================================
  const agregarProducto = async (producto) => {
    try {
      const productoBackend = {
        ...producto,
        nombreProducto: producto.nombre,
      };

      delete productoBackend.nombre;

      const respuesta = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoBackend),
      });

      if (!respuesta.ok) throw new Error("Error al agregar producto");

      alert("Producto agregado correctamente");
      cargarProductos();
      setOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // ============================================================
  // PUT: ACTUALIZAR PRODUCTO
  // ============================================================
  const actulizarProducto = async (producto) => {
    try {
      const productoBackend = {
        ...producto,
        nombreProducto: producto.nombre,
      };

      delete productoBackend.nombre;

      const respuesta = await fetch(`${URL}/${producto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoBackend),
      });

      if (!respuesta.ok) throw Error("Error al actualizar el producto");

      alert("Producto actualizado correctamente");
      setOpenEditor(false);
      setSeleccionado(null);
      cargarProductos();
    } catch (error) {
      console.log(error.message);
    }
  };

  // ============================================================
  // DELETE: ELIMINAR PRODUCTO
  // ============================================================
  const eliminarProducto = async (id) => {
  const confirmar = window.confirm("¿Estás seguro de eliminar el producto?");
  if (!confirmar) return;

  try {
    const respuesta = await fetch(`${URL}/${id}`, { method: "DELETE" });

    if (respuesta.status === 409) {
      const msg = await respuesta.text();
      alert(msg || "No se puede eliminar el producto porque tiene pedidos asociados.");
      return;
    }

    if (!respuesta.ok) {
      throw new Error("Error al eliminar el producto");
    }

    alert("Producto eliminado correctamente");
    cargarProductos();

  } catch (error) {
    console.log(error);
    alert("Hubo un problema al eliminar el producto");
  }
};

  // ============================================================
  // NUEVO: GET TODOS LOS PEDIDOS
  // ============================================================
  const cargarPedidos = async () => {
      setPedidosLoading(true);
      try {
          const res = await fetch(PEDIDO_URL);
          if (!res.ok) throw new Error('Error al cargar pedidos');
          const data = await res.json();
          setPedidos(data);
      } catch (error) {
          console.error("Error al cargar pedidos:", error);
      } finally {
          setPedidosLoading(false);
      }
  };

  // ============================================================
  // NUEVO: ACTUALIZAR ESTADO DEL PEDIDO (Para el Panel Admin)
  // ============================================================
  const actualizarEstadoPedido = async (idPedido, nuevoEstado) => {
      try {
          const pedidoDTO = { estado: nuevoEstado, productosPedidos: [] }; 
          
          const respuesta = await fetch(`${PEDIDO_URL}/${idPedido}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(pedidoDTO),
          });

          if (!respuesta.ok) throw new Error("Error al actualizar estado del pedido");

          alert("Estado del pedido actualizado correctamente.");
          cargarPedidos();
      } catch (error) {
          console.error(error.message);
      }
  };

  return (
    <AdminContext.Provider
      value={{
        productos,
        loading,
        open,
        setOpen,
        seleccionado,
        setSeleccionado,
        openEditor,
        setOpenEditor,
        cargarProductos,
        agregarProducto,
        actulizarProducto,
        eliminarProducto,
        pedidos,
        pedidosLoading,
        cargarPedidos,
        actualizarEstadoPedido,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);

