package com.example.petvet.repository;

import com.example.petvet.entities.Agendamento;
import com.example.petvet.entities.EnumStatusAgendamento;
import com.example.petvet.entities.EnumStatusUsuario;
import com.example.petvet.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

}
