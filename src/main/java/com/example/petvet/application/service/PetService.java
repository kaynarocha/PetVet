package com.example.petvet.application.service;

import com.example.petvet.application.DTOs.PetResponse;
import com.example.petvet.domain.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    public List<PetResponse> listarTodosPetsTable() {

        return petRepository.findAll()
                .stream()
                .map(PetResponse::new)
                .toList();
    }
}
