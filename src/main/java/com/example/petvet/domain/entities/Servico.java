package com.example.petvet.domain.entities;

import com.example.petvet.application.DTOs.CriarServicoRequest;
import com.example.petvet.application.DTOs.EnumStatusServico;
import com.example.petvet.application.DTOs.ServicoRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Servico{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String descricao;

    private BigDecimal valor;

    private Integer duracaoMinutos;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "empresa_id", referencedColumnName = "id")
    private Empresa empresa;

    private String role = "ROLE_SERVICO";

    private EnumStatusServico statusServico = EnumStatusServico.ATIVO;

    public Servico(CriarServicoRequest criarServicoRequest) {
        this.setNome(criarServicoRequest.nome());
        this.setDescricao(criarServicoRequest.descricao());
        this.setValor(criarServicoRequest.valor());
        this.setDuracaoMinutos(criarServicoRequest.duracaoMinutos());
        this.setRole("ROLE_SERVICOADMIN");
    }

    public Servico(ServicoRequest servico) {
        this.setNome(servico.nome());
        this.setDescricao(servico.descricao());
        this.setValor(servico.valor());
        this.setDuracaoMinutos(servico.duracaoMinutos());
        this.setRole("ROLE_SERVICOADMIN");
    }

}