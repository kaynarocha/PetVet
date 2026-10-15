package com.example.petvet.application.DTOs;

import com.example.petvet.domain.entities.EnumStatusServico;
import com.example.petvet.domain.entities.Servico;

import java.math.BigDecimal;

public record ServicoResponse(Long id, String nome, String descricao, BigDecimal valor, Integer duracaoMinutos, EnumStatusServico statusServico) {

    public ServicoResponse(Servico servicoEntidade){

        this(
                servicoEntidade.getId(),
                servicoEntidade.getNome(),
                servicoEntidade.getDescricao(),
                servicoEntidade.getValor(),
                servicoEntidade.getDuracaoMinutos(),
                servicoEntidade.getStatusServico()
        );
    }

}