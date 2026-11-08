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

    @Autowired
    private UsuarioService usuarioService;

    public List<EmpresaResponse> listarTodosEmpresasTable() {

        var usuarioLogado = usuarioService.getUsuarioLogado();

        // Usuário de empresa só enxerga a própria empresa; admin geral enxerga todas.
        var empresas = usuarioLogado.empresa_id() == null
                ? empresaRepository.findAll()
                : empresaRepository.findById(usuarioLogado.empresa_id()).stream().toList();

        return empresas.stream()
                .map(EmpresaResponse::new)
                .toList();
    }

    public EmpresaResponse salvarEmpresa(EmpresaRequest empresa, Long id) {

        //Nova Empresa
        if(id == 0L) {
            // só admin geral cadastra empresa
            // Somente o admin geral (sem empresa) cadastra novas empresas.
            if (usuarioService.getUsuarioLogado().empresa_id() != null) {
                throw new IllegalArgumentException("Sem permissão para cadastrar empresas!");
            }
            Empresa empresaBanco = new Empresa(empresa);
            empresaRepository.save(empresaBanco);

            return new EmpresaResponse(empresaBanco);
        }else {
            //Empresa existente
            Empresa empresaBanco = empresaRepository.findById(id).orElse(null);
            if(empresaBanco!= null && usuarioService.podeAcessar(empresaBanco.getId())){
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
        if (empresa == null || !usuarioService.podeAcessar(empresa.getId())) {
            return null;
        }

        return new EmpresaResponse(empresa);
    }

    public boolean atualizarStatus(EnumStatusEmpresa statusEmpresa, Long id) {

        // bloquear/excluir empresa: só admin geral
        if (usuarioService.getUsuarioLogado().empresa_id() != null) {
            return false;
        }

        Empresa empresaBanco = empresaRepository.findById(id).orElse(null);
        if(empresaBanco!= null ){
            empresaBanco.setStatusEmpresa(statusEmpresa);
            empresaRepository.save(empresaBanco);
            return  true;
        }
        return false;
    }
}