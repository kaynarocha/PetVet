package com.example.petvet.domain.entities;

import com.example.petvet.application.DTOs.CriarAdminRequest;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    private String cpf;

    private String senha;

    private String email;

    private String role = "ROLE_USUARIO";

    private EnumStatusUsuario status;

    public Usuario(CriarAdminRequest criarAdminRequest) {
        this.setCpf(criarAdminRequest.cpf());
        this.setNome(criarAdminRequest.nome());
        this.setSenha(criarAdminRequest.senha());
        this.setEmail(criarAdminRequest.email());
        this.setRole("ROLE_USUARIO");

    }
}
