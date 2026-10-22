package com.example.petvet.domain.repository;

import com.example.petvet.domain.entities.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
// Long é o tipo do id da tabela
public interface TokenRepository extends JpaRepository<Token, Long> {
}
