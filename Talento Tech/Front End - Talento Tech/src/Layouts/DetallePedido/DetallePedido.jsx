import "./DetallePedido.css";
import Header from "../../components/Header/Header";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetallePedidoPage = () => {
    const { id } = useParams();
    const [pedido, setPedido] = useState(null);
    const [loading, setLoading] = useState(true);
    const PEDIDO_URL = "http://localhost:8080/api/pedidos";

    useEffect(() => {
        const fetchPedido = async () => {
            try {
                const res = await fetch(`${PEDIDO_URL}/${id}`);
                const data = await res.json();
                setPedido(data);
            } catch (error) {
                console.error("Error al obtener detalle del pedido:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPedido();
    }, [id]);

    if (loading) return <p>Cargando detalle del pedido...</p>;
    if (!pedido) return <p>Pedido no encontrado.</p>;

    return (
        <div className="detalle-pedido-page">
            <Header />
            <h1>Pedido #{pedido.idPedido}</h1>
            <p>Estado: <strong>{pedido.estado}</strong></p>
            
            <div className="detalle-productos">
                <h4>Productos en el pedido:</h4>
                <ul>
                    {pedido.detalles.map(detalle => (
                        <li key={detalle.idDetalle}>
                            {detalle.nombreProducto} ({detalle.cantidad} uds) 
                            - Precio Unitario: ${detalle.precioUnitario.toFixed(2)} 
                            - Subtotal: ${detalle.subtotal.toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>
            <h3>Total Final: ${pedido.precioTotal.toFixed(2)}</h3>
        </div>
    );
};

export default DetallePedidoPage;