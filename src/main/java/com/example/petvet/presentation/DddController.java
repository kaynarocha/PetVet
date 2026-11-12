package com.example.petvet.presentation;

import com.example.petvet.application.service.DddService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ddd")
public class DddController {

    @Autowired
    private DddService dddService;

    @GetMapping("/{ddd}")
    public ResponseEntity<?> buscarDdd(@PathVariable String ddd) {

        try {
            return ResponseEntity.ok(dddService.buscarDdd(ddd));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
