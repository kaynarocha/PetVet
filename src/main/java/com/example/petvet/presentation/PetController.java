package com.example.petvet.presentation;

import com.example.petvet.application.DTOs.AtualizarStatusRequest;
import com.example.petvet.application.DTOs.PetRequest;
import com.example.petvet.application.DTOs.PetResponse;
import com.example.petvet.application.service.PetService;
import com.example.petvet.domain.entities.EnumStatusPet;
import com.example.petvet.domain.entities.Pet;
import com.example.petvet.domain.repository.PetRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pets")
@Tag(name = "Pets", description = "Grupo de APIs responsável por controlar a estrutura de criação e consulta do sistema. editar")
public class PetController {

    @Autowired
    private PetService petService;

    @GetMapping
    @Operation(summary = "Método de consulta de lista de pets",
            description = "Método responsável em efetuar a consulta de todos os pets sem filtro.")
    public ResponseEntity<List<PetResponse>> listarTodos() {

        return ResponseEntity.ok(petService.listarTodosPetsTable());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetResponse> buscarPorId(@PathVariable Long id) {

        PetResponse petBanco = petService.buscarPetPorId(id);
        if (petBanco!= null) {
            return ResponseEntity.ok(petBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de criação de pets.",
            description = "Método responsável em efetuar a criação de novos pets.")
    public ResponseEntity<?> criarPet (@RequestBody PetRequest pet) {

        try {

            PetResponse petBanco = petService.salvarPet(pet, 0L);
            return ResponseEntity.ok(petBanco);
        }  catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());

        }
    }

    // serve pra atualizar um campo só
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id,
                                                @RequestBody AtualizarStatusRequest statusRequest) {

        var atualizarPet = petService.atualizarStatus(statusRequest.statusPet(),id);

        if (atualizarPet) {
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id,
                                             @RequestBody PetRequest pet) {

        try {
            PetResponse petBanco = petService.salvarPet(pet, id);
            return ResponseEntity.ok(petBanco);
        }   catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());

        }
    }

    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {

        var atualizarPet = petService.atualizarStatus(EnumStatusPet.EXCLUIDO,id);

        if (atualizarPet) {
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();

    }
}
