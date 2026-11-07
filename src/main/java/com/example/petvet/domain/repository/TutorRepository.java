package com.example.petvet.domain.repository;

import com.example.petvet.domain.entities.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TutorRepository extends JpaRepository<Tutor, Long> {

    List<Tutor> getTutoresByEmpresa_Id(Long empresa);

}
