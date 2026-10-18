package com.example.petvet.application.service;

import com.example.petvet.application.DTOs.TutorRequest;
import com.example.petvet.application.DTOs.TutorResponse;
import com.example.petvet.application.DTOs.EnumStatusTutor;
import com.example.petvet.domain.entities.Tutor;
import com.example.petvet.domain.repository.TutorRepository;
import com.example.petvet.domain.valueobject.CPF;
import com.example.petvet.domain.valueobject.EMAIL;
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

    public TutorResponse salvarTutor(TutorRequest tutor, Long id) {

        if (id == 0L) {
            Tutor tutorBanco = new Tutor(tutor);
            tutorRepository.save(tutorBanco);

            return new TutorResponse(tutorBanco);
        } else {

            Tutor tutorBanco = tutorRepository.findById(id).orElse(null);
            if (tutorBanco != null) {
                tutorBanco.setNome(tutor.nome());
                tutorBanco.setCpf(new CPF(tutor.cpf()));
                tutorBanco.setEmail(new EMAIL(tutor.email()));
                tutorBanco.setTelefone(tutor.telefone());
                tutorBanco.setDataNascimento(tutor.dataNascimento());
                tutorBanco.setEndereco(tutor.endereco());
                tutorRepository.save(tutorBanco);

                return new TutorResponse(tutorBanco);
            }
        }

        return null;
    }

    public TutorResponse buscarPorId(Long id) {

        var tutor = tutorRepository.findById(id).orElse(null);

        if (tutor == null)
            return null;

            return new TutorResponse(tutor);
        }

        public boolean atualizarStatus(EnumStatusTutor statusTutor, Long id) {

            Tutor tutorBanco = tutorRepository.findById(id).orElse(null);
            if (tutorBanco != null) {
                tutorBanco.setStatusTutor(statusTutor);
                tutorRepository.save(tutorBanco);
                return true;
            }
            return false;
        }

}
