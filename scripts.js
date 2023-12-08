// Function to validate email
function validateEmail(email) {
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailPattern.test(email);
}

const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function (event) {
	const phoneNumber = event.target.value.replace(/\D/g, '');
	const formattedNumber = formatPhoneNumber(phoneNumber);
	event.target.value = formattedNumber;
});

function formatPhoneNumber(phoneNumber) {
	let formattedNumber = '';

	for (let i = 0; i < phoneNumber.length; i++) {
		if (i === 0) {
			formattedNumber += `+${phoneNumber[i]}`;
		} else if (i === 1) {
			formattedNumber += `(${phoneNumber[i]}`;
		} else if (i === 4) {
			formattedNumber += `)${phoneNumber[i]}`;
		} else if (i === 7) {
			formattedNumber += `-${phoneNumber[i]}`;
		} else if (i === 9) {
			formattedNumber += `-${phoneNumber[i]}`;
		} else {
			formattedNumber += phoneNumber[i];
		}
	}

	return formattedNumber;
}

function validatePhone(phone) {
	const phoneDigits = phone.replace(/\D/g, '');
	return phoneDigits === '' || phoneDigits.length === 11;
}

document.addEventListener('DOMContentLoaded', function () {
	const contactForm = document.getElementById('contactForm');

	if (localStorage.getItem('formData')) {
		const formData = JSON.parse(localStorage.getItem('formData'));
		document.getElementById('firstName').value = formData.firstName;
		document.getElementById('lastName').value = formData.lastName;
		document.getElementById('email').value = formData.email;
		document.getElementById('phone').value = formData.phone;
		document.getElementById('message').value = formData.message;

		console.log('Form data retrieved from Local Storage:');
		console.log(formData);
	} else {
		console.log('No form data found in Local Storage.');
	}

	const inputFields = document.querySelectorAll('#firstName, #lastName, #email, #phone, #message');
	inputFields.forEach(field => {
		field.addEventListener('input', function () {
			const formData = {
				firstName: document.getElementById('firstName').value.trim(),
				lastName: document.getElementById('lastName').value.trim(),
				email: document.getElementById('email').value.trim(),
				phone: document.getElementById('phone').value.trim(),
				message: document.getElementById('message').value.trim(),
			};
			localStorage.setItem('formData', JSON.stringify(formData));
		});
	});

	contactForm.addEventListener('submit', function (event) {
		event.preventDefault();

		const firstNameInput = document.getElementById('firstName');
		const lastNameInput = document.getElementById('lastName');
		const emailInput = document.getElementById('email');
		const phoneInput = document.getElementById('phone');
		const messageInput = document.getElementById('message');

		const firstName = firstNameInput.value.trim();
		const lastName = lastNameInput.value.trim();
		const email = emailInput.value.trim();
		const phone = phoneInput.value.trim();
		const message = messageInput.value.trim();

		let errorMessage = '';

		if (firstName === '') {
			errorMessage += '"Имя", ';
			firstNameInput.classList.add('error');
		} else {
			firstNameInput.classList.remove('error');
		}

		if (lastName === '') {
			errorMessage += '"Фамилия", ';
			lastNameInput.classList.add('error');
		} else {
			lastNameInput.classList.remove('error');
		}

		if (email === '' || !validateEmail(email)) {
			errorMessage += '"Email", ';
			emailInput.classList.add('error');
		} else {
			emailInput.classList.remove('error');
		}

		if (phone !== '' && !validatePhone(phone)) {
			errorMessage += '"Номер телефона", ';
			phoneInput.classList.add('error');
		} else {
			phoneInput.classList.remove('error');
		}

		if (message === '') {
			errorMessage += '"Сообщение", ';
			messageInput.classList.add('error');
		} else {
			messageInput.classList.remove('error');
		}

		if (errorMessage !== '') {
			return;
		}

		const formData = {
			firstName,
			lastName,
			email,
			phone,
			message,
		};
		localStorage.setItem('formData', JSON.stringify(formData));

		const submittedCookie = document.cookie.split(';').find((item) => item.trim().startsWith('submitted='));

		if (submittedCookie) {
			const submittedValue = submittedCookie.split('=')[1];
			const [submittedFirstName, submittedLastName] = submittedValue.split('%20');

			console.log(`Submitted cookie found. User: ${submittedFirstName} ${submittedLastName}`);

			alert(`${submittedFirstName} ${submittedLastName}, ваше обращение уже обрабатывается!`);

		} else {
			console.log('No submitted cookie found.');
			alert(`${firstName} ${lastName}, спасибо за обращение!`);
			document.cookie = `submitted=${firstName}%20${lastName}; expires=Sun, 31 Dec 2023 23:59:59 GMT`;
		}

		contactForm.reset();
	});
});
