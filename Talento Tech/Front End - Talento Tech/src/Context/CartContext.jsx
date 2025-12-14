import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import { useAdmin } from './AdminContext';

export const CartContext = createContext()
const PEDIDO_URL = "http://localhost:8080/api/pedidos";
const PRODUCTO_URL = "http://localhost:8080/api/productos"; 

export const CartProvider = ({ children }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);
    const [mensaje, setMensaje] = useState(null);
    const [cantidad, setCantidad] = useState({});

    const cargarProductos = async () => {
        try {
            const res = await fetch(PRODUCTO_URL);
            if (!res.ok) throw new Error('Error al cargar productos');
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        cargarProductos();
    }, []);


    const addToCart = (product, cantidadSeleccionada) => {
        if (cantidadSeleccionada > product.stock) {
            setMensaje("Cantidad supera el stock disponible");
            setTimeout(() => setMensaje(null), 3000);
            return;
        }

        const yaEnCarrito = cart.some((item) => item.id === product.id);

        if (yaEnCarrito) {
            setMensaje("Este producto ya está en el carrito");
        } else {
            setCart([...cart, { ...product, cantidad: cantidadSeleccionada }]);
            setMensaje("Producto agregado al carrito");
        }

        setTimeout(() => setMensaje(null), 3000);
    };


    const removeCart = (id) => {
        setCart(cart.filter(product => product.id !== id));
    };

    const aumentarCantidad = (id) => {
        setCantidad(prev => ({
            ...prev,
            [id]: (prev[id] || 1) + 1,
        }));
    };

    const disminuirCantidad = (id) => {
        setCantidad(prev => ({
            ...prev,
            [id]: Math.max((prev[id] || 1) - 1, 1),
        }));
    };
    
    // ============================================================
    // CREAR PEDIDO
    // ============================================================
    const crearPedido = async () => {
        if (cart.length === 0) {
            alert("El carrito está vacío. Agrega productos antes de crear un pedido.");
            return;
        }

        const productosPedidos = cart.map(item => ({
            productoId: item.id,
            cantidad: item.cantidad,
        }));

        const pedidoRequestDTO = {
            estado: "PENDIENTE", // Estado inicial
            productosPedidos: productosPedidos,
        };

        try {
            const respuesta = await fetch(PEDIDO_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pedidoRequestDTO),
            });

            if (!respuesta.ok) {
                const errorText = await respuesta.text();
                throw new Error(errorText || "Error al crear el pedido. Revise el stock.");
            }
            
            const nuevoPedido = await respuesta.json();

            alert(`Pedido #${nuevoPedido.idPedido} creado con éxito. Stock actualizado.`);
            setCart([]); 

            await cargarProductos(); 
            navigate(`/admin/pedidos/${nuevoPedido.idPedido}`); 

        } catch (error) {
            alert(`Error en el pedido: ${error.message}`);
            console.error(error);
        }
    };

    return (
        <CartContext.Provider value={{ 
            products, 
            addToCart, 
            error, 
            loading, 
            cart, 
            removeCart, 
            mensaje, 
            aumentarCantidad, 
            disminuirCantidad, 
            cantidad, 
            crearPedido
        }}>
            {children}
        </CartContext.Provider>
    )
}