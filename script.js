let firstLoad =
	localStorage.getItem('firstLoad') ?? localStorage.setItem('firstLoad', true);
const contErrada =
	parseInt(localStorage.getItem('contErrada')) +
	(35 -
		(parseInt(localStorage.getItem('cont')) +
			parseInt(localStorage.getItem('contErrada'))));
const cont = parseInt(localStorage.getItem('cont'));
const total =
	parseInt(localStorage.getItem('cont')) +
	(parseInt(localStorage.getItem('contErrada')) -
		parseInt(localStorage.getItem('contErrada')) / 2);

// DOMContentLoaded = quando todos os elementos da página estiverem renderizados
window.addEventListener('DOMContentLoaded', () => {
	const isFirstLoad = localStorage.getItem('firstLoad');
  const currentQuestionRef = localStorage.getItem('ref')
  
  if(document.location.href !== currentQuestionRef) {
    localStorage.setItem('answered', false)
  }

	if (isFirstLoad === 'true') {
		console.log('[script.js] Test first load, setting storage');
		localStorage.setItem('cont', 0);
		localStorage.setItem('contErrada', 0);
		localStorage.setItem('firstLoad', false);
		localStorage.setItem('answered', false);
		return;
	}

	if (isFirstLoad === 'false') {
		if (localStorage.getItem('answered') === 'true') {
			document
				.querySelectorAll('#botao-alternativa')
				.forEach((btn) => (btn.disabled = true));
		}
	}
});

function toggleErrada(tipo) {
	const errada = document.getElementById('resultado-errada');
	errada.classList.toggle('active');

	if (tipo == 'fechar') {
		let resultErrada = parseInt(localStorage.getItem('contErrada'));
		increaseCount('contErrada', resultErrada);
	}

	//desativa os botões, assim a pessoa não consegue clicar de novo numa alternativa e bagunçar os scores
	document
		.querySelectorAll('#botao-alternativa')
		.forEach((btn) => (btn.disabled = true));

	localStorage.setItem('answered', true);
  
  localStorage.setItem('ref',document.location.href);
}

function toggleCerta(tipo) {
	const certa = document.getElementById('resultado-certa');
	certa.classList.toggle('active');

	if (tipo == 'abrir') {
		let result = parseInt(localStorage.getItem('cont'));
		increaseCount('cont', result);
	}

	document
		.querySelectorAll('#botao-alternativa')
		.forEach((btn) => (btn.disabled = true));

	localStorage.setItem('answered', true);
  localStorage.setItem('ref', document.location.href);
}

//função que incrementa o valor do storage passado
function increaseCount(storageItem, value) {
	const newValue = value + 1;
	console.log(value, newValue);
	localStorage.setItem(storageItem, newValue);
}

const grafico = document.getElementById('grafico').getContext('2d');
const dados = {
	type: 'bar',
	data: {
		labels: ['Acertos', 'Erros'],
		datasets: [
			{
				label: 'Suas respostas',
				data: [cont, contErrada],
				backgroundColor: ['rgba(48, 102, 61, 0.2)', 'rgba(255, 99, 132, 0.2)'],
				borderColor: ['rgba(48, 102, 61, 1)', 'rgba(255, 99, 132, 1)'],
				borderWidth: 1
			}
		]
	},
	options: {}
};

const myChart = new Chart(grafico, dados);
