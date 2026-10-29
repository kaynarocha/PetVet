package com.example.petvet.presentation;

import com.example.petvet.application.DTOs.*;
import com.example.petvet.application.service.UsuarioService;
import com.example.petvet.application.DTOs.EnumStatusUsuario;
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
    private UsuarioService usuarioService;

    // ? significa qualquer coisa
    @GetMapping
    @Operation(summary = "Método de consulta de lista de usuários",
                description = "Método responsável em efetuar a consulta de todos os usuários sem filtro")
    public ResponseEntity<List<UsuarioResponse>> listarTodos() {

        return ResponseEntity.ok(usuarioService.listarTodosUsuariosTable());
    }

    @PostMapping("/admin")
    public ResponseEntity<CriarAdminResponse> criarAdmin(
            @RequestBody CriarAdminRequest criarAdminRequest) {

        try {

            CriarAdminResponse respostaSalvar = usuarioService.criarAdmin(criarAdminRequest);

            return ResponseEntity.ok(respostaSalvar);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }


    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> buscarPorId(@PathVariable Long id) {

        UsuarioResponse usuarioBanco = usuarioService.buscarPorId(id);
        if (usuarioBanco!= null) {
            return ResponseEntity.ok(usuarioBanco);
        }
        return ResponseEntity.notFound().build();
    }

    // void é saida | saída dinamica
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de criação de usuários!",
                description = "Método responsável em efetuar a criação de novos usuários.")
    public ResponseEntity<?> criar(@RequestBody UsuarioRequest usuario) {

        try {

            UsuarioResponse usuarioBanco = usuarioService.salvarUsuario(usuario,0L);
            return ResponseEntity.ok(usuarioBanco);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // serve pra atualizar um campo só
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id,
                                                @RequestBody AtualizarStatusRequest statusRequest) {

       var atualizarUsuario = usuarioService.atualizarStatus(statusRequest.status(),id);

       if (atualizarUsuario) {
           return ResponseEntity.ok().build();
       }

       return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id,
                                             @RequestBody UsuarioRequest usuario) {

            try {
                UsuarioResponse usuarioBanco = usuarioService.salvarUsuario(usuario, id);
                return ResponseEntity.ok(usuarioBanco);
            } catch (Exception e) {
                return ResponseEntity
                        .badRequest()
                        .body(e.getMessage());
            }
        }

    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {

        var atualizarUsuario = usuarioService.atualizarStatus(EnumStatusUsuario.EXCLUIDO,id);

        if (atualizarUsuario) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();

    }

    @PatchMapping("/{id}/atribuirEspecilaidade")
    public ResponseEntity<?> atribuirEspecialidade(@PathVariable Long id, @RequestBody AtribuirEspecialidadeRequest atribuirEspecialidadeRequest) {

        boolean retornoEspecialidade = usuarioService.atribuirEspecialidade(id, atribuirEspecialidadeRequest);

        if (retornoEspecialidade) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

}
