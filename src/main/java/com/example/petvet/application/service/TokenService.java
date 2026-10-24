package com.example.petvet.application.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.petvet.application.DTOs.LoginRequest;
import com.example.petvet.application.DTOs.UsuarioLogado;
import com.example.petvet.domain.entities.Token;
import com.example.petvet.domain.repository.TokenRepository;
import com.example.petvet.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.security.auth.Subject;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Value("${spring.secretkey}")
    private String secret;

    @Value("${spring.tempo_expiracao}")
    private Long tempo;

    private String emissor = "DEVTEST";

    public String gerarToken(LoginRequest loginRequestDto) {

            Algorithm algorithm = Algorithm.HMAC256(secret);

            var usuario = usuarioRepository.findAll()
                    .stream().filter( u-> u.getEmail().equals(loginRequestDto.email()))
                    .findFirst().orElse(null);

            String token = JWT.create()
                    .withIssuer(emissor)
                    .withSubject(loginRequestDto.email())
                    .withExpiresAt(this.gerarDataExpiration())
                    .sign(algorithm);

            tokenRepository.save(new Token(token, usuario));

            return token;

        }


        public UsuarioLogado verificarToken(String token) throws JWTVerificationException {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            JWTVerifier verificador = JWT.require(algorithm).withIssuer(emissor).build();

            verificador.verify(token);

            var tokenBanco = tokenRepository.findTokenByToken(token).orElse(null);

            if (tokenBanco == null) {
                throw new IllegalArgumentException("Token inválido!");
            }

            return new UsuarioLogado(tokenBanco.getUsuario());

        }

        private Instant gerarDataExpiration() {

            // pegar data atual
            var dataAtual = LocalDateTime.now();
            //adicionar ou diminuir tempo da data atual
            dataAtual = dataAtual.plusMinutes(tempo);

            return dataAtual.toInstant(ZoneOffset.of("-03:00"));
    }

}
