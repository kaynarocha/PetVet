package com.example.petvet.controllers;

import com.example.petvet.entities.Usuario;
import com.example.petvet.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// rest api
@RestController
@RequestMapping("/usuarios") // define a rota
public class UsuarioController {

    // injeção de dependência
    @Autowired
    private UsuarioRepository usuarioRepository;


    // ? significa qualquer coisa
    @GetMapping
    public ResponseEntity<?> listarTodos() {

        return ResponseEntity.ok(usuarioRepository.findAll());
    }

    // void é saida
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Usuario> criar(@RequestBody Usuario usuario) {

        var usuarioBanco = usuarioRepository.save(usuario);
        return ResponseEntity.ok(usuarioBanco);
    }
}
