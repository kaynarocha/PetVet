package com.example.petvet.controllers;

import com.example.petvet.entities.Usuario;
import com.example.petvet.repository.UsuarioRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// rest api
@RestController
@RequestMapping("/usuarios") // define a rota
@Tag(name = "Usuarios",
        description = "Grupo de APIs responsável por controlar a estrutura de criação e consulta do sistema.")
public class UsuarioController {

    // injeção de dependência
    @Autowired
    private UsuarioRepository usuarioRepository;


    // ? significa qualquer coisa
    @GetMapping
    @Operation(summary = "Método de consulta de lista de usuários",
                description = "Método responsável em efetuar a consulta de todos os usuarios sem filtro")
    public ResponseEntity<?> listarTodos() {

        return ResponseEntity.ok(usuarioRepository.findAll());
    }

    // void é saida
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de criação de usuários!",
                description = "Método responsável em efetuar a criação de novos usuários.")
    public ResponseEntity<Usuario> criar(@RequestBody Usuario usuario) {

        var usuarioBanco = usuarioRepository.save(usuario);
        return ResponseEntity.ok(usuarioBanco);
    }
}
