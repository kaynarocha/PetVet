package com.example.petvet.application.service;

import com.example.petvet.application.DTOs.AgendamentoResponse;
import com.example.petvet.domain.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    public List<AgendamentoResponse> listarTodosAgendamentosTable() {

        return agendamentoRepository.findAll()
                .stream()
                .map(AgendamentoResponse::new)
                .toList();
    }
}
