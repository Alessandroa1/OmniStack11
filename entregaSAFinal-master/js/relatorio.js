crudClientes.setTabelaClientes(JSON.parse(localStorage.getItem('Cliente')));
crudClientes.criarTabela();

function cont(){
    var conteudo = document.getElementById('container').innerHTML;
    tela_impressao = window.open('about:blank');
    tela_impressao.document.write(conteudo);
    tela_impressao.window.print();
    tela_impressao.window.close();
}