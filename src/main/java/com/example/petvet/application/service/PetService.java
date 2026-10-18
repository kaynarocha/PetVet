package com.example.petvet.application.service;

import com.example.petvet.application.DTOs.PetRequest;
import com.example.petvet.application.DTOs.PetResponse;
import com.example.petvet.application.DTOs.EnumStatusPet;
import com.example.petvet.domain.entities.Pet;
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

    public PetResponse salvarPet(PetRequest pet, Long id) {

        if (id == 0L) {
            Pet petBanco = new Pet(pet);
            petRepository.save(petBanco);

            return new PetResponse(petBanco);
        } else {

            Pet petBanco = petRepository.findById(id).orElse(null);
            if (petBanco != null) {
                petBanco.setNome(pet.nome());
                petBanco.setRaca(pet.raca());
                petBanco.setDataNascimento(pet.dataNascimento());
                petRepository.save(petBanco);

                return new PetResponse(petBanco);
            }
        }

        return null;
    }

    public PetResponse buscarPetPorId(Long id) {

        var pet = petRepository.findById(id).orElse(null);

        if (pet == null)
            return null;

            return new PetResponse(pet);

    }

    public boolean atualizarStatus(EnumStatusPet statusPet, Long id) {

        Pet petBanco = petRepository.findById(id).orElse(null);
        if (petBanco != null) {
            petBanco.setStatusPet(statusPet);
            petRepository.save(petBanco);
            return true;

        }

        return false;
    }
}
