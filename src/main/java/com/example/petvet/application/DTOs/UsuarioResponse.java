package com.example.petvet.application.DTOs;

import com.example.petvet.domain.entities.Usuario;

// trocar EMAIL e CPF
public record UsuarioResponse(Long id, String nome, String cpf, String email, EnumStatusUsuario status) {

    public UsuarioResponse(Usuario usuarioEntidade) {

        this(
                usuarioEntidade.getId(),
                usuarioEntidade.getNome(),
                usuarioEntidade.getCpf().toString(),
                usuarioEntidade.getEmail().toString(),
                usuarioEntidade.getStatus()
        );
    }
}
