package com.example.petvet.application.service;

import com.example.petvet.application.DTOs.*;
import com.example.petvet.application.DTOs.EnumStatusUsuario;
import com.example.petvet.domain.entities.Empresa;
import com.example.petvet.domain.entities.Especialidade;
import com.example.petvet.domain.entities.Usuario;
import com.example.petvet.domain.repository.EmpresaRepository;
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

    @Autowired
    private EmpresaRepository empresaRepository;

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

    // Admin geral não tem empresa (empresa_id == null) e enxerga tudo.
    // Usuário de empresa só acessa registros da própria empresa.
    public boolean podeAcessar(Long empresaId) {
        var empresaLogadaId = getUsuarioLogado().empresa_id();
        return empresaLogadaId == null || empresaLogadaId.equals(empresaId);
    }

    // empresa do usuário logado (para novos registros)
    public Empresa getEmpresaLogada() {
        var empresaLogadaId = getUsuarioLogado().empresa_id();
        if (empresaLogadaId == null) {
            throw new IllegalArgumentException("Usuário sem empresa não pode cadastrar este registro!");
        }
        return empresaRepository.findById(empresaLogadaId)
                .orElseThrow(() -> new IllegalArgumentException("Empresa não encontrada!"));
    }

    public UsuarioResponse salvarUsuario(UsuarioRequest usuario, Long id) {

        var usuarioLogado = getUsuarioLogado();

        if (id == 0L) {
            Usuario usuarioBanco = new Usuario(usuario);

            // novo usuário recebe uma empresa
            // admin geral deve informar a empresa do novo usuário
            Long empresaId = usuarioLogado.empresa_id() != null ? usuarioLogado.empresa_id() : usuario.empresaId();
            if (empresaId == null) {
                throw new IllegalArgumentException("Informe a empresa do usuário!");
            }
            usuarioBanco.setEmpresa(empresaRepository.findById(empresaId)
                    .orElseThrow(() -> new IllegalArgumentException("Empresa não encontrada!")));

            usuarioRepository.save(usuarioBanco);

            return new UsuarioResponse(usuarioBanco);

        } else {

            Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);

            //não retorna usuário de outra empresa
            if (usuarioBanco != null && podeAcessar(empresaIdDe(usuarioBanco))) {
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

        //não retorna usuário de outra empresa
        if (usuario == null || !podeAcessar(empresaIdDe(usuario))) {
            return null;
        }

        return new UsuarioResponse(usuario);
    }

    public boolean atualizarStatus(EnumStatusUsuario status, Long id) {

        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
        // só altera status de usuário da mesma empresa
        if (usuarioBanco!= null && podeAcessar(empresaIdDe(usuarioBanco))) {
            usuarioBanco.setStatus(status);
            usuarioRepository.save(usuarioBanco);
            return true;
        }

        return false;
    }

    public boolean atribuirEspecialidade(Long id, AtribuirEspecialidadeRequest atribuirEspecialidadeRequest) {

        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
        Especialidade especialidadeBanco = especialidadeRepository.findById(atribuirEspecialidadeRequest.especialidade_id()).orElse(null);

        //só atribui especialidade a usuário da mesma empresa
        if (usuarioBanco != null && especialidadeBanco != null && podeAcessar(empresaIdDe(usuarioBanco))) {

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

    public UsuarioResponse BuscarUsuarioLogado() {
        try {
            var usuarioLogado = getUsuarioLogado();
            return usuarioRepository.findById(usuarioLogado.id())
                    .stream()
                    .map(UsuarioResponse::new).findFirst().orElse(null);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar usuário logado");
        }
    }

    // novo método para multiempresas
    private Long empresaIdDe(Usuario usuario) {
        return usuario.getEmpresa() != null ? usuario.getEmpresa().getId() : null;
    }
}
