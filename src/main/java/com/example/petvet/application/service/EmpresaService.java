package com.example.petvet.application.service;

import com.example.petvet.application.DTOs.EmpresaRequest;
import com.example.petvet.application.DTOs.EmpresaResponse;
import com.example.petvet.application.DTOs.EnumStatusEmpresa;
import com.example.petvet.domain.entities.Empresa;
import com.example.petvet.domain.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    public List<EmpresaResponse> listarTodosEmpresasTable() {

        return empresaRepository.findAll()
                .stream()
                .map(EmpresaResponse::new)
                .toList();
    }

    public EmpresaResponse salvarEmpresa(EmpresaRequest empresa, Long id) {

        //Nova Empresa
        if(id == 0L) {
            Empresa empresaBanco = new Empresa(empresa);
            empresaRepository.save(empresaBanco);

            return new EmpresaResponse(empresaBanco);
        }else {
            //Empresa existente
            Empresa empresaBanco = empresaRepository.findById(id).orElse(null);
            if(empresaBanco!= null ){
                empresaBanco.setRazaoSocial(empresa.razaoSocial());
                empresaBanco.setCnpj(empresa.cnpj());
                empresaBanco.setNomeFantasia(empresa.nomeFantasia());
                empresaRepository.save(empresaBanco);
                return new EmpresaResponse(empresaBanco);
            }
        }
        return null;
    }

    public EmpresaResponse buscarPorId(Long id) {

        var empresa = empresaRepository.findById(id).orElse(null);
        if (empresa == null) {
            return null;
        }

        return new EmpresaResponse(empresa);
    }

    public boolean atualizarStatus(EnumStatusEmpresa statusEmpresa, Long id) {

        Empresa empresaBanco = empresaRepository.findById(id).orElse(null);
        if(empresaBanco!= null ){
            empresaBanco.setStatusEmpresa(statusEmpresa);
            empresaRepository.save(empresaBanco);
            return  true;
        }
        return false;
    }
}