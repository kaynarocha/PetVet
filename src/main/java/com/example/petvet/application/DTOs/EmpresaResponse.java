package com.example.petvet.application.DTOs;

import com.example.petvet.domain.entities.Empresa;

public record EmpresaResponse(Long id, String razaoSocial, String cnpj, String nomeFantasia, EnumStatusEmpresa statusEmpresa) {

    public EmpresaResponse(Empresa empresaEntidade){

        this(

                empresaEntidade.getId(),
                empresaEntidade.getRazaoSocial(),
                empresaEntidade.getCnpj(),
                empresaEntidade.getNomeFantasia(),
                empresaEntidade.getStatusEmpresa()
        );
    }
}
