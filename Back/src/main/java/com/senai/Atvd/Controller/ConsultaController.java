package com.senai.Atvd.Controller;

import com.senai.Atvd.DTO.ConsultaDTO;
import com.senai.Atvd.Entity.Consulta;
import com.senai.Atvd.Entity.Medico;
import com.senai.Atvd.Entity.Paciente;
import com.senai.Atvd.Repository.ConsultaRepository;
import com.senai.Atvd.Repository.MedicoRepository;
import com.senai.Atvd.Repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consultas")
public class ConsultaController {

    @Autowired
    private ConsultaRepository consultaRepository;

    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @PostMapping
    public ResponseEntity<Consulta> createConsulta(@RequestBody ConsultaDTO consultaDTO) {
        // Verifica se o médico existe
        Medico medico = medicoRepository.findById(consultaDTO.getMedicoId())
                .orElseThrow(() -> new RuntimeException("Médico com ID " + consultaDTO.getMedicoId() + " não encontrado"));

        // Verifica se o paciente existe
        Paciente paciente = pacienteRepository.findById(consultaDTO.getPacienteId())
                .orElseThrow(() -> new RuntimeException("Paciente com ID " + consultaDTO.getPacienteId() + " não encontrado"));

        // Cria a entidade Consulta
        Consulta consulta = new Consulta();
        consulta.setMedico(medico);
        consulta.setPaciente(paciente);
        consulta.setDataHora(consultaDTO.getDataHora());


        // Salva a consulta no banco de dados
        Consulta savedConsulta = consultaRepository.save(consulta);

        return new ResponseEntity<>(savedConsulta, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Consulta>> getAllConsultas() {
        List<Consulta> consultas = consultaRepository.findAll();
        return new ResponseEntity<>(consultas, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConsultaById(@PathVariable Long id) {
        if (consultaRepository.existsById(id)) {
            consultaRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}