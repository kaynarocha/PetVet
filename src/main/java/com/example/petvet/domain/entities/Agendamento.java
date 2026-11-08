package com.example.petvet.domain.entities;

import com.example.petvet.application.DTOs.AgendamentoRequest;
import com.example.petvet.application.DTOs.EnumStatusAgendamento;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
//get e setter
@Data
// construtor vazio
@NoArgsConstructor
// com instancia
@AllArgsConstructor
public class Agendamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime data;

    private String servico;

    private String descricao;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "empresa_id", referencedColumnName = "id")
    private Empresa empresa;

    private String role = "ROLE_AGENDAMENTO";

    private EnumStatusAgendamento statusAgendamento =  EnumStatusAgendamento.ATIVO;

    public Agendamento(AgendamentoRequest agendamento) {
        this.setData(agendamento.data() != null ? agendamento.data() : LocalDateTime.now());
        this.setDescricao(agendamento.descricao());
        this.setServico(agendamento.servico());
        this.setRole("ROLE_AGENDAMENTO");
    }

}
