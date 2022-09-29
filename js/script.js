const username = document.querySelector('#name');
const surname = document.querySelector('#surname');
const email = document.querySelector('#email');
const pass = document.querySelector('#pass');
const claimBtn = document.querySelector('.claim-btn');
const popup = document.querySelector('.popup');

const showError = (input, msg) => {
	const inputBox = input.parentElement;
	const errorMsg = input.parentElement.nextElementSibling;

	inputBox.classList.add('active');
	errorMsg.textContent = msg;
};

const clearError = (input) => {
	const inputBox = input.parentElement;
	const errorMsg = input.parentElement.nextElementSibling;

	inputBox.classList.remove('active');
	errorMsg.textContent = '';
};

const checkForm = (input) => {
	input.forEach((el) => {
		if (el.value === '') {
			showError(el, el.placeholder);
		} else {
			clearError(el);
		}
	});
};

const checkLength = (input, min) => {
	if (input.value.length >= min) {
		clearError(input);
	} else {
		if (input.value.length < min && input.value.length > 0) {
			showError(
				input,
				`${input.placeholder} has to be at least ${min} characters long`
			);
		} else {
			showError(input, `${input.placeholder} cannot be empty`);
		}
	}
};

const checkMail = (email) => {
	const reg =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	if (reg.test(email.value)) {
		clearError(email);
	} else {
		if (email.value.length > 0) {
			showError(email, 'Looks like this is not an email.');
		} else {
			showError(email, `${email.placeholder} cannot be empty`);
		}
	}
};

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.input-box');
	let errorCount = 0;

	allInputs.forEach((el) => {
		if (el.classList.contains('active')) {
			errorCount++;
		}
	});
	if (errorCount === 0) {
		popup.classList.add('show-popup');
	}
};

claimBtn.addEventListener('click', (e) => {
	e.preventDefault();

	checkForm([username, surname, email, pass]);
	checkLength(username, 3);
	checkLength(surname, 4);
	checkLength(pass, 5);
	checkMail(email);
	checkErrors()
});
