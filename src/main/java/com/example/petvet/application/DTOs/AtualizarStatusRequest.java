package com.example.petvet.application.DTOs;

import com.example.petvet.domain.entities.EnumStatusAgendamento;
import com.example.petvet.domain.entities.EnumStatusPet;
import com.example.petvet.domain.entities.EnumStatusTutor;
import com.example.petvet.domain.entities.EnumStatusUsuario;

public record AtualizarStatusRequest(EnumStatusUsuario status,
                                     EnumStatusTutor statusTutor,
                                     EnumStatusPet statusPet,
                                     EnumStatusAgendamento statusAgendamento) {


}
