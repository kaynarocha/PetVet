package com.example.petvet.controllers;

import com.example.petvet.DTOs.AtualizarStatusRequest;
import com.example.petvet.entities.Agendamento;
import com.example.petvet.entities.EnumStatusAgendamento;
import com.example.petvet.repository.AgendamentoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/agendamentos")
@Tag(name = "Agendamentos",
        description = "Grupo de APIs responsável por controlar a estrutura de criação e consulta do sistema.")
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @GetMapping
    @Operation(summary = "Método de consulta de lista de agendamentos",
            description = "Método responsável em efetuar a consulta de todos os agendamentos sem filtro")
    public ResponseEntity<?> listarAgendamentos() {

        return ResponseEntity.ok(agendamentoRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agendamento> buscarPorId(@PathVariable Long id) {
        Agendamento agendamentoBanco = agendamentoRepository.findById(id).orElse(null);
        if (agendamentoBanco!= null) {
            return ResponseEntity.ok(agendamentoBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de criação de agendamentos.",
            description = "Método responsável em efetuar a criação de novos agendamentos.")
    public ResponseEntity<Agendamento> criar (@RequestBody Agendamento agendamento) {

        var agendamentoBanco = agendamentoRepository.save(agendamento);
        return ResponseEntity.ok(agendamentoBanco);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id,
                                                @RequestBody AtualizarStatusRequest statusRequest) {

        Agendamento agendamentoBanco = agendamentoRepository.findById(id).orElse(null);
        if (agendamentoBanco!= null) {
            agendamentoBanco.setStatusAgendamento(statusRequest.statusAgendamento());
            agendamentoRepository.save(agendamentoBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Agendamento> atualizar(@PathVariable Long id,
                                             @RequestBody Agendamento agendamento) {

        try {
            Agendamento agendamentoBanco = agendamentoRepository.findById(id).orElse(null);
            if (agendamentoBanco!= null) {
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
