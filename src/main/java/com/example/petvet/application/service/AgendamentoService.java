package com.example.petvet.application.service;

import com.example.petvet.application.DTOs.AgendamentoRequest;
import com.example.petvet.application.DTOs.AgendamentoResponse;
import com.example.petvet.domain.entities.Agendamento;
import com.example.petvet.domain.entities.EnumStatusAgendamento;
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

    public AgendamentoResponse salvarAgendamento(AgendamentoRequest agendamento, Long id) {

        if (id == null) {
            Agendamento agendamentoBanco = new Agendamento(agendamento);
            agendamentoRepository.save(agendamentoBanco);

            return new AgendamentoResponse(agendamentoBanco);
        } else {

            Agendamento agendamentoBanco = agendamentoRepository.findById(id).orElse(null);
            if (agendamentoBanco != null) {
                agendamentoBanco.setDescricao(agendamento.descricao());
                agendamentoBanco.setServico(agendamento.servico());
                agendamentoBanco.setData(agendamento.data());
                agendamentoRepository.save(agendamentoBanco);

                return new AgendamentoResponse(agendamentoBanco);
            }
        }

        return null;
    }

    public AgendamentoResponse buscarPorId(Long id) {

        var agendamento = agendamentoRepository.findById(id).orElse(null);

        if (agendamento != null)
            return null;

            return new AgendamentoResponse(agendamento);

    }

    public boolean atualizarStatus(EnumStatusAgendamento statusAgendamento, Long id) {

        Agendamento agendamentoBanco = agendamentoRepository.findById(id).orElse(null);

        if (agendamentoBanco != null) {
            agendamentoBanco.setStatusAgendamento(statusAgendamento);
            agendamentoRepository.save(agendamentoBanco);
            return true;
        }

        return false;
    }
}
