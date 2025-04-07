package com.senai.Atvd.DTO;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ConsultaDTO {
    private Long medicoId;       // ID do médico
    private Long pacienteId;     // ID do paciente
    private LocalDateTime dataHora; // Data e hora da consulta
}