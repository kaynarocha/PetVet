package com.example.petvet.controllers;

import com.example.petvet.entities.Pet;
import com.example.petvet.repository.PetRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pets")
@Tag(name = "Pets", description = "Grupo de APIs responsável por controlar a estrutura de criação e consulta do sistema. editar")
public class PetController {

    @Autowired
    private PetRepository petRepository;

    @GetMapping
    @Operation(summary = "Método de consulta de lista de pets",
            description = "Método responsável em efetuar a consulta de todos os pets sem filtro.")
    public ResponseEntity<?> listarPets() {

        return ResponseEntity.ok(petRepository.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de criação de pets.",
            description = "Método responsável em efetuar a criação de novos pets.")
    public ResponseEntity<Pet> criarPet (@RequestBody Pet pet) {

        var petBanco = petRepository.save(pet);
        return ResponseEntity.ok(petBanco);

    }
}
