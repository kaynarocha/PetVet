package com.example.petvet.application.DTOs;

import java.time.LocalDateTime;

public record AgendamentoRequest(LocalDateTime data, String servico, String descricao) {
}
