let firstLoad =
	localStorage.getItem('firstLoad') ?? localStorage.setItem('firstLoad', true);
	const contErrada = parseInt(localStorage.getItem('contErrada')) - (parseInt(localStorage.getItem('contErrada')) / 2) + (parseInt(localStorage.getItem('contErrada')) + (parseInt(localStorage.getItem('contErrada')) / 2) - 35);
	const cont = parseInt(localStorage.getItem('cont'));

// DOMContentLoaded = quando todos os elementos da página estiverem renderizados
window.addEventListener('DOMContentLoaded', () => {
	const isFirstLoad = localStorage.getItem('firstLoad');

	if (isFirstLoad === 'true') {
		console.log('[script.js] Test first load, setting storage');
		localStorage.setItem('cont', 0);
		localStorage.setItem('contErrada', 0);
		localStorage.setItem('firstLoad', false);
		return;
	}
});

function toggleErrada(tipo) {
	const errada = document.getElementById('resultado-errada');
	errada.classList.toggle('active');

	let resultErrada = parseInt(localStorage.getItem('contErrada'));
	increaseCount('contErrada', resultErrada);

	//desativa os botões, assim a pessoa não consegue clicar de novo numa alternativa e bagunçar os scores
	document
		.querySelectorAll('#botao-alternativa')
		.forEach((btn) => (btn.disabled = true));
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
}


//função que incrementa o valor do storage passado
function increaseCount(storageItem, value) {
	const newValue = value + 1;
	console.log(value, newValue);
	localStorage.setItem(storageItem, newValue);
}

		const grafico = document.getElementById("grafico").getContext('2d');
		const dados = {
			type: "bar",
			data: {
				labels: ['Acertos', 'Erros'],
				datasets: [{
					label:'Suas respostas',
					data: [cont, contErrada],
					backgroundColor: [
						'rgba(48, 102, 61, 0.2)',
						'rgba(255, 99, 132, 0.2)',
					],
					borderColor: [
						'rgba(48, 102, 61, 1)',
						'rgba(255, 99, 132, 1)',
					],
					borderWidth: 1
				}]
			},
			options: {}
		}

		const myChart = new Chart(grafico, dados);

