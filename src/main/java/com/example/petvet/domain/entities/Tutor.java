package com.example.petvet.domain.entities;

import com.example.petvet.application.DTOs.TutorRequest;
import com.example.petvet.domain.valueobject.CPF;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tutor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Embedded
    private CPF cpf;

    private String telefone;

    private String email;

    private LocalDate dataNascimento;

    private String endereco;

    private String role = "ROLE_TUTOR";

    private EnumStatusTutor statusTutor;

    public void setEmail(String email) {

        if (email.isEmpty() && !email.contains("@")) {
            throw new IllegalArgumentException("Email inválido.");
        }
        this.email = email;
    }

    public Tutor(TutorRequest tutor) {
        this.setCpf(new CPF(tutor.cpf()));
        this.setNome(tutor.nome());
        this.setTelefone(tutor.telefone());
        this.setEmail(tutor.email());
        this.setDataNascimento(tutor.dataNascimento());
        this.setEndereco(tutor.endereco());
        this.setRole("ROLE_TUTOR");
    }


}
