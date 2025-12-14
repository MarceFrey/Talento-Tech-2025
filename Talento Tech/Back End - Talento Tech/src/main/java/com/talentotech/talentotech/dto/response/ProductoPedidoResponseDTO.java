package com.talentotech.talentotech.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProductoPedidoResponseDTO {
    private Integer idDetalle;
    private Integer productoId;
    private String nombreProducto;
    private Double precioUnitario;
    private Integer cantidad;
    private Double subtotal;
}
