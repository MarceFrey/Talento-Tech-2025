import React, { useState } from 'react';
import './FormularioProducto.css';

function FormularioProducto({ onAgregar }) {
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    imagen: '',
    stock: ''
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!producto.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    }
    if (!producto.precio || producto.precio <= 0) {
      nuevosErrores.precio = 'El precio debe ser mayor a 0.';
    }
    if (!producto.imagen.trim()) {
      nuevosErrores.imagen = 'La URL de la imagen es obligatoria.';
    }
    if (!producto.stock || producto.stock < 0) {
      nuevosErrores.stock = 'El stock debe ser 0 o mayor.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    onAgregar(producto);
    setProducto({ nombre: '', precio: '', imagen: '', stock: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Producto</h2>

      <div>
        <label>Nombre:</label>
        <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} />
        {errores.nombre && <p style={{ color: 'red' }}>{errores.nombre}</p>}
      </div>

      <div>
        <label>Precio:</label>
        <input type="number" name="precio" value={producto.precio} onChange={handleChange} min="0" />
        {errores.precio && <p style={{ color: 'red' }}>{errores.precio}</p>}
      </div>

      <div>
        <label>Imagen (URL):</label>
        <input type="text" name="imagen" value={producto.imagen} onChange={handleChange} />
        {errores.imagen && <p style={{ color: 'red' }}>{errores.imagen}</p>}
      </div>

      <div>
        <label>Stock:</label>
        <input type="number" name="stock" value={producto.stock} onChange={handleChange} min="0" />
        {errores.stock && <p style={{ color: 'red' }}>{errores.stock}</p>}
      </div>

      <button type="submit">Agregar Producto</button>
    </form>
  );
}

export default FormularioProducto;
