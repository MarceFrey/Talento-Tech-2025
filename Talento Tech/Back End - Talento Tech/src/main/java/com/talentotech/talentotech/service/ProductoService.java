package com.talentotech.talentotech.service;

import com.talentotech.talentotech.dto.request.ProductoRequestDTO;
import com.talentotech.talentotech.dto.response.ProductoResponseDTO;
import com.talentotech.talentotech.model.Producto;
import com.talentotech.talentotech.repository.ProductoRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService implements IProductoService{

    private ProductoRepository produRepo;

    // Define el nombre del archivo de imagen por defecto
    private static final String DEFAULT_IMAGE = "default.png";

    public ProductoService(ProductoRepository productoRepository) {
        this.produRepo = productoRepository;
    }

    // =========================================================================
    // CRUD Métodos
    // =========================================================================

    @Override
    public List<ProductoResponseDTO> traerProductos() {
        // Mapea la lista de entidades a DTOs usando el método toResponseDTO
        return produRepo.findAll().stream().map(this::toResponseDTO).toList();
    }

    @Override
    public ProductoResponseDTO traerProducto(int id) {
        Producto producto = produRepo.findById(id).orElse(null);
        if (producto == null) return null;
        return toResponseDTO(producto);
    }

    @Override
    public ProductoResponseDTO crearProducto(ProductoRequestDTO productoDTO) {
        Producto producto = toEntity(productoDTO);
        Producto guardado = produRepo.save(producto);
        return toResponseDTO(guardado);
    }

    @Override
    public ProductoResponseDTO editarProducto(int idProducto, ProductoRequestDTO productoDTO) {
        Producto p = produRepo.findById(idProducto).orElse(null);

        if(p == null) return null;

        // Actualizar solo los campos que vienen del DTO
        p.setNombreProducto(productoDTO.getNombreProducto());
        // Se asegura de actualizar la imagen si viene en el DTO (ej: al editarla)
        p.setImagen(productoDTO.getImagen());
        p.setDescripcion(productoDTO.getDescripcion());
        p.setPrecio(productoDTO.getPrecio());
        p.setStock(productoDTO.getStock());

        Producto actualizado = produRepo.save(p);

        return toResponseDTO(actualizado);
    }

    @Override
    public void borrarProducto(Integer id) {
        try {
            produRepo.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("No se puede eliminar el producto porque tiene pedidos asociados");
        }
    }

    // =========================================================================
    // Métodos de Mapeo (To Entity / To DTO)
    // =========================================================================

    private ProductoResponseDTO toResponseDTO(Producto producto) {
        ProductoResponseDTO dto = new ProductoResponseDTO();
        dto.setId(producto.getId());
        dto.setNombreProducto(producto.getNombreProducto());
        dto.setDescripcion(producto.getDescripcion());

        // 🚨 Lógica de la Imagen Corregida: Evita enviar 'null' a React
        String imagenFinal = producto.getImagen();

        // Si la imagen es NULL o está vacía en la base de datos, usa la imagen por defecto
        if (imagenFinal == null || imagenFinal.trim().isEmpty()) {
            imagenFinal = DEFAULT_IMAGE;
        }

        dto.setImagen(imagenFinal);

        dto.setPrecio(producto.getPrecio());
        dto.setStock(producto.getStock());
        return dto;
    }

    private Producto toEntity(ProductoRequestDTO dto) {
        Producto p = new Producto();
        p.setNombreProducto(dto.getNombreProducto());
        p.setDescripcion(dto.getDescripcion());
        // Cuando se crea o edita, se guarda lo que viene del DTO.
        // Si el DTO es null, guardará null o una cadena vacía (depende de la DB).
        // El DTO de respuesta se encarga de corregir los nulls.
        p.setImagen(dto.getImagen());
        p.setPrecio(dto.getPrecio());
        p.setStock(dto.getStock());
        return p;
    }
}