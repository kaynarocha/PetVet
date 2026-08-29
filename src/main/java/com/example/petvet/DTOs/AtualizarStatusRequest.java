package com.example.petvet.DTOs;

import com.example.petvet.entities.EnumStatusUsuario;

public record AtualizarStatusRequest(EnumStatusUsuario status) {
}
