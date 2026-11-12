package com.example.petvet.domain.interfaces;

import com.example.petvet.infra.dto.ApiDddResponse;

public interface IDddExternalRepository {

    ApiDddResponse buscarDddPorCodigo(String ddd);
}
