package com.senai.Atvd.Repository;

import
        com.senai.Atvd.Entity.Medico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {


    Optional<Medico> findByCrm(String crm);
}

