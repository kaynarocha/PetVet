package com.example.petvet.domain.valueobject;

public class EMAIL {

    private final String email;

    public EMAIL(String email) {
        if (!emailValido(email)) {
            throw new IllegalArgumentException("E-mail Inválido!");
        }
        this.email = email.trim().toLowerCase();
    }

    public static boolean emailValido(String email) {
        return email != null && email.trim().matches("^[\\w.%+-]+@[\\w-]+(\\.[\\w-]+)*\\.[A-Za-z]{2,}$");
    }

    public String getEmail() {
        return email;
    }

    @Override
    public boolean equals(Object o) {
        return o instanceof EMAIL outro && email.equals(outro.email);
    }

    @Override
    public int hashCode() {
        return email.hashCode();
    }

    @Override
    public String toString() {
        return email;
    }
}