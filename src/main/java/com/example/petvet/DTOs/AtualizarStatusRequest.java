package com.example.petvet.DTOs;

import com.example.petvet.entities.EnumStatusAgendamento;
import com.example.petvet.entities.EnumStatusPet;
import com.example.petvet.entities.EnumStatusTutor;
import com.example.petvet.entities.EnumStatusUsuario;

public record AtualizarStatusRequest(EnumStatusUsuario status,
                                     EnumStatusTutor statusTutor,
                                     EnumStatusPet statusPet,
                                     EnumStatusAgendamento statusAgendamento) {


}
