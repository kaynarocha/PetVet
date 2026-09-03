package com.example.petvet.repository;

import com.example.petvet.entities.EnumStatusTutor;
import com.example.petvet.entities.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TutorRepository extends JpaRepository<Tutor, Long> {


}
