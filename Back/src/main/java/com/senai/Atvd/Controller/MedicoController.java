package com.senai.Atvd.Controller;

import com.senai.Atvd.Entity.Medico;
import com.senai.Atvd.Repository.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/medicos")
public class MedicoController {

    @Autowired
    private MedicoRepository medicoRepository;

    // Método para cadastrar um médico
    @PostMapping
    public ResponseEntity<Medico> createMedico(@RequestBody Medico medico) {
        // Verifica se já existe um médico com o mesmo CRM
        Optional<Medico> existingMedico = medicoRepository.findByCrm(medico.getCrm());

        if (existingMedico.isPresent()) {
            // Retorna um erro 409 (Conflict) se o médico já existe
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        // Caso não exista, salva o médico
        Medico savedMedico = medicoRepository.save(medico);
        return new ResponseEntity<>(savedMedico, HttpStatus.CREATED);
    }

    // Método para obter todos os médicos cadastrados
    @GetMapping
    public ResponseEntity<List<Medico>> getAllMedicos() {
        List<Medico> medicos = medicoRepository.findAll();
        return new ResponseEntity<>(medicos, HttpStatus.OK);
    }

    // Método para deletar médico por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicoById(@PathVariable Long id) {
        if (medicoRepository.existsById(id)) {
            medicoRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
