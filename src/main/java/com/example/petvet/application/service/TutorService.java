package com.example.petvet.application.service;

import com.example.petvet.application.DTOs.TutorResponse;
import com.example.petvet.domain.repository.TutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutorService {

    @Autowired
    private TutorRepository tutorRepository;

    public List<TutorResponse> listarTodosTutoresTable() {

        return tutorRepository.findAll()
                .stream()
                .map(TutorResponse::new)
                .toList();

    }
}
