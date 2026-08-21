package com.example.petvet.repository;

import com.example.petvet.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//tipo = usuario | id = long
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {


}
