package com.example.petvet.application.service;

import com.example.petvet.application.DTOs.CriarServicoRequest;
import com.example.petvet.application.DTOs.CriarServicoResponse;
import com.example.petvet.application.DTOs.ServicoResponse;
import com.example.petvet.domain.entities.Servico;
import com.example.petvet.domain.repository.ServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServicoService {


    @Autowired
    private ServicoRepository servicoRepository;

    @Autowired
    private TokenService tokenService;

    @Value("${spring.secretkey}")
    private String secret;


    public List<ServicoResponse> listarTodosServicosTable() {

        return servicoRepository.findAll()
                .stream()
                .map(ServicoResponse::new)
                .toList();
    }

    public CriarServicoResponse criarServicoAdmin(CriarServicoRequest criarServicoRequest) {

        if (!criarServicoRequest.secretKey().equals(secret)){
            return new CriarServicoResponse(0L,"Serviço salvo com sucesso!");
        }

        Servico servicoAdminSalvar = new Servico(criarServicoRequest);
        servicoRepository.save(servicoAdminSalvar);

        return new CriarServicoResponse(servicoAdminSalvar.getId(),"Serviço salvo com sucesso");
    }

}