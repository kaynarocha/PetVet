package com.example.petvet.domain.entities;

import com.example.petvet.application.DTOs.EnumStatusPet;
import com.example.petvet.application.DTOs.PetRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String raca;

    private LocalDate dataNascimento;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "empresa_id", referencedColumnName = "id")
    private Empresa empresa;

    private String role = "ROLE_PET";

    private EnumStatusPet statusPet = EnumStatusPet.ATIVO;

    public Pet(PetRequest pet) {
        this.setNome(pet.nome());
        this.setRaca(pet.raca());
        this.setDataNascimento(pet.dataNascimento());
        this.setRole("ROLE_PET");
    }

}
