package com.talentotech.talentotech.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPedido;

    private String estado;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "pedido_id")
    private List<DetallePedido> detallePedido = new ArrayList<>();

}
