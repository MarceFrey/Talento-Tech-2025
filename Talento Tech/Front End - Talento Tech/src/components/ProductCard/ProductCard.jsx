import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import './ProductCard.css';

const getImagePath = (fileName) => {
    return `/Productos/${fileName}`;
};

function ProductCard() {
  const { products } = useContext(CartContext)

  return (
    <div className="equipo-container">
      {products.map((producto) => {

        const finalImagePath = getImagePath(producto.imagen);

        return (
          <div className="tarjeta" key={producto.id}>
            <Link to={`/detalleproducto/${producto.id}`} className="tarjeta-link">
              <img 
                src={finalImagePath} 
                alt={producto.nombre || 'Producto sin nombre'} 
                className="tarjeta-imagen" 
                onError={(e) => { 
                    e.currentTarget.src = 'https://via.placeholder.com/200?text=Imagen+No+Encontrada'; 
                    console.error("Error al cargar la imagen:", finalImagePath);
                }}
              />
              
              <div className="tarjeta-info">
                <p className="tarjeta-nombre">{producto.nombreProducto}</p>
                <p className="tarjeta-precio">${producto.precio}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default ProductCard;
