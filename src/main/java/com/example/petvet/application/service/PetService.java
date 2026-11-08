package com.example.petvet.application.service;

import com.example.petvet.application.DTOs.PetRequest;
import com.example.petvet.application.DTOs.PetResponse;
import com.example.petvet.application.DTOs.EnumStatusPet;
import com.example.petvet.domain.entities.Pet;
import com.example.petvet.domain.entities.Tutor;
import com.example.petvet.domain.repository.PetRepository;
import com.example.petvet.domain.repository.TutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private TutorRepository tutorRepository;

    public List<PetResponse> listarTodosPetsTable() {

        var usuarioLogado = usuarioService.getUsuarioLogado();

        var pets = usuarioLogado.empresa_id() == null
                ? petRepository.findAll()
                : petRepository.getPetsByEmpresa_Id(usuarioLogado.empresa_id());

        return pets.stream()
                .map(PetResponse::new)
                .toList();
    }

    public PetResponse salvarPet(PetRequest pet, Long id) {

        if (id == 0L) {
            Pet petBanco = new Pet(pet);

            petBanco.setEmpresa(usuarioService.getEmpresaLogada());
            // fk que preenche pet tutor
            petBanco.setTutor(buscarTutorDaMesmaEmpresa(pet.tutorId(), petBanco.getEmpresa().getId()));
            petRepository.save(petBanco);

            return new PetResponse(petBanco);
        } else {

            Pet petBanco = petRepository.findById(id).orElse(null);
            if (petBanco != null && usuarioService.podeAcessar(empresaIdDe(petBanco))) {
                petBanco.setNome(pet.nome());
                petBanco.setRaca(pet.raca());
                petBanco.setDataNascimento(pet.dataNascimento());

                if (pet.tutorId() != null) {
                    petBanco.setTutor(buscarTutorDaMesmaEmpresa(pet.tutorId(), empresaIdDe(petBanco)));
                }

                petRepository.save(petBanco);

                return new PetResponse(petBanco);
            }
        }

        return null;
    }

    public PetResponse buscarPetPorId(Long id) {

        var pet = petRepository.findById(id).orElse(null);

        // não vai retornar pet de outra empresa
        if (pet == null || !usuarioService.podeAcessar(empresaIdDe(pet)))
            return null;

            return new PetResponse(pet);

    }

    public boolean atualizarStatus(EnumStatusPet statusPet, Long id) {

        Pet petBanco = petRepository.findById(id).orElse(null);

        // só muda status de pet da própria empresa
        if (petBanco != null && usuarioService.podeAcessar(empresaIdDe(petBanco))) {
            petBanco.setStatusPet(statusPet);
            petRepository.save(petBanco);
            return true;

        }

        return false;
    }

    private Long empresaIdDe(Pet pet) {
        return pet.getEmpresa() != null ? pet.getEmpresa().getId() : null;
    }

    // fk = tutor precisa existir e ser da mesma empresa do pet
    // para não misturar dados entre empresas
    private Tutor buscarTutorDaMesmaEmpresa(Long tutorId, Long empresaId) {
        if (tutorId == null) {
            throw new IllegalArgumentException("Informe o tutor do pet!");
        }
        Tutor tutor = tutorRepository.findById(tutorId)
                .orElseThrow(() -> new IllegalArgumentException("Tutor não encontrado!"));
        Long empresaDoTutor = tutor.getEmpresa() != null ? tutor.getEmpresa().getId() : null;
        if (empresaDoTutor == null || !empresaDoTutor.equals(empresaId)) {
            throw new IllegalArgumentException("Tutor não encontrado!");
        }
        return tutor;
    }

}
