package com.example.petvet.application.service;

import com.example.petvet.application.DTOs.*;
import com.example.petvet.application.DTOs.EnumStatusUsuario;
import com.example.petvet.domain.entities.Especialidade;
import com.example.petvet.domain.entities.Usuario;
import com.example.petvet.domain.repository.EspecialidadeRepository;
import com.example.petvet.domain.repository.UsuarioRepository;
import com.example.petvet.domain.valueobject.CPF;
import com.example.petvet.domain.valueobject.EMAIL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EspecialidadeRepository especialidadeRepository;

    //injeção de dependência
    @Autowired
    private TokenService tokenService;

    @Value("${spring.secretkey}")
    private String secret;

    public LoginResponse validarUsuarioAutenticadoRetornaToken(LoginRequest request) {

        String email = request.email() == null ? "" : request.email().trim().toLowerCase();

        if (usuarioRepository.existsUsuarioByEmail_EmailAndSenha(email, request.senha())) {
            var token = tokenService.gerarToken(request);
            return new LoginResponse(token);
        }
        return null;
    }

    public List<UsuarioResponse> listarTodosUsuariosTable() {

        var usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.empresa_id() == null) {
            return usuarioRepository.findAll()
                    .stream()
                    .map(UsuarioResponse::new)
                    .toList();
        }

        return usuarioRepository.getUsuariosByEmpresa_Id(usuarioLogado.empresa_id())
                .stream()
                .map(UsuarioResponse::new)
                .toList();
    }

    public CriarAdminResponse criarAdmin(CriarAdminRequest criarAdminRequest) {

        if (!criarAdminRequest.secretKey().equals(secret)) {
            return new CriarAdminResponse(0L, "Usuario salvo com sucesso");
        }

        Usuario usuarioAdminSalvar = new Usuario(criarAdminRequest);

        usuarioRepository.save(usuarioAdminSalvar);

        return new CriarAdminResponse(usuarioAdminSalvar.getId(), "Usuário salvo com sucesso!");
    }

    public UsuarioLogado getUsuarioLogado() {
        return (UsuarioLogado) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    }

    public UsuarioResponse salvarUsuario(UsuarioRequest usuario, Long id) {

        var usuarioLogado = getUsuarioLogado();

        if (id == 0L) {
            Usuario usuarioBanco = new Usuario(usuario);
            usuarioRepository.save(usuarioBanco);

            return new UsuarioResponse(usuarioBanco);

        } else {

            Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
            if (usuarioBanco != null) {
                usuarioBanco.setNome(usuario.nome());
                usuarioBanco.setCpf(new CPF(usuario.cpf()));
                usuarioBanco.setEmail(new EMAIL(usuario.email()));
                usuarioBanco.setSenha(usuario.senha());
                usuarioRepository.save(usuarioBanco);

                return new UsuarioResponse(usuarioBanco);
            }
        }

        return null;

    }

    public UsuarioResponse buscarPorId(Long id) {

        var usuario = usuarioRepository.findById(id).orElse(null);

        if (usuario == null)
            return null;

        return new UsuarioResponse(usuario);
    }

    public boolean atualizarStatus(EnumStatusUsuario status, Long id) {

        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
        if (usuarioBanco!= null) {
            usuarioBanco.setStatus(status);
            usuarioRepository.save(usuarioBanco);
            return true;
        }

        return false;
    }

    public boolean atribuirEspecialidade(Long id, AtribuirEspecialidadeRequest atribuirEspecialidadeRequest) {

        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
        Especialidade especialidadeBanco = especialidadeRepository.findById(atribuirEspecialidadeRequest.especialidade_id()).orElse(null);
        if (usuarioBanco != null && especialidadeBanco != null) {

            var especialidade = usuarioBanco.getEspecialidades().stream()
                    .anyMatch(u->u.getId().equals(especialidadeBanco.getId()));

            if (especialidade) {
                return true;
            } else {
                usuarioBanco.getEspecialidades().add(especialidadeBanco);

                usuarioRepository.save(usuarioBanco);

                return true;
            }
        }

        return false;

    }
}
