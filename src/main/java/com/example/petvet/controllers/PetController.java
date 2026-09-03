package com.example.petvet.controllers;

import com.example.petvet.DTOs.AtualizarStatusRequest;
import com.example.petvet.entities.EnumStatusPet;
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

    @GetMapping("/{id}")
    public ResponseEntity<Pet> buscarPorId(@PathVariable Long id) {
        Pet petBanco = petRepository.findById(id).orElse(null);
        if (petBanco!= null) {
            return ResponseEntity.ok(petBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de criação de pets.",
            description = "Método responsável em efetuar a criação de novos pets.")
    public ResponseEntity<Pet> criarPet (@RequestBody Pet pet) {

        var petBanco = petRepository.save(pet);
        return ResponseEntity.ok(petBanco);

    }

    // serve pra atualizar um campo só
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id,
                                                @RequestBody AtualizarStatusRequest statusRequest) {

        Pet petBanco = petRepository.findById(id).orElse(null);
        if (petBanco!= null) {
            petBanco.setStatusPet(statusRequest.statusPet());
            petRepository.save(petBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pet> atualizar(@PathVariable Long id,
                                             @RequestBody Pet pet) {

        try {
            Pet petBanco = petRepository.findById(id).orElse(null);
            if (petBanco!= null) {
                petBanco.setStatusPet(pet.getStatusPet());
                petBanco.setNome(pet.getNome());
                petBanco.setRaca(pet.getRaca());
                petBanco.setDataNascimento(pet.getDataNascimento());

                petRepository.save(petBanco);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();

        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {

        Pet petBanco = petRepository.findById(id).orElse(null);
        if (petBanco!= null) {
            petBanco.setStatusPet(EnumStatusPet.EXCLUIDO);
            petRepository.save(petBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();

    }
}
