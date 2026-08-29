package com.example.petvet.repository;

import com.example.petvet.entities.EnumStatusUsuario;
import com.example.petvet.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

//tipo = usuario | id = long
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    boolean existsUsuarioByEmailAndSenha(String email, String senha);
    Optional<List<Usuario>> findByStatusNot(EnumStatusUsuario status);


}
