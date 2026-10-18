package com.example.petvet.application.DTOs;

import java.time.LocalDate;

public record TutorRequest(String nome, String cpf, String email, String telefone,
                           LocalDate dataNascimento, String endereco) {

}
