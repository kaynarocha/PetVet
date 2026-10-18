package com.example.petvet.application.DTOs;

public record AtualizarStatusRequest(EnumStatusUsuario status,
                                     EnumStatusTutor statusTutor,
                                     EnumStatusPet statusPet,
                                     EnumStatusAgendamento statusAgendamento,
                                     EnumStatusServico statusServico) {

}
