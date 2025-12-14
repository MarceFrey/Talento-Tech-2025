package com.talentotech.talentotech.controller;

import com.talentotech.talentotech.dto.request.PedidoRequestDTO;
import com.talentotech.talentotech.dto.response.PedidoResponseDTO;
import com.talentotech.talentotech.service.IPedidoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "http://localhost:5173") // Le indico el puerto origen que va a utilizar esta ruta
public class PedidoController {
    //--------------------------------------------------------------------------
    // * INYECCION DE DEPENDENCIA ENTRE EL SERVICIO DE PEDIDO Y LA CONTROLADORA
    //--------------------------------------------------------------------------
    private IPedidoService pediService;

    public PedidoController (IPedidoService pediService){
        this.pediService = pediService;
    }

    //--------------------------------------------------------------------------
    // * METODO GET - SE UTILIZA PARA TRAER TODA LA LISTA DE PEDIDOS
    //--------------------------------------------------------------------------
    @GetMapping
    public List<PedidoResponseDTO> verPedidos(){
        return pediService.traerPedidos();
    }

    //--------------------------------------------------------------------------
    // * METODO GET - SE USA PARA TRAER UN PEDIDO POR SU ID
    //--------------------------------------------------------------------------
    @GetMapping("/{id}")
    public PedidoResponseDTO traerPedido(@PathVariable int id) {
        return pediService.trerPedido(id);
    }

    //--------------------------------------------------------------------------
    // * METODO POST - CON ESTE METODO CREAMOS EL PEDIDO
    //--------------------------------------------------------------------------
    @PostMapping
    public PedidoResponseDTO crearPedido(@RequestBody PedidoRequestDTO pedido){
        return pediService.crearPedido(pedido);
    }

    //--------------------------------------------------------------------------
    // * METODO PUT - PARA EDITAR EL PEDIDO
    //--------------------------------------------------------------------------
    @PutMapping("/{id}")
    public PedidoResponseDTO editarPedido(@PathVariable int id, @RequestBody PedidoRequestDTO nuevoPedido){
        return pediService.editarPedido(id , nuevoPedido);
    }

    //--------------------------------------------------------------------------
    // * METODO DELETE - CON ESTE METODO SE ELIMINA EL PEDIDO USANDO LA ID
    //--------------------------------------------------------------------------
    @DeleteMapping("/{id}")
    public void eliminarPedido(@PathVariable int id){
        pediService.borrarPedido(id);
    }

    //--------------------------------------------------------------------------
    // * CON ESTE METODO PUEDO USAR LA ID PARA CALCULAR EL PRECIO TOTAL
    //--------------------------------------------------------------------------
    @GetMapping("/total/{id}")
    public ResponseEntity<Double> obtenerTotal(@PathVariable int id) {
        Double total = pediService.calcularPrecioFinal(id);
        return ResponseEntity.ok(total);
    }


}
