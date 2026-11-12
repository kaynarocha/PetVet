package com.example.petvet.infra.external;

import com.example.petvet.domain.interfaces.IDddExternalRepository;
import com.example.petvet.infra.dto.ApiDddResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Component
public class DddExternalRepository implements IDddExternalRepository {

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10)).build();

    private final ObjectMapper objectMapper = new ObjectMapper();

    public ApiDddResponse buscarDddPorCodigo(String ddd) {

        var url = "https://brasilapi.com.br/api/ddd/v1/" + ddd.replaceAll("[^0-9]", "");

        try {
            HttpRequest request = HttpRequest.newBuilder().uri(URI.create(url)).GET().build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                return objectMapper.readValue(response.body(), ApiDddResponse.class);
            }
            if (response.statusCode() == 404) {
                throw new RuntimeException("DDD inválido!");
            }
            throw new RuntimeException("Erro ao consultar DDD!");

        } catch (IOException | InterruptedException e) {
            throw new RuntimeException("Erro ao consultar DDD!");
        }
    }
}
