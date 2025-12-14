import "./AdminPedidos.css";
import React, { useEffect } from 'react';
import Header from "../../components/Header/Header";
import { useAdmin } from '../../Context/AdminContext';
import { Link } from 'react-router-dom';

const AdminPedidos = () => {
    const { pedidos, pedidosLoading, cargarPedidos, actualizarEstadoPedido } = useAdmin();    

    const handleEstadoChange = (id, e) => {
        const nuevoEstado = e.target.value;
        actualizarEstadoPedido(id, nuevoEstado);
    };

    if (pedidosLoading) {
        return <p>Cargando pedidos...</p>;
    }

    return (
        <div className="pedidos-container">
            <Header />
            <h3>Gestión de Pedidos</h3>
            {pedidos.length === 0 ? (
                <p>No hay pedidos registrados.</p>
            ) : (
                <ul className="pedidos-list">
                    {pedidos.map(pedido => (
                        <li key={pedido.idPedido} className={`pedido-item estado-${pedido.estado.toLowerCase()}`}>
                            <p><strong>ID:</strong> {pedido.idPedido}</p>
                            <p><strong>Total:</strong> ${pedido.precioTotal.toFixed(2)}</p>
                            <div className="estado-selector">
                                <label>Estado:</label>
                                <select value={pedido.estado} onChange={(e) => handleEstadoChange(pedido.idPedido, e)}>
                                    <option value="PENDIENTE">Pendiente</option>
                                    <option value="ENVIADO">Enviado</option>
                                    <option value="ENTREGADO">Entregado</option>
                                    <option value="CANCELADO">Cancelado</option>
                                </select>
                            </div>
                            <Link to={`/admin/pedidos/${pedido.idPedido}`} className="btn-detalle">
                                Ver Detalle
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminPedidos;