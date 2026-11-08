package com.example.petvet.application.service;

import com.example.petvet.application.DTOs.AgendamentoRequest;
import com.example.petvet.application.DTOs.AgendamentoResponse;
import com.example.petvet.domain.entities.Agendamento;
import com.example.petvet.application.DTOs.EnumStatusAgendamento;
import com.example.petvet.domain.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private UsuarioService usuarioService;

    public List<AgendamentoResponse> listarTodosAgendamentosTable() {

        var usuarioLogado = usuarioService.getUsuarioLogado();

        var agendamentos = usuarioLogado.empresa_id() == null
                ? agendamentoRepository.findAll()
                : agendamentoRepository.getAgendamentosByEmpresa_Id(usuarioLogado.empresa_id());

        return agendamentos.stream()
                .map(AgendamentoResponse::new)
                .toList();
    }

    public AgendamentoResponse salvarAgendamento(AgendamentoRequest agendamento, Long id) {

        if (id == 0L) {
            Agendamento agendamentoBanco = new Agendamento(agendamento);
            agendamentoBanco.setEmpresa(usuarioService.getEmpresaLogada());
            agendamentoRepository.save(agendamentoBanco);

            return new AgendamentoResponse(agendamentoBanco);
        } else {

            Agendamento agendamentoBanco = agendamentoRepository.findById(id).orElse(null);
            if (agendamentoBanco != null && usuarioService.podeAcessar(empresaIdDe(agendamentoBanco))) {
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

        if (agendamento == null || !usuarioService.podeAcessar(empresaIdDe(agendamento)))
            return null;

            return new AgendamentoResponse(agendamento);

    }

    public boolean atualizarStatus(EnumStatusAgendamento statusAgendamento, Long id) {

        Agendamento agendamentoBanco = agendamentoRepository.findById(id).orElse(null);

        if (agendamentoBanco != null && usuarioService.podeAcessar(empresaIdDe(agendamentoBanco))) {
            agendamentoBanco.setStatusAgendamento(statusAgendamento);
            agendamentoRepository.save(agendamentoBanco);
            return true;
        }

        return false;
    }

    private Long empresaIdDe(Agendamento agendamento) {
        return agendamento.getEmpresa() != null ? agendamento.getEmpresa().getId() : null;
    }
}
