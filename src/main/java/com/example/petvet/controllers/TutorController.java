package com.example.petvet.controllers;

import com.example.petvet.DTOs.AtualizarStatusRequest;
import com.example.petvet.entities.EnumStatusTutor;
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
            description = "Método responsável em efetuar a consulta de todos os tutores sem filtro")
    public ResponseEntity<?> listarTutores() {

        return ResponseEntity.ok(tutorRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tutor> buscarPorId(@PathVariable Long id) {
        Tutor tutorBanco = tutorRepository.findById(id).orElse(null);
        if (tutorBanco!= null) {
            return ResponseEntity.ok(tutorBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de criação de tutores.",
            description = "Método responsável em efetuar a criação de novos tutores.")
    public ResponseEntity<Tutor> criarTutor(@RequestBody Tutor tutor) {

        var  tutorBanco = tutorRepository.save(tutor);
        return ResponseEntity.ok(tutorBanco);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id,
                                                @RequestBody AtualizarStatusRequest statusRequest) {

        Tutor tutorBanco = tutorRepository.findById(id).orElse(null);
        if (tutorBanco!= null) {
            tutorBanco.setStatusTutor(statusRequest.statusTutor());
            tutorRepository.save(tutorBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tutor> atualizar(@PathVariable Long id,
                                             @RequestBody Tutor tutor) {

        try {
            Tutor tutorBanco = tutorRepository.findById(id).orElse(null);
            if (tutorBanco!= null) {
                tutorBanco.setStatusTutor(tutor.getStatusTutor());
                tutorBanco.setNome(tutor.getNome());
                tutorBanco.setCpf(tutor.getCpf());
                tutorBanco.setEmail(tutor.getEmail());
                tutorBanco.setTelefone(tutor.getTelefone());
                tutorBanco.setDataNascimento(tutor.getDataNascimento());
                tutorBanco.setEndereco(tutor.getEndereco());

                tutorRepository.save(tutorBanco);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();

        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {

        Tutor tutorBanco = tutorRepository.findById(id).orElse(null);
        if (tutorBanco!= null) {
            tutorBanco.setStatusTutor(EnumStatusTutor.EXCLUIDO);
            tutorRepository.save(tutorBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();

    }
}
