package com.example.petvet.controllers;

import com.example.petvet.entities.Pet;
import com.example.petvet.repository.PetRepository;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pets")
public class PetController {

    @Autowired
    private PetRepository petRepository;

    public ResponseEntity<?> listarPets() {

        return ResponseEntity.ok(petRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Pet> criarPet (@RequestBody Pet pet) {

        var petBanco = petRepository.save(pet);
        return ResponseEntity.ok(petBanco);

    }
}
