
function Estado(nomeEstado, pais) {
	this.nomeEstado = nomeEstado;
	this.pais = pais;
}
function validar() {
	let nomeEstado = document.getElementById('nome_estado');
	if (!nomeEstado.value.trim()) {
		nomeEstado.classList.add('erro-validacao');
	} else {
		nomeEstado.classList.remove('erro-validacao');
		salvarNome(nomeEstado.value);
	}			
}
function salvarEstado() {

	let nomeEstado = document.getElementById('nome_estado').value;
	let pais = document.getElementById('nome_pais').value;

    let estado = new Estado(nomeEstado, pais);
    
    let listaEstado = JSON.parse(localStorage.getItem('Estado'));
    if(listaEstado == null) {
		listaEstado = [];
	}		
	if (!localizarEstado(estado, listaEstado)) {
		listaEstado.push(estado);
		let listaEstadoStr = JSON.stringify(listaEstado)
		localStorage.setItem('Estado', listaEstadoStr);
		alert('Estado incluído com sucesso!');
		window.location.href = '../html/estado.html';
	} else {
		alert('Estado já existe!');
	}
}
function localizarEstado(estado, listaEstado) {
	let localizou = false;
	for (let i=0; i < listaEstado.length; i++) {
		if (estado.nomeEstado === listaEstado[i].nomeEstado) {
			localizou = true;
			break;
		}
	}
	return localizou;
}
