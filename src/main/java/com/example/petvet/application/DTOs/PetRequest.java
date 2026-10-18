package com.example.petvet.application.DTOs;

import java.time.LocalDate;

public record PetRequest(String nome, String raca, LocalDate dataNascimento) {
}
