function Cliente(estado, cidade, nome, cpf, data, sexo, telefone, rua, numero, bairro, cep, email, social) {
    this.estado= estado
    this.cidade = cidade
    this.nome = nome
    this.cpf = cpf   
    this.data= data
    this.sexo=sexo    
    this.telefone = telefone
    this.rua = rua
    this.numero = numero    
    this.bairro = bairro
    this.cep = cep
    this.email = email
    this.social = social
}
function validar() {
    let cpf = document.getElementById("cpf");
	if (!cpf.value.trim()) {
        cpf.classList.add('erro-validacao');
	} else {
        cpf.classList.remove('erro-validacao');
		salvarCliente(cpf.value);
	}			
}

function carregarDadosEstado() {
    let estadosStr = localStorage.getItem('Estado');
    let estados= [];
    if (estadosStr != null) {
        estados = JSON.parse(estadosStr);
    }
    let comboEstado = document.getElementById("comboEstado");
    let option;

    for (let index = 0; index < estados.length; index++) {
        option = document.createElement("option");
        option.text = estados[index].nomeEstado;
        option.value = estados[index].nomeEstado;
        comboEstado.add(option);
    }

}
function carregarDadosCidade() {
    let estadoSelecionado = document.getElementById('comboEstado').value;

    let cidadeStr = localStorage.getItem('Cidade');
    let cidades = [];
    if (cidadeStr != null) {
        cidades = JSON.parse(cidadeStr);
    }

    let comboCidade = document.getElementById("comboCidade");
    let option;

    for (var i = comboCidade.length - 1; i >= 0; --i) {
        comboCidade.remove(i);
        
      }

    for (let index = 0; index < cidades.length; index++) {
        option = document.createElement("option");
        option.text = cidades[index].nomeCidade;
        option.value = cidades[index].nomeCidade;
        if (estadoSelecionado == cidades[index].estado){
            comboCidade.add(option)
        }
    }

}
function salvarCliente() {
    
    let estado = document.getElementById('comboEstado').value;

    let cidade = document.getElementById('comboCidade').value;
    
    let nome = document.getElementById('nome').value;
      
    let cpf = document.getElementById('cpf').value;      
    
    let data = document.getElementById('data_nascimento').value;

    let sexo = document.getElementById('genero').value;   

    let telefone = document.getElementById('telefone').value;

    let rua = document.getElementById('rua').value;

    let numero = document.getElementById('numero').value;
   
    let bairro = document.getElementById('bairro').value;

    let cep = document.getElementById('cep').value;

    let email = document.getElementById('email').value;

    let social = document.getElementById('social').value;

    let cliente = new Cliente(estado, cidade, nome, cpf,  data, sexo, telefone, rua, numero, bairro, cep, email, social);
   
    let listaCliente = JSON.parse(localStorage.getItem('Cliente'));
    if(listaCliente == null) {
        listaCliente = [];
    }
    if (!localizarCliente(cliente, listaCliente)) {
        listaCliente.push(cliente);
        let listaClienteStr = JSON.stringify(listaCliente)
        localStorage.setItem('Cliente', listaClienteStr);
        
        alert('Cliente incluído com sucesso!');
        window.location.href = '../html/cliente.html';
       
    } else {
        alert('Cliente já existe!');
    }
}
function localizarCliente(cliente, listaCliente) {
	let localizou = false;
	for (let i=0; i < listaCliente.length; i++) {
		if (cliente.cpf === listaCliente[i].cpf) {
			localizou = true;
			break;
		}
	}
	return localizou;
}

function TestaCPF(strCPF) {
    strCPF = strCPF.replace('.', '').replace('.', '').replace('-', '');
    var soma;
    var resto;
    soma = 0;
    if (strCPF.length != 11 ){
        alert('O CPF precisa conter 11 caractéres!');
    }else{
        if (strCPF == "00000000000"){
            alert('cpf invalido');
            return false;
        }else{

            for (i=1; i<=9; i++){
                soma = soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
            }
            resto = (soma * 10) % 11;
        
            if ((resto == 10) || (resto == 11)){
                resto = 0;
            }
            
            if (resto != parseInt(strCPF.substring(9, 10)) ){
                alert('cpf invalido');
                return false;
            }else{

                soma = 0;
                for (i = 1; i <= 10; i++){
                    soma = soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
                }
                resto = (soma * 10) % 11;
            
                if ((resto == 10) || (resto == 11)){
                    resto = 0;
                }
                if (resto != parseInt(strCPF.substring(10, 11) ) ){
                    alert('cpf invalido');
                    return false;
                }else{
                    return true;
                }
            }
        }
    }
  
}

$(document).ready(function () { 
    var $campoCpf= $("#cpf");
    $campoCpf.mask('000.000.000-00', {reverse: true});    
    var $campoData = $("#data_nascimento");
    $campoData.mask('00/00/0000', {reverse: true});
    var $campoCep = $("#cep");
    $campoCep.mask('00000-000', {reverse: true});
    var $campoTelefone = $("#telefone");
    $campoTelefone.mask('000-00000-0000', {reverse: true});                          
});
