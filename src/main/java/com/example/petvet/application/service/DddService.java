package com.example.petvet.application.service;

import com.example.petvet.application.DTOs.DddResponse;
import com.example.petvet.domain.interfaces.IDddExternalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DddService {

    @Autowired
    private IDddExternalRepository DddExternalRepository;

    public DddResponse buscarDdd(String ddd) {

        // DDD brasileiro tem 2 dígitos
        String somenteNumeros = ddd == null ? "" : ddd.replaceAll("[^0-9]", "");
        if (somenteNumeros.length() != 2) {
            throw new IllegalArgumentException("DDD deve ter 2 dígitos!");
        }

        var resposta = DddExternalRepository.buscarDddPorCodigo(somenteNumeros);

        return new DddResponse(resposta.getState(), resposta.getCities());
    }
}
