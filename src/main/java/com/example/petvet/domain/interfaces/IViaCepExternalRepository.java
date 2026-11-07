package com.example.petvet.domain.interfaces;

import com.example.petvet.infra.dto.ViaCepResponse;

public interface IViaCepExternalRepository {

    ViaCepResponse buscarEnderecoViaCepPorCep(String cep);
}
