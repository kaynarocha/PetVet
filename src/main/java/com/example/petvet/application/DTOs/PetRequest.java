package com.example.petvet.application.DTOs;

import java.time.LocalDate;

// fk pet pertence a um tutor
public record PetRequest(String nome, String raca, LocalDate dataNascimento, Long tutorId) {
}
