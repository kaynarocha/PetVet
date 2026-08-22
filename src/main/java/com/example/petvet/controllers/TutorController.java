package com.example.petvet.controllers;

import com.example.petvet.entities.Tutor;
import com.example.petvet.repository.TutorRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tutores")
@Tag(name = "Tutores",
        description = "Esta tag identifica o responsável legal pelo pet, centralizando informações de contato, " +
                "histórico de atendimento e preferências para garantir um atendimento personalizado e humanizado.")
public class TutorController {

    @Autowired
    private TutorRepository tutorRepository;

    @GetMapping
    @Operation(summary = "Método de consulta de lista de tutores.",
            description = "Método responsável em efetuar a consulta de todos os usuarios sem filtro")
    public ResponseEntity<?> listarTutores() {

        return ResponseEntity.ok(tutorRepository.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de criação de tutores.",
            description = "Método responsável em efetuar a criação de novos tutores.")
    public ResponseEntity<Tutor> criarTutor(@RequestBody Tutor tutor) {

        var  tutorBanco = tutorRepository.save(tutor);
        return ResponseEntity.ok(tutorBanco);
    }
}
