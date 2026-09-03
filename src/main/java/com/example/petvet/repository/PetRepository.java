package com.example.petvet.repository;

import com.example.petvet.entities.EnumStatusPet;
import com.example.petvet.entities.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {


}
