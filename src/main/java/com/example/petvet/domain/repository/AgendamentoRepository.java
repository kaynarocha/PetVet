package com.example.petvet.domain.repository;

import com.example.petvet.domain.entities.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    List<Agendamento> getAgendamentosByEmpresa_Id(Long empresa);

}
