package com.example.petvet.service;

import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.security.auth.Subject;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${spring.secret}")
    private String secret;

    @Value("${spring.expiracao}")
    private long expiracao;

    @Value("${spring.emissor}")
    private String emissor;

    public String gerarToken(String subject) {

        try{

            Algorithm algorithm = Algorithm.HMAC256(secret);

            String token = com.auth0.jwt.JWT.create()
                    .withIssuer(emissor)
                    .withSubject(subject)
                    .withExpiresAt(getDataExpiration())
                    .sign(algorithm);

            return token;


        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }

        }

        private Instant getDataExpiration() {

            // pegar data atual
            var dataAtual = LocalDateTime.now();
            //adicionar ou diminuir tempo da data atual
            var dataFutura = dataAtual.plusMinutes(expiracao);

            return dataFutura.toInstant(ZoneOffset.of("-03:00"));
    }

}
