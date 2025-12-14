package com.talentotech.talentotech.controller;

import com.talentotech.talentotech.dto.request.ProductoRequestDTO;
import com.talentotech.talentotech.dto.response.ProductoResponseDTO;
import com.talentotech.talentotech.model.Producto;
import com.talentotech.talentotech.service.IProductoService;
import com.talentotech.talentotech.service.ProductoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/productos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {

    private  IProductoService produService;

    public ProductoController(IProductoService productService) {
        this.produService = productService;
    }

    @GetMapping
    public List<ProductoResponseDTO> traerProductos(){
        return produService.traerProductos();
    }

    @GetMapping("/{id}")
    public ProductoResponseDTO traerProducto(@PathVariable int id){
        return produService.traerProducto(id);
    }

    @PostMapping
    public ProductoResponseDTO crearProducto(@RequestBody ProductoRequestDTO producto){
        return produService.crearProducto(producto);
    }

    @PutMapping("/{id}")
    public ProductoResponseDTO editarProducto(@PathVariable int id, @RequestBody ProductoRequestDTO producto){
        return produService.editarProducto(id, producto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarProducto(@PathVariable int id){
        try {
            produService.borrarProducto(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

}
