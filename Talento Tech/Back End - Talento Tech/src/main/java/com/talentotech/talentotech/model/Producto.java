package com.talentotech.talentotech.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Entity
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nombreProducto;
    private String imagen;
    private String descripcion;
    private Double precio;
    private Integer stock;
}
