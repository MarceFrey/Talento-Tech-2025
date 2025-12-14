package com.talentotech.talentotech.repository;

import com.talentotech.talentotech.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    List<Producto> findByNombreProductoContainingIgnoreCase(String nombreProducto);
}
