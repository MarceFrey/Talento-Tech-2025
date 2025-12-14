package com.talentotech.talentotech.dto.response;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter @Setter
public class PedidoResponseDTO {
    private Integer idPedido;
    private String estado;
    private Double precioTotal;
    private List<ProductoPedidoResponseDTO> detalles;
}
