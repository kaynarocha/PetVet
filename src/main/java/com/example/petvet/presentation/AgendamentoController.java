package com.example.petvet.presentation;

import com.example.petvet.application.DTOs.AgendamentoRequest;
import com.example.petvet.application.DTOs.AgendamentoResponse;
import com.example.petvet.application.DTOs.AtualizarStatusRequest;
import com.example.petvet.application.service.AgendamentoService;
import com.example.petvet.application.DTOs.EnumStatusAgendamento;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// marca a classe como controller que devolve dados em JSON
@RestController
@RequestMapping("/agendamentos")
@Tag(name = "Agendamentos",
        description = "Grupo de APIs responsável por controlar a estrutura de criação e consulta do sistema.")
public class AgendamentoController {

    @Autowired
    private AgendamentoService agendamentoService;

    // listar todos os agendamentos SEM FILTRO, retorna as DTOs
    @GetMapping
    @Operation(summary = "Método de consulta de lista de agendamentos",
            description = "Método responsável em efetuar a consulta de todos os agendamentos sem filtro")
    public ResponseEntity<List<AgendamentoResponse>> listarTodos() {

        return ResponseEntity.ok(agendamentoService.listarTodosAgendamentosTable());
    }

    // agendamento por id | filtra pelo id. ERRO 404 se NÃO existir.
    @GetMapping("/{id}")
    public ResponseEntity<AgendamentoResponse> buscarPorId(@PathVariable Long id) {

        AgendamentoResponse agendamentoBanco = agendamentoService.buscarPorId(id);
        if (agendamentoBanco != null) {
            return ResponseEntity.ok(agendamentoBanco);
        }

        return ResponseEntity.notFound().build(); // 404 not found
    }

    // POST = cria um novo agendamento
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de criação de agendamentos.",
            description = "Método responsável em efetuar a criação de novos agendamentos.")
    public ResponseEntity<?> criar (@RequestBody AgendamentoRequest agendamento) {

        try {

            AgendamentoResponse agendamentoBanco = agendamentoService.salvarAgendamento(agendamento, 0L);
            return ResponseEntity.ok(agendamentoBanco);

        }  catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // PATCH = atualiza apenas o status do agendamento
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id,
                                                @RequestBody AtualizarStatusRequest statusRequest) {

        var atualizarAgendamento = agendamentoService.atualizarStatus(statusRequest.statusAgendamento(), id);

        if (atualizarAgendamento) {
            return ResponseEntity.ok().build();

        }

        return ResponseEntity.notFound().build();
    }

    // PUT = atualiza status, data, serviço e descrição do agendamento.
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id,
                                             @RequestBody AgendamentoRequest agendamento) {

        try {
            AgendamentoResponse agendamentoBanco = agendamentoService.salvarAgendamento(agendamento, id);
            return ResponseEntity.ok(agendamentoBanco);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // DELETE = exclusão lógica: marca como EXCLUÍDO sem remover do banco.
    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {

       var atualizarAgendamento = agendamentoService.atualizarStatus(EnumStatusAgendamento.EXCLUIDO, id);

       if (atualizarAgendamento) {
           return ResponseEntity.ok().build();
       }

        return ResponseEntity.notFound().build();

    }
}