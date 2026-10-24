package com.example.petvet.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String razaoSocial;

    private String cnpj;

    private String nomeFantasia;

    // muitos usuarios = empresa para usuarios
    // sempre que terminar em Many, vai ser private LIST
    //mappedBy = apontar o outro lado
    @OneToMany(mappedBy = "empresa")
    private List<Usuario> usuario;
}
