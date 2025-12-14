package com.talentotech.talentotech.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProductoResponseDTO {
    private Integer id;
    private String nombreProducto;
    private String imagen;
    private String descripcion;
    private Double precio;
    private Integer stock;
}
