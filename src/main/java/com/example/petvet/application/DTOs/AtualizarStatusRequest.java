package com.example.petvet.application.DTOs;

import com.example.petvet.domain.entities.*;

public record AtualizarStatusRequest(EnumStatusUsuario status,
                                     EnumStatusTutor statusTutor,
                                     EnumStatusPet statusPet,
                                     EnumStatusAgendamento statusAgendamento,
                                     EnumStatusServico statusServico) {

}
