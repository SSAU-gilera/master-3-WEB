const { range, Observable, fromEvent } = rxjs;
const { filter, map, merge } = rxjs.operators;

// Задание 1
function isPrime(num) {
	for (let i = 2, s = Math.sqrt(num); i <= s; i++)
		if (num % i === 0) return false;
	return num > 1;
}

range(1, 100).pipe(
	filter(isPrime)
).subscribe(x => {
	const primeContainer = document.getElementById('primeNumbers');
	primeContainer.innerHTML += `${x}, `;
});

// Задание 2
const countdownContainer = document.getElementById('countdown');
const countdown$ = new Observable(subscriber => {
	let counter = 5;
	countdownContainer.innerHTML = counter;

	const intervalId = setInterval(() => {
		if (counter > 1) {
			counter--;
			countdownContainer.innerHTML = counter;
		} else {
			clearInterval(intervalId);
			subscriber.error('Ошибка');
		}
	}, 1000);
});

countdown$.subscribe({
	next(x) { },
	error(err) {
		countdownContainer.innerHTML = err;
		setTimeout(() => {
			countdownContainer.innerHTML = 'Отсчет завершен';
		}, 1000);
	}
});

// Задание 3
function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

const btn1$ = fromEvent(document.getElementById('btn1'), 'click');
const btn2$ = fromEvent(document.getElementById('btn2'), 'click');
const btn3$ = fromEvent(document.getElementById('btn3'), 'click');

btn1$.pipe(
	merge(btn2$, btn3$),
	map(() => getRandomColor())
).subscribe(color => {
	document.body.style.backgroundColor = color;
});
