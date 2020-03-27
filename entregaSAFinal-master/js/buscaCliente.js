$(document).ready(function () {
    var $campoBusca = $("#busca");
    $campoBusca.mask('000.000.000-00', {reverse: true});
});

function buscarCliente(){
    let listaCliente =JSON.parse(localStorage.getItem('Cliente'));
    if (listaCliente == null) {
        listaCliente = [];       
    }
    let retorno = localizarCliente(listaCliente);
    if (!retorno) {
        alert('Cliente não encontrado');    
    }else{
        let localizar =[];
        localizar.push(retorno);

        crudClientes.setTabelaClientes(localizar);
        crudClientes.criarTabela();
    
    }
}
function localizarCliente(listaCliente) {
    let pesquisa= document.getElementById('busca').value;
    let localizou=undefined;
    for (let i = 0; i < listaCliente.length; i++) {
        if (pesquisa===listaCliente[i].cpf){
            localizou=listaCliente[i];            
            break;
        }
    }
    return localizou;
}