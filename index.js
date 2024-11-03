import express, { response } from "express";

const host = "0.0.0.0";
const port = 3000;
const app = express();

//Configurar a nossa aplicação para receber os dados do formulário.
//Você pode escolher entre duas bibliotecas: QS ou QueryString
app.use(express.urlencoded({ extended: true }));

var listaAlunos = [];//Variavel lista para armazenar os alunos

//Implementara funcionalidadde para entregar um formulário html
function cadastroAluno(req, res) {
    res.send(`
    <html>
   <head>
   <meta charset="UTF-8">
       <title>Cadastro de Aluno</title>
       <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
   </head>
    <body>
    <form method="POST" action="/cadastro">
     <div class="form-row">
    <div class="form-group col-md-3">
      <label for="Nome Completo">Nome Completo</label>
      <input type="text" class="form-control" name="nome" id="Nome" placeholder="Digite Seu Nome Completo">
    </div>
  <div class="form-row">
    <div class="form-group col-md-3">
      <label for="inputEmail4">Email</label>
      <input type="email" class="form-control" name="email" id="email" placeholder="Digite o seu melhor Email">
    </div>
    <div class="form-group col-md-3">
      <label for="inputPassword4">Senha</label>
      <input type="password" class="form-control" name="senha" id="senha" placeholder="Digite sua Senha">
    </div>
  </div>
  <div class="form-group col-md-3">
    <label for="inputAddress">Endereço</label>
    <input type="text" class="form-control" name="endereco" id="endereco" placeholder="Digite seu endereço contendo o número">
  </div>
  
  <div class="form-row">
    <div class="form-group col-md-3">
      <label for="inputCity">Cidade</label>
      <input type="text" class="form-control" name="cidade" id="cidade" placeholder="Digite sua Cidade">
    </div>
    <div class="form-group col-md-3">
      <label for="inputCEP">CEP</label>
      <input type="text" class="form-control" name="cep" id="cep" placeholder="Digite o CEP">
    </div>
    <br>
  </div>
  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck">
      <label class="form-check-label" for="gridCheck">
        Concordo com os termos de uso deste formulário.
      </label>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Enviar</button>
</form>
       </body>
       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
   </html>
   `);
}


function menu(req, res) {
    res.send(`
    <html>
    <head>
    <meta charset="UTF-8">
        <title>Menu de Opções</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    </head>
    <body>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
  <div class="collapse navbar-collapse" id="navbarNav">
    <a class="navbar-brand" href="#">Menu</a>
        <div class="navbar-nav">
          <a class="nav-link active" aria-current="page" href="/cadastro">Cadastrar Aluno</a>
    `);
}


function cadastrarAluno(req, res) {
    //Puxar os dados do formulário enviados.
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const endereco = req.body.endereco;
    const cidade = req.body.cidade;
    const cep = req.body.cep;
    const concordar = req.body.concordar;

    const aluno = { nome, email, senha, endereco, cidade, cep, concordar };
    //Adicionar o aluno na lista
    listaAlunos.push(aluno);

    //Mostrar a lista de alunos já cadastrados
    res.write(`
    <html>
    <head>
    <meta charset="UTF-8">
        <title>lista de alunos </title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    </head>
    <body>
    <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">Nome</th>
        <th scope="col">Email</th>
        <th scope="col">Endereço</th>
        <th scope="col">Cidade</th>
        <th scope="col">CEP</th>
      </tr>
    </thead>
    <tbody>
    `);
    //Adicionar as linhas da tabela
    //para cada aluno,devemos criar uma linha de tabela.
    for (var i = 0; i < listaAlunos.length; i++) {
        res.write(`<tr>
            <td> ${listaAlunos[i].nome} </td>
            <td> ${listaAlunos[i].email}</td>
            <td> ${listaAlunos[i].endereco}</td>
            <td> ${listaAlunos[i].cidade}</td>
            <td> ${listaAlunos[i].cep} </td>
            </tr>
            `);
    }


    res.write(`</tbody>
    </table>
    <button type="button" class="btn btn-primary" onclick="window.location.href='/'">Voltar ao Menu </button>
    <button type="button" class="btn btn-primary" onclick="window.location.href='/cadastro'">Cadastrar Novo Aluno </button>
    </body>
       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    </html> `);
    res.end();

    
};




app.get("/cadastro", cadastroAluno);
app.get("/", menu);
//A novidade é o metodo post, ele faz o envio dos dados,adiciona novas informações.
app.post("/cadastro", cadastrarAluno);





    app.listen(port, host, () => {
        console.log("Servidor em execucao http://" + host + ":" + port);
    });
