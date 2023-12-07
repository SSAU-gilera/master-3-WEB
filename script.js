document.addEventListener('DOMContentLoaded', function () {
	const startButton = document.getElementById('startButton');

	startButton.addEventListener('click', startGame);

	function startGame() {
		let randomNumber = Math.floor(Math.random() * 1000) + 1;
		let attempts = 0;

		while (true) {
			let userGuess = prompt('Введите число:');

			if (userGuess === null) {
				alert(`Игра окончена. Количество попыток: ${attempts}`);
				break;
			} else if (userGuess === '' || isNaN(userGuess)) {
				alert('Введите число!');
			} else {
				userGuess = parseInt(userGuess);
				attempts++;

				if (userGuess < randomNumber) {
					alert('Искомое число больше!');
				} else if (userGuess > randomNumber) {
					alert('Искомое число меньше!');
				} else {
					const playAgain = confirm(`Поздравляем! Вы угадали число. Количество попыток: ${attempts}. Начать заново?`);
					if (playAgain) {
						randomNumber = Math.floor(Math.random() * 1000) + 1;
						attempts = 0;
					} else {
						break;
					}
				}
			}
		}
	}
});
