package com.example.petvet.domain.entities;

import com.example.petvet.application.DTOs.EmpresaRequest;
import com.example.petvet.application.DTOs.EnumStatusEmpresa;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String razaoSocial;

    private String cnpj;

    private String nomeFantasia;

    // muitos usuarios = empresa para usuarios
    // sempre que terminar em Many, vai ser private LIST
    //mappedBy = apontar o outro lado
    @OneToMany(mappedBy = "empresa")
    private List<Usuario> usuario;

    private String role = "ROLE_EMPRESA";

    private EnumStatusEmpresa statusEmpresa = EnumStatusEmpresa.ATIVO;

    public Empresa(EmpresaRequest empresa) {
        this.setRazaoSocial(empresa.razaoSocial());
        this.setCnpj(empresa.cnpj());
        this.setNomeFantasia(empresa.nomeFantasia());
        this.setRole("ROLE_EMPRESA");
    }
}
