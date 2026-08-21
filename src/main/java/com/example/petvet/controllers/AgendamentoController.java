package com.example.petvet.controllers;

import com.example.petvet.entities.Agendamento;
import com.example.petvet.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @GetMapping
    public ResponseEntity<?> listarAgendamentos() {

        return ResponseEntity.ok(agendamentoRepository.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Agendamento> criar (@RequestBody Agendamento agendamento) {

        var agendamentoBanco = agendamentoRepository.save(agendamento);
        return ResponseEntity.ok(agendamentoBanco);
    }
}
