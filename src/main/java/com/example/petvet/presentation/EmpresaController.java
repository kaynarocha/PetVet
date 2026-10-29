package com.example.petvet.presentation;

import com.example.petvet.application.DTOs.*;
import com.example.petvet.application.service.EmpresaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@Tag(name = "Empresas", description = "Grupo de APIs responsável por controlar a estrutura " +
                                    "de criação e consulta de empresas do sistema!")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    @GetMapping
    @Operation(summary = "Método de consulta de lista de empresas.",
                description = "Método responsável em efetuar a consulta de todas as empresas sem filtro.")
    //empresaresponse! dúvida
    public ResponseEntity<List<EmpresaResponse>> listarTodos() {

        return ResponseEntity.ok(empresaService.listarTodosEmpresasTable());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Método de consulta de empresas por ID",
            description = "Método responsável em efetuar a consulta das empresas filtrando por ID.")
    public ResponseEntity<EmpresaResponse> buscarPorId(@PathVariable Long id){
        EmpresaResponse empresaBanco = empresaService.buscarPorId(id);
        if(empresaBanco != null){
            return ResponseEntity.ok(empresaBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Método de criação de empresas.",
            description = "Método responsável em efetuar a criação de novas empresas.")

    public ResponseEntity<?> criar(@RequestBody EmpresaRequest empresa){

        try {
            EmpresaResponse empresaBanco = empresaService.salvarEmpresa(empresa, 0L);
            return ResponseEntity.ok(empresaBanco);
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Método de atualização de status da empresa por ID.",
            description = "Método responsável por atualizar o status da empresa pelo seu ID.")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusRequest statusRequest){

        var atualizarEmpresa = empresaService.atualizarStatus(statusRequest.statusEmpresa(),id);

        if (atualizarEmpresa){
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Método de atualizar as informações de uma empresa por ID.",
            description = "Método responsável por atualizar os dados de uma empresa existente filtrando pelo seu ID.")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody EmpresaRequest empresa){

        try {
            EmpresaResponse empresaBanco = empresaService.salvarEmpresa(empresa,id);
            return ResponseEntity.ok(empresaBanco);
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}/excluir")
    @Operation(summary = "Método de excluir as empresas filtrando pelo seu ID.",
            description = "Método responsável por excluir uma empresa existente pelo ID.")
    public ResponseEntity<Void> excluir(@PathVariable Long id){

        var atualizarEmpresa = empresaService.atualizarStatus(EnumStatusEmpresa.EXCLUIDO,id);

        if(atualizarEmpresa){
            return ResponseEntity.ok().build();
        }
        return  ResponseEntity.notFound().build();
    }
}