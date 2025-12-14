import './DetalleProducto.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';

const BASE_IMAGE_DIR = 'Productos';
const DEFAULT_IMAGE_NAME = 'default.png';

const getImagePath = (fileName) => {
    const file = fileName && fileName.trim() !== '' ? fileName : DEFAULT_IMAGE_NAME;
    
    return `/${BASE_IMAGE_DIR}/${file}`;
};


const DetalleProducto = () => {
    const { products, addToCart, aumentarCantidad, disminuirCantidad, cantidad } = useContext(CartContext)
    const { id } = useParams();
    const product = products.find(producto => producto.id === parseInt(id));
    const imagePath = product ? getImagePath(product.imagen) : '';


    return (
        <div className='detalle-container'>
            <Header />
            {product ? (
                <div className="detalle-tarjeta">
                    <h2>{product.nombreProducto}</h2> 
        
                    <img 
                        src={imagePath} 
                        className="detalle-tarjeta-imagen" 
                        alt={product.nombreProducto} 
                        onError={(e) => { 
                            e.currentTarget.src = getImagePath(DEFAULT_IMAGE_NAME);
                        }}
                    />
                    
                    <p className="detalle-tarjeta-nombre">{product.nombreProducto}</p>
                    <p className="detalle-tarjeta-precio">${product.precio}</p>
                    <p className="tarjeta-stock">Disponibles: {product.stock}</p>

                    <div className="tarjeta-cantidad">
                        <button className="btn btn-restar" onClick={() => disminuirCantidad(product.id)}>-</button>
                        <span>{cantidad[product.id] || 1}</span>
                        <button className="btn btn-sumar" onClick={() => aumentarCantidad(product.id)}>+</button>
                    </div>

                    <button
                        className="tarjeta-boton"
                        onClick={() => addToCart(product, cantidad[product.id] || 1)}
                    >
                        Agregar al carrito
                    </button>
                </div>
            ) : (<p>Producto no encontrado</p>)
            }
            <Footer />
        </div>
    );
}

export default DetalleProducto;

