package com.example.petvet.application.DTOs;

import java.time.LocalDateTime;

// fk de serviço e pet
public record AgendamentoRequest(LocalDateTime data, Long servicoId, Long petId, String descricao) {
}
