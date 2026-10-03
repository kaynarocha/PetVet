package com.example.petvet.domain.repository;

import com.example.petvet.domain.entities.EnumStatusUsuario;
import com.example.petvet.domain.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

//tipo = usuario | id = long
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    boolean existsUsuarioByEmailAndSenha(String email, String senha);
    Optional<List<Usuario>> findByStatusNot(EnumStatusUsuario status);


}
