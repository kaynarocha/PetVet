package com.example.petvet.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// data cria os get e set
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    public Long id;

    public String nome;

    public String cpf;

    public String senha;

    public String email;


}
