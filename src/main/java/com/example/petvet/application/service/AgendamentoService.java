package com.example.petvet.application.service;

import com.example.petvet.application.DTOs.AgendamentoRequest;
import com.example.petvet.application.DTOs.AgendamentoResponse;
import com.example.petvet.domain.entities.Agendamento;
import com.example.petvet.application.DTOs.EnumStatusAgendamento;
import com.example.petvet.domain.entities.Pet;
import com.example.petvet.domain.entities.Servico;
import com.example.petvet.domain.repository.AgendamentoRepository;
import com.example.petvet.domain.repository.ServicoRepository;
import com.example.petvet.domain.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private UsuarioService usuarioService;

    // fk pet e agendamento
    @Autowired
    private PetRepository petRepository;

    @Autowired
    private ServicoRepository servicoRepository;

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

            //fk
            Long empresaId = agendamentoBanco.getEmpresa().getId();
            agendamentoBanco.setPet(buscarPetDaMesmaEmpresa(agendamento.petId(), empresaId));
            agendamentoBanco.setServico(buscarServicoDaMesmaEmpresa(agendamento.servicoId(), empresaId));

            agendamentoRepository.save(agendamentoBanco);

            return new AgendamentoResponse(agendamentoBanco);

        } else {

            Agendamento agendamentoBanco = agendamentoRepository.findById(id).orElse(null);
            if (agendamentoBanco != null && usuarioService.podeAcessar(empresaIdDe(agendamentoBanco))) {
                agendamentoBanco.setDescricao(agendamento.descricao());

                //fk
                if (agendamento.petId() != null) {
                    agendamentoBanco.setPet(buscarPetDaMesmaEmpresa(agendamento.petId(), empresaIdDe(agendamentoBanco)));
                }
                if (agendamento.servicoId() != null) {
                    agendamentoBanco.setServico(buscarServicoDaMesmaEmpresa(agendamento.servicoId(), empresaIdDe(agendamentoBanco)));
                }

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

    // fk pet precisa existir e ser da mesma empresa do agendamento
    private Pet buscarPetDaMesmaEmpresa(Long petId, Long empresaId) {
        if (petId == null) {
            throw new IllegalArgumentException("Informe o pet do agendamento!");
        }
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new IllegalArgumentException("Pet não encontrado!"));
        Long empresaDoPet = pet.getEmpresa() != null ? pet.getEmpresa().getId() : null;
        if (empresaDoPet == null || !empresaDoPet.equals(empresaId)) {
            throw new IllegalArgumentException("Pet não encontrado!");
        }
        return pet;
    }

    // fk serviço ser da mesma empresa agendamento
    private Servico buscarServicoDaMesmaEmpresa(Long servicoId, Long empresaId) {
        if (servicoId == null) {
            throw new IllegalArgumentException("Informe o serviço do agendamento!");
        }
        Servico servico = servicoRepository.findById(servicoId)
                .orElseThrow(() -> new IllegalArgumentException("Serviço não encontrado!"));
        Long empresaDoServico = servico.getEmpresa() != null ? servico.getEmpresa().getId() : null;
        if (empresaDoServico == null || !empresaDoServico.equals(empresaId)) {
            throw new IllegalArgumentException("Serviço não encontrado!");
        }
        return servico;
    }
}
