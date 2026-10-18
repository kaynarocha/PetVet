package com.example.petvet.presentation;

import com.example.petvet.application.DTOs.AtualizarStatusRequest;
import com.example.petvet.application.DTOs.TutorRequest;
import com.example.petvet.application.DTOs.TutorResponse;
import com.example.petvet.application.service.TutorService;
import com.example.petvet.application.DTOs.EnumStatusTutor;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tutores")
@Tag(name = "Tutores",
        description = "Esta tag identifica o responsável legal pelo pet, centralizando informações de contato, " +
                "histórico de atendimento e preferências para garantir um atendimento personalizado e humanizado.")
public class TutorController {

    @Autowired
    private TutorService tutorService;

    @GetMapping
    @Operation(summary = "Método de consulta de lista de tutores.",
            description = "Método responsável em efetuar a consulta de todos os tutores sem filtro")
    public ResponseEntity<List<TutorResponse>> listarTodos() {

        return ResponseEntity.ok(tutorService.listarTodosTutoresTable());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TutorResponse> buscarPorId(@PathVariable Long id) {
        TutorResponse tutorBanco = tutorService.buscarPorId(id);
        if (tutorBanco!= null) {
            return ResponseEntity.ok(tutorBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de criação de tutores.",
            description = "Método responsável em efetuar a criação de novos tutores.")
    public ResponseEntity<?> criarTutor(@RequestBody TutorRequest tutor) {

        try {

            TutorResponse tutorBanco = tutorService.salvarTutor(tutor, 0L);
            return ResponseEntity.ok(tutorBanco);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id,
                                                @RequestBody AtualizarStatusRequest statusRequest) {

        var atualizarTutor = tutorService.atualizarStatus(statusRequest.statusTutor(),id);

        if (atualizarTutor) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id,
                                             @RequestBody TutorRequest tutor) {

        try {
            TutorResponse tutorBanco = tutorService.salvarTutor(tutor, id);
            return ResponseEntity.ok(tutorBanco);
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {

        var atualizarTutor = tutorService.atualizarStatus(EnumStatusTutor.EXCLUIDO,id);

        if (atualizarTutor) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();

    }
}
