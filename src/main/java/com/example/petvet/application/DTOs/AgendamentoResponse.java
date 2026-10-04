package com.example.petvet.application.DTOs;

import com.example.petvet.domain.entities.Agendamento;
import com.example.petvet.domain.entities.EnumStatusAgendamento;

import java.time.LocalDateTime;

public record AgendamentoResponse(Long id, LocalDateTime data, String servico,
                                  String descricao, EnumStatusAgendamento statusAgendamento) {

    public AgendamentoResponse(Agendamento agendamentoEntidade) {

        this(
                agendamentoEntidade.getId(),
                agendamentoEntidade.getData(),
                agendamentoEntidade.getServico(),
                agendamentoEntidade.getDescricao(),
                agendamentoEntidade.getStatusAgendamento()
        );
    }
}
