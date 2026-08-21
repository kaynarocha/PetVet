package com.example.petvet.controllers;

import com.example.petvet.entities.Tutor;
import com.example.petvet.repository.TutorRepository;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tutores")
public class TutorController {

    @Autowired
    private TutorRepository tutorRepository;

    @GetMapping
    public ResponseEntity<?> listarTutores() {

        return ResponseEntity.ok(tutorRepository.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Tutor> criarTutor(@RequestBody Tutor tutor) {

        var  tutorBanco = tutorRepository.save(tutor);
        return ResponseEntity.ok(tutorBanco);
    }
}
