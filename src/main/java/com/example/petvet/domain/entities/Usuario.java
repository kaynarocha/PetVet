package com.example.petvet.domain.entities;

import com.example.petvet.application.DTOs.CriarAdminRequest;
import com.example.petvet.application.DTOs.EnumStatusUsuario;
import com.example.petvet.application.DTOs.UsuarioRequest;
import com.example.petvet.domain.valueobject.CPF;
import com.example.petvet.domain.valueobject.EMAIL;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
// data cria os get e set
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    // acessa cpf e armazena
    @Embedded
    private CPF cpf;

    private String senha;

    @Embedded
    private EMAIL email;

    private String role = "ROLE_USUARIO";

    private EnumStatusUsuario status = EnumStatusUsuario.ATIVO;


    public Usuario(CriarAdminRequest criarAdminRequest) {
        this.setCpf(new CPF(criarAdminRequest.cpf()));
        this.setNome(criarAdminRequest.nome());
        this.setSenha(criarAdminRequest.senha());
        this.setEmail(new EMAIL(criarAdminRequest.email()));
        this.setRole("ROLE_ADMIN");

    }

    public Usuario(UsuarioRequest usuario) {
        this.setCpf(new CPF(usuario.cpf()));
        this.setNome(usuario.nome());
        this.setSenha(usuario.senha());
        this.setEmail(new EMAIL(usuario.email()));
        this.setRole("ROLE_USER");
    }
}
