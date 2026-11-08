package com.example.petvet.application.DTOs;

import com.example.petvet.domain.entities.Pet;

import java.time.LocalDate;

public record PetResponse(Long id, String nome, String raca, LocalDate dataNascimento, EnumStatusPet statusPet,
                          Long tutorId, String tutorNome) {

    public PetResponse(Pet petEntidade) {

        this(
                petEntidade.getId(),
                petEntidade.getNome(),
                petEntidade.getRaca(),
                petEntidade.getDataNascimento(),
                petEntidade.getStatusPet(),
                petEntidade.getTutor() != null ? petEntidade.getTutor().getId() : null,
                petEntidade.getTutor() != null ? petEntidade.getTutor().getNome() : null
        );
    }
}
