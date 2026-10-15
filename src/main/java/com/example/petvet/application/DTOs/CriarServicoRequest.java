package com.example.petvet.application.DTOs;

import java.math.BigDecimal;

public record CriarServicoRequest(String nome, String descricao, BigDecimal valor, Integer duracaoMinutos, String secretKey) {
}
