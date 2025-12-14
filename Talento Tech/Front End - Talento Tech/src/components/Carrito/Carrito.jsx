import './Carrito.css';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';

const BASE_IMAGE_DIR = 'Productos';
const DEFAULT_IMAGE_NAME = 'default.png'; 

const getImagePath = (fileName) => {
    const file = fileName && fileName.trim() !== '' ? fileName : DEFAULT_IMAGE_NAME;
    return `/${BASE_IMAGE_DIR}/${file}`;
};

function Cart() {
    const { cart, removeCart, crearPedido } = useContext(CartContext) 

    return (
        <div>
            {cart.length === 0 ? (
                <div className="empty-container">
                    <p className="empty_cart">El carrito está vacío</p>
                </div>
            ) : (
                <> 
                    <div className="carrito-grid">
                        {cart.map((item, index) => {
                            const imagePath = getImagePath(item.imagen);
                            
                            return (
                                <div className="tarjeta" key={index}>
                                    <img 
                                        src={imagePath} 
                                        className="tarjeta-imagen" 
                                        alt={item.nombre} 
                                        onError={(e) => { 
                                            e.currentTarget.src = getImagePath(DEFAULT_IMAGE_NAME);
                                        }}
                                    />
                                    
                                    <p className="tarjeta-nombre">{item.nombreProducto || item.nombre}</p> 
                                    <p className="tarjeta-precio">${item.precio} x {item.cantidad}</p>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => removeCart(item.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    <div className="resumen-pedido">
                        <button 
                            className="btn-crear-pedido" 
                            onClick={crearPedido}
                        >
                            Crear Pedido
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;