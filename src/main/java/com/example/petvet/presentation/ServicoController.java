package com.example.petvet.presentation;

import com.example.petvet.application.DTOs.*;
import com.example.petvet.application.service.ServicoService;
import com.example.petvet.application.DTOs.EnumStatusServico;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/servico")
@Tag(name = "Serviços", description = "Grupo de APIs responsável por controlar a estrutura de criação e consulta de serviços do sistema!")
public class ServicoController {

    @Autowired
    private ServicoService servicoService;

    @GetMapping
    @Operation(summary = "Método de consulta de lista de serviços!",
            description = "Método responsável em efetuar a consulta de todos os serviços sem filtro.")
    public ResponseEntity<List<ServicoResponse>> listarTodos(){

        return ResponseEntity.ok(servicoService.listarTodosServicosTable());
    }

    @PostMapping("/adminServico")
    public ResponseEntity<CriarServicoResponse> criarServicoAdmin(@RequestBody CriarServicoRequest criarServicoRequest){

        try {

            CriarServicoResponse respostaSalvar = servicoService.criarServicoAdmin(criarServicoRequest);

            return ResponseEntity.ok(respostaSalvar);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }

    }

    @GetMapping("/{id}")
    @Operation(summary = "Método de consulta de serviços por ID",
            description = "Método responsável em efetuar a consulta dos serviços filtrando por ID.")

    public ResponseEntity<ServicoResponse> buscarPorId(@PathVariable Long id){

        ServicoResponse servicoBanco = servicoService.buscarPorId(id);
        if(servicoBanco != null){
            return ResponseEntity.ok(servicoBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de criação de serviços!",
            description = "Método responsável em efetuar a criação de novos serviços.")

    public ResponseEntity<?> criar(@RequestBody ServicoRequest servico){

        try {

            ServicoResponse servicoBanco = servicoService.salvarServico(servico, 0L);
            return ResponseEntity.ok(servicoBanco);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Método de atualização de status do serviço por ID.",
            description = "Método responsável por atualizar o status do serviço pelo seu ID.")

    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id,
                                                @RequestBody AtualizarStatusRequest statusRequest){

        var atualizarServico = servicoService.atualizarStatus(statusRequest.statusServico(), id);

        if (atualizarServico) {
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Método de atualizar as informações de um serviço por ID.",
            description = "Método responsável por atualizar os dados de um serviço existente filtrando pelo seu ID.")

    public ResponseEntity<?> atualizar(@PathVariable Long id,
                                       @RequestBody ServicoRequest servico ){

        try {

            ServicoResponse servicoBanco = servicoService.salvarServico(servico, id);
            return ResponseEntity.ok(servicoBanco);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}/excluir")
    @Operation(summary = "Método de excluir os serviços filtrando pelo seu ID.",
            description = "Método responsável por excluir um serviço existente pelo ID.")
    public ResponseEntity<Void> excluir(@PathVariable Long id){

       var atualizarServico = servicoService.atualizarStatus(EnumStatusServico.EXCLUIDO, id);

       if (atualizarServico) {
           return ResponseEntity.ok().build();
       }
        return ResponseEntity.notFound().build();
    }
}