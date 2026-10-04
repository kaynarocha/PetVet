package com.example.petvet.presentation;

import com.example.petvet.application.DTOs.LoginRequest;
import com.example.petvet.application.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@Tag(name = "Controle de Autenticação", description = "Controller responsável pela autenticação da aplicação.")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    @Operation(description = "Método responsável por efetuar o login do usuário.", summary = "Autenticação de usuários")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        var resultadoAutenticacaoRetornoToken = usuarioService.validarUsuarioAutenticadoRetornaToken(request);

        if (resultadoAutenticacaoRetornoToken != null) {
            return ResponseEntity.ok(resultadoAutenticacaoRetornoToken);
        }
        return ResponseEntity.badRequest().body("Usuário ou senha inválida.");
    }
}
