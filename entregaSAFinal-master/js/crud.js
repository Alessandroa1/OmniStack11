var storage = new function() {

	this.getItems = function(item, chave) {
		var itemStorage = JSON.parse(localStorage.getItem(item));
		var items = [];

		for(var i = 0; i < itemStorage.length; i++) {
			items.push(itemStorage[i][chave]);
		}

		return items;
	}

	this.getCidades = function() {		
		return this.getItems('Cidade', 'nomeCidade');
	};

	this.getEstados = function() {
		return this.getItems('Estado', 'nomeEstado');		
	};

}

// crudClientes é um objeto que representa toda a aplicação de CRUD
var crudClientes = new function() {

	// Exemplo de JSON com objetos. 		
	this.tabelaClientes;

	// Array de colunas da tabela
	this.col = [];

	this.setTabelaClientes = function (tabelaClientes) {
		this.tabelaClientes = tabelaClientes;
	}

	// Função de criação da tabela dinâmica do CRUD
	this.criarTabela = function() {

		console.log(this.tabelaClientes);

		
		for (var i = 0; i < this.tabelaClientes.length; i++) {
			
			for ( var key in this.tabelaClientes[i]) {
				if (key == "data_nascimento" || key == "sexo" || key == "telefone" || key == "numero" || key== "bairro" || key=="cep" || key=="email" || key=="social" || key == "rua"  ) continue;
				if (this.col.indexOf(key) === -1) {
					this.col.push(key);
				}
			}
		}

		// Criando a tabela.
		var table = document.createElement('table');
		table.setAttribute('id', 'tabelaClientes'); 

		// CÓDIGO DO CABEÇALHO

		var tr = table.insertRow(-1); // criando a linha do cabeçalho.

		for (var h = 0; h < this.col.length; h++) {
			// Adicionando o cabeçalho
			var th = document.createElement('th');
			var colName = this.col[h];
			// replace = substituir isso por aquilo
			th.innerHTML = colName.replace('_', ' ');
			tr.appendChild(th);
		}

		if(this.col.length > 0) {
			// Adicionando as células de cabeçalho dos botões de ação
			th = document.createElement('th');
			// merge de celulas
			th.setAttribute('colspan', 2);
			th.innerHTML = 'Ações';
			// Adicionando a célula th na linha do cabeçalho
			tr.appendChild(th);
		}

		// FIM DO CÓDIGO DO CABEÇALHO

		// Adicionando as linhas usando o aray de tabelaClientes em JSON.
		for (var i = 0; i < this.tabelaClientes.length; i++) {

			tr = table.insertRow(-1); // Criando uma nova linha no final (-1).

			for (var j = 0; j < this.col.length; j++) {
				var tabCell = tr.insertCell(-1);
				var keyName = this.col[j];
				tabCell.setAttribute('data-key', keyName);
				tabCell.innerHTML = this.tabelaClientes[i][keyName];
			}

			// Criando e adicionando dinamicamente os elementos às células da
			// tabela com eventos

			this.td = document.createElement('td');

			// *** Opção Cancelar.
			tr.appendChild(this.td);
			
			var lblCancelar = document.createElement('label');
			lblCancelar.innerHTML = '✖';
			lblCancelar.setAttribute('onclick', 'crudClientes.cancelar(this)'); // Evento
																				// onlcick
			lblCancelar.setAttribute('style', 'display:none;');
			lblCancelar.setAttribute('title', 'Cancelar');
			lblCancelar.setAttribute('id', 'lbl' + i);
			this.td.appendChild(lblCancelar);

			// *** Opção Salvar
			tr.appendChild(this.td);
			var btnSalvar = document.createElement('input');

			btnSalvar.setAttribute('type', 'button');
			btnSalvar.setAttribute('value', 'Salvar');
			// Definindo ID do botão oculto
			btnSalvar.setAttribute('id', 'Salvar' + i);
			btnSalvar.setAttribute('style', 'display:none;');
			btnSalvar.setAttribute('onclick', 'crudClientes.salvar(this)'); // Evento
																			// onclick
			this.td.appendChild(btnSalvar);

			// *** Opção Editar.
			tr.appendChild(this.td);
			var btnEditar = document.createElement('input');

			btnEditar.setAttribute('type', 'button');
			btnEditar.setAttribute('value', 'Editar');
			btnEditar.setAttribute('id', 'Editar' + i);
			btnEditar.setAttribute('style', 'background-color:#44CCEB; width: 50px');
			btnEditar.setAttribute('onclick', 'crudClientes.editar(this)'); // Evento
																			// onclick.
			this.td.appendChild(btnEditar);

			// *** Opção Excluir.
			this.td = document.createElement('td');
			tr.appendChild(this.td);
			var btnExcluir = document.createElement('input');
			btnExcluir.setAttribute('type', 'button');
			btnExcluir.setAttribute('value', 'Excluir'); 
			btnExcluir.setAttribute('style', 'background-color:#ED5650; width: 50px');
			btnExcluir.setAttribute('onclick', 'crudClientes.excluir(this)'); // Evento
																				// onclick
			this.td.appendChild(btnExcluir);
		}

		var div = document.getElementById('container');
		div.innerHTML = '';
		div.appendChild(table); // adicionando a tabela à página.
	};

	// ****** Início das funções do CRUD.

	// Função Cancelar
	this.cancelar = function(btnAcao) {

		// Ocultar o botão
		btnAcao.setAttribute('style', 'display:none; float:none;');

		var linhaAtiva = btnAcao.parentNode.parentNode.rowIndex;

		// Ocultar o botão Salvar
		var btnSalvar = document.getElementById('Salvar' + (linhaAtiva - 1));
		btnSalvar.setAttribute('style', 'display:none;');

		// Mostrar botão Editar novamente
		var btnEditar = document.getElementById('Editar' + (linhaAtiva - 1));
		btnEditar.setAttribute('style',
				'display:block; margin:0 auto; background-color:#44CCEB;');

		var tab = document.getElementById('tabelaClientes').rows[linhaAtiva];

		for (i = 0; i < this.col.length; i++) {
			var td = tab.getElementsByTagName("td")[i];
			td.innerHTML = this.tabelaClientes[(linhaAtiva - 1)][this.col[i]];
		}
	};

	this.getOptions = function(key) {
		var options;
		if(key == 'cidade') {
			options = storage.getCidades();
		}
		if(key == 'estado') {
			options = storage.getEstados();
		}
		
		return options;
	};

	// Função Editar.
	this.editar = function(btnAcao) {
		console.log(this.tabelaClientes);
		var linhaAtiva = btnAcao.parentNode.parentNode.rowIndex;
		var tab = document.getElementById('tabelaClientes').rows[linhaAtiva];
		var cells = tab.cells;

		// Mostrar select com cidades e estados		
		for (var i = 0; i < cells.length-2; i++) {
			var key = cells[i].getAttribute('data-key');
			if (key == 'cidade' || key == 'estado') {
				var td = tab.getElementsByTagName("td")[i];
				var ele = document.createElement('select'); // incluir select.
				ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
				var options = this.getOptions(key);
				for (k = 0; k < options.length; k++) {
					ele.innerHTML = ele.innerHTML + '<option value="' + options[k] + '">' + options[k]+ '</option>';
				}
				td.innerText = '';
				td.appendChild(ele);
			} else {
				var td = tab.getElementsByTagName("td")[i];
				var ele = document.createElement('input');
				ele.setAttribute('type', 'text');
				ele.setAttribute('value', td.innerText);
				td.innerText = '';
				td.appendChild(ele);
			}
		}

		var lblCancelar = document.getElementById('lbl' + (linhaAtiva - 1));
		lblCancelar.setAttribute('style','cursor:pointer; display:block; width:20px; float:left; position: absolute; left: 1175px;');

		var btnSalvar = document.getElementById('Salvar' + (linhaAtiva - 1));
		btnSalvar.setAttribute('style', 'display:block; margin-left:30px; float:left; background-color:#2DBF64;');

		// Ocultar botão oculto
		btnAcao.setAttribute('style', 'display:none;');
	};

	// Função Excluir
	this.excluir = function(btnAcao) {
		var r = confirm('Tem certeza que deseja excluir esse cliente?');

		if(r == true) {
			var linhaAtiva = btnAcao.parentNode.parentNode.rowIndex;
			// Exclui a linha atual 
			// Exclui do indice linhaAtiva desconsiderando o cabeçalho (-1), um item por vez
			this.tabelaClientes.splice((linhaAtiva-1), 1);
			
			// Altera o local storage com a nova lista
			localStorage.setItem('Cliente', JSON.stringify(this.tabelaClientes));			
			this.criarTabela(); // Recria a tabela			
		}
	
	};

	// Função Salvar
	this.salvar = function(btnAcao) {
		var linhaAtiva = btnAcao.parentNode.parentNode.rowIndex;
		var tab = document.getElementById('tabelaClientes').rows[linhaAtiva];
		var cells = tab.cells;

		// Atualizar o array tabelaClientes
		for (i = 0; i < cells.length - 2; i++) {
			var td = cells[i];
			var key = cells[i].getAttribute('data-key');
			if (td.childNodes[0].getAttribute('type') == 'text'
					|| td.childNodes[0].tagName == 'SELECT') { // verifica se o
																// elemento é um
																// select ou um
																// input
				this.tabelaClientes[(linhaAtiva - 1)][key] = td.childNodes[0].value;// Salva o valor
			}
		}
		// Altera o local storage com a nova lista
		localStorage.setItem('Cliente', JSON.stringify(this.tabelaClientes));	
		this.criarTabela(); // Recria a tabela
	};

	// ****** Fim das funções do CRUD	
}