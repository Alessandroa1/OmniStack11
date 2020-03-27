function Cidade(nomeCidade, estado) {
    this.nomeCidade = nomeCidade;
	this.estado = estado;
	
}
function validar() {
    let nomeCidade = document.getElementById('nome_cidade');
	if (!nomeCidade.value.trim()) {
        nomeCidade.classList.add('erro-validacao');
	} else {
        nomeCidade.classList.remove('erro-validacao');
		salvarCidade(nomeCidade.value);
	}			
}
function carregarDadosEstado() {
    let estadosStr = localStorage.getItem('Estado');
    let estados = [];
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
function salvarCidade() {
	
	let nome = document.getElementById('nome_cidade').value;
    let estado = document.getElementById('comboEstado').value;
    
    let cidade = new Cidade(nome, estado)
    
    let listaCidade = JSON.parse(localStorage.getItem('Cidade'));
    if(listaCidade == null) {
        listaCidade = [];
    }	
    if (!localizarCidade(cidade, listaCidade)) {
        listaCidade.push(cidade);
        let listaCidadeStr = JSON.stringify(listaCidade)
        localStorage.setItem('Cidade', listaCidadeStr);
        alert('Cidade incluída com sucesso!');
        window.location.href = '../html/cidade.html';
    } else {
        alert('Cidade já existe!');
    }
    
}
function localizarCidade(cidade, listaCidade) {
	let localizou = false;
	for (let i=0; i < listaCidade.length; i++) {
		if (cidade.nomeCidade === listaCidade[i].nomeCidade) {
			localizou = true;
			break;
		}
	}
	return localizou;
}