package com.talentotech.talentotech.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProductoRequestDTO {
    private String nombreProducto;
    private String imagen;
    private String descripcion;
    private Double precio;
    private Integer stock;
}
