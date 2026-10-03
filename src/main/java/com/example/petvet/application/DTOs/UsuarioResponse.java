package com.example.petvet.application.DTOs;

import com.example.petvet.domain.entities.EnumStatusUsuario;
import com.example.petvet.domain.entities.Usuario;

public record UsuarioResponse(Long id, String nome, String email, String senha, EnumStatusUsuario status) {

    public UsuarioResponse(Usuario usuarioEntidade) {

        this(
                usuarioEntidade.getId(),
                usuarioEntidade.getNome(),
                usuarioEntidade.getCpf(),
                usuarioEntidade.getEmail(),
                usuarioEntidade.getStatus()
        );
    }
}
