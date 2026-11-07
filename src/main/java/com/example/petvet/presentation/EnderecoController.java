package com.example.petvet.presentation;

import com.example.petvet.application.DTOs.EnderecoResponse;
import com.example.petvet.application.service.EnderecoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/endereco")
public class EnderecoController {

    @Autowired
    private EnderecoService enderecoService;

    @GetMapping("/{cep}")
    public ResponseEntity<EnderecoResponse> buscarEndereco(@PathVariable String cep){
        return ResponseEntity.ok( enderecoService.BuscarEndereco(cep));
    }
}
