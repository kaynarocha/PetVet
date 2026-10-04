package com.example.petvet.application.DTOs;

import com.example.petvet.domain.entities.EnumStatusPet;
import com.example.petvet.domain.entities.Pet;

import java.time.LocalDate;

public record PetResponse(Long id, String nome, String raca, LocalDate dataNascimento, EnumStatusPet statusPet) {

    public PetResponse(Pet petEntidade) {

        this(
                petEntidade.getId(),
                petEntidade.getNome(),
                petEntidade.getRaca(),
                petEntidade.getDataNascimento(),
                petEntidade.getStatusPet()
        );
    }
}
