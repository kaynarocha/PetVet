package com.example.petvet.application.DTOs;


import com.example.petvet.domain.entities.Usuario;
import com.example.petvet.domain.valueobject.CPF;

public record UsuarioLogado(Long id, String email, CPF cpf,
                            Long empresa_id,
                            java.util.Collection<? extends org.springframework.security.core.GrantedAuthority> authorities) {

    public UsuarioLogado(Usuario usuario){
        this(
                usuario.getId(),
                String.valueOf(usuario.getEmail()),
                usuario.getCpf(),
                usuario.getEmpresa()!=null? usuario.getEmpresa().getId():null,
                usuario.getAuthorities()
        );
    }
}

// string alue para email pq é valueobject (verificar)