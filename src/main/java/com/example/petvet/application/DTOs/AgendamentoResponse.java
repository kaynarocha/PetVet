package com.example.petvet.application.DTOs;

import com.example.petvet.domain.entities.Agendamento;

import java.time.LocalDateTime;

public record AgendamentoResponse(Long id, LocalDateTime data, String servico,
                                  String descricao, EnumStatusAgendamento statusAgendamento,
                                  Long servicoId, Long petId, String petNome) {

    public AgendamentoResponse(Agendamento agendamentoEntidade) {

        this(
                agendamentoEntidade.getId(),
                agendamentoEntidade.getData(),
                agendamentoEntidade.getServico() != null ? agendamentoEntidade.getServico().getNome() : null,
                agendamentoEntidade.getDescricao(),
                agendamentoEntidade.getStatusAgendamento(),
                agendamentoEntidade.getServico() != null ? agendamentoEntidade.getServico().getId() : null,
                agendamentoEntidade.getPet() != null ? agendamentoEntidade.getPet().getId() : null,
                agendamentoEntidade.getPet() != null ? agendamentoEntidade.getPet().getNome() : null
        );
    }
}
