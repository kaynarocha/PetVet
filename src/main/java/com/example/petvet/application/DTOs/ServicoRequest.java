package com.example.petvet.application.DTOs;

import java.math.BigDecimal;

public record ServicoRequest(String nome, String descricao, BigDecimal valor, Integer duracaoMinutos) {
}
