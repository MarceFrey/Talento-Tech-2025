package com.talentotech.talentotech.service;

import com.talentotech.talentotech.dto.request.ProductoRequestDTO;
import com.talentotech.talentotech.dto.response.ProductoResponseDTO;
import com.talentotech.talentotech.model.Producto;

import java.util.List;

public interface IProductoService {
    List<ProductoResponseDTO> traerProductos();
    ProductoResponseDTO traerProducto(int id);
    ProductoResponseDTO crearProducto(ProductoRequestDTO producto);
    ProductoResponseDTO editarProducto(int idProducto, ProductoRequestDTO productoDTO);
    void borrarProducto(Integer id);
}
