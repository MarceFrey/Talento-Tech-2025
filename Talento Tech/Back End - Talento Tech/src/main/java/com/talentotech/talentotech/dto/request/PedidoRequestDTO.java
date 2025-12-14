package com.talentotech.talentotech.dto.request;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter @Setter
public class PedidoRequestDTO {
    private String estado;
    private List<ProductoPedidoRequestDTO> productosPedidos;
}
