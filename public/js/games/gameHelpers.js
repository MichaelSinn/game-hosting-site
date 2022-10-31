const submit = document.getElementById('submitScore');
const continueEl = document.getElementById('continue');
const submitEl = document.getElementById('submitEl');
const scoreEl = document.getElementById('score');
const playAgain = document.getElementById('playAgain');

submit.addEventListener('click', async (event) => {
	event.preventDefault();
	try {
		await postScore();
	} catch (e) {
		console.error(e);
	}
	submitEl.classList.add('is-hidden');
	playAgain.classList.remove('is-hidden');
});

continueEl.addEventListener('click', (event) => {
	event.preventDefault();
	playAgain.classList.add('is-hidden');
	location.reload();
});

const postScore = async function () {
	const response = await fetch(`${window.location.href}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({score})
	});
	if (response.ok) {
		console.log('Score added');
	}
};

function submitScore() {
	submitEl.classList.remove('is-hidden');
	scoreEl.innerHTML = score;
}
