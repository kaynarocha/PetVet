package com.example.petvet.controllers;

import com.example.petvet.entities.Usuario;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// rest api
@RestController
@RequestMapping("/usuarios") // define a rota
public class UsuarioController {

    // ? significa qualquer coisa
    @GetMapping
    public ResponseEntity<?> listarTodos() {

        List<Usuario> usuarios =
                List.of(new Usuario(1L,
                        "Kayná",
                        "11412594944",
                        "123456",
                        "kaynarocha1@gmail.com"));



        return ResponseEntity.ok("Sucesso");
    }
}
