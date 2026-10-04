package com.example.petvet.application.DTOs;

import com.example.petvet.domain.entities.EnumStatusTutor;
import com.example.petvet.domain.entities.EnumStatusUsuario;
import com.example.petvet.domain.entities.Tutor;

import java.time.LocalDate;

public record TutorResponse(Long id, String nome, String cpf,
                            String telefone, String email, LocalDate dataNascimento,
                            String endereco, EnumStatusTutor statusTutor) {

    public TutorResponse(Tutor tutorEntidade) {

        this(
                tutorEntidade.getId(),
                tutorEntidade.getNome(),
                tutorEntidade.getCpf(),
                tutorEntidade.getTelefone(),
                tutorEntidade.getEmail(),
                tutorEntidade.getDataNascimento(),
                tutorEntidade.getEndereco(),
                tutorEntidade.getStatusTutor()
        );
    }
}
