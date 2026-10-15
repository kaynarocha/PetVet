package com.example.back;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class ServicoController {

    @FXML
    private TextField txtNome;

    @FXML
    private TextField txtDescricao;

    @FXML
    private TextField txtValor;

    @FXML
    private TextField txtDuracaoMinutos;

    @FXML
    public void salvarServico(ActionEvent event) throws Exception{

        String jsonRequest = String.format("{\n" +
                        " \"nome\": \"%s\",\n" +
                        " \"descricao\": \"%s\",\n" +
                        " \"valor\": %s,\n" +
                        " \"duracaoMinutos\": %s,\n" +
                        " \"secretKey\": \"%s\"\n" +
                        "}", txtNome.getText(),
                txtDescricao.getText(),
                txtValor.getText().replace(",", "."),
                txtDuracaoMinutos.getText(),
                "sksdmsdefoi4409i9tkdfogkpog3443itd");

        int respostaApi = executaMetodoAPI("http://localhost:8080/servico/adminServico",jsonRequest,"POST");

        if(respostaApi ==200){
            showMessage(Alert.AlertType.INFORMATION,"Serviço salvo com sucesso!");
            voltar(event);

        }else {
            showMessage(Alert.AlertType.ERROR,"Erro ao salvar serviço!");
        }


    }


    @FXML
    public void voltar(ActionEvent event) throws IOException {
        FXMLLoader loader =
                new FXMLLoader(getClass().getResource("/com/example/back/menu-view.fxml"));

        Scene scene = new Scene(loader.load());
        Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
        stage.setScene(scene);

    }

    private int executaMetodoAPI(String url, String json, String protocoloHttp)
            throws Exception{

        URL urlAPI = new URL(url);
        HttpURLConnection connection = (HttpURLConnection) urlAPI.openConnection();
        connection.setRequestMethod(protocoloHttp);
        connection.setDoOutput(true);

        if (!json.isEmpty()) {
            connection.setRequestProperty("Content-Type", "application/json");

            try (OutputStream os = connection.getOutputStream()){
                os.write(json.getBytes());
            }

        }

        return connection.getResponseCode();
    }


    private void showMessage(Alert.AlertType type, String msg){
        Alert alerta =new Alert(type);
        alerta.setTitle("Mensagem do Sistema!");
        alerta.setHeaderText(null);
        alerta.setContentText(msg);
        alerta.showAndWait();
    }

}