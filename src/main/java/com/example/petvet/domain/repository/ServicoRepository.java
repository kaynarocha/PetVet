package com.example.petvet.domain.repository;

import com.example.petvet.domain.entities.Servico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicoRepository extends JpaRepository<Servico, Long> {

    List<Servico> getServicosByEmpresa_Id(Long empresa);

}