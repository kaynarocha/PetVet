package com.example.petvet.domain.repository;

import com.example.petvet.domain.entities.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {

    List<Pet> getPetsByEmpresa_Id(Long empresa);

}
