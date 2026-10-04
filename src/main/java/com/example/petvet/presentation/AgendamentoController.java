package com.example.petvet.presentation;

import com.example.petvet.application.DTOs.AgendamentoResponse;
import com.example.petvet.application.DTOs.AtualizarStatusRequest;
import com.example.petvet.application.service.AgendamentoService;
import com.example.petvet.domain.entities.Agendamento;
import com.example.petvet.domain.entities.EnumStatusAgendamento;
import com.example.petvet.domain.repository.AgendamentoRepository;
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

    // acesso direto ao banco de dados
    @Autowired
    private AgendamentoRepository agendamentoRepository;
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
    public ResponseEntity<Agendamento> buscarPorId(@PathVariable Long id) {
        Agendamento agendamentoBanco = agendamentoRepository.findById(id).orElse(null);
       // retorna null caso o ID não exista no banco.
        if (agendamentoBanco!= null) {
            return ResponseEntity.ok(agendamentoBanco); // 200 ok
        }
        return ResponseEntity.notFound().build(); // 404 not found
    }

    // POST = cria um novo agendamento
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de criação de agendamentos.",
            description = "Método responsável em efetuar a criação de novos agendamentos.")
    public ResponseEntity<Agendamento> criar (@RequestBody Agendamento agendamento) {

        var agendamentoBanco = agendamentoRepository.save(agendamento);
        return ResponseEntity.ok(agendamentoBanco);
    }

    // PATCH = atualiza apenas o status do agendamento
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id,
                                                @RequestBody AtualizarStatusRequest statusRequest) {

        Agendamento agendamentoBanco = agendamentoRepository.findById(id).orElse(null);
        if (agendamentoBanco!= null) {
            // altera somente o campo status com o valor recebido no request
            agendamentoBanco.setStatusAgendamento(statusRequest.statusAgendamento());
            agendamentoRepository.save(agendamentoBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // PUT = atualiza status, data, serviço e descrição do agendamento.
    @PutMapping("/{id}")
    public ResponseEntity<Agendamento> atualizar(@PathVariable Long id,
                                             @RequestBody Agendamento agendamento) {

        try {
            Agendamento agendamentoBanco = agendamentoRepository.findById(id).orElse(null);
            if (agendamentoBanco!= null) {
                // copia os campos editáveis do request para a entidade do banco
                agendamentoBanco.setStatusAgendamento(agendamento.getStatusAgendamento());
                agendamentoBanco.setData(agendamento.getData());
                agendamentoBanco.setServico(agendamento.getServico());
                agendamentoBanco.setDescricao(agendamento.getDescricao());

                agendamentoRepository.save(agendamentoBanco);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();

        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    // DELETE = exclusão lógica: marca como EXCLUÍDO sem remover do banco.
    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {

        Agendamento agendamentoBanco = agendamentoRepository.findById(id).orElse(null);
        if (agendamentoBanco!= null) {
            agendamentoBanco.setStatusAgendamento(EnumStatusAgendamento.EXCLUIDO);
            agendamentoRepository.save(agendamentoBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();

    }

}
