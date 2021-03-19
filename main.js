const word = document.querySelector(".word");
const mots = ["homme", "femme", "enfant", "ados", "mac", "linux", "windows", "javascript", "php", "laravel", "jquery", "html", "css", "sass"];
const random = Math.round(Math.random() * (mots.length-1));
const resultat = document.querySelector(".res");
const btn = document.querySelectorAll("button");
const mot = mots[random];
const lettersEnter = [];
console.log(mot);

function init() {
	begin(word);
}

function begin(word) {
	let wordFind = "";
	for (let i = 0; i < mot.length; i++) {
		if (i === mot.length - 1) {
			wordFind += "<span>_</span>";
		} else {
			wordFind += "<span>_</span> ";
		}
	}
	word.innerHTML = wordFind;
	game();
}

function game() {
	btn.forEach(function (button) {
		button.addEventListener("click", verify);
	});
}

function verify() {
	let isTrue = true;
	this.setAttribute("disabled", "disabled");
	letterCurrent = this.innerText.toLowerCase();
	if (mot.indexOf(letterCurrent) != -1) {
		this.classList.add("disable-true");
		const eachCaracterOfWord = mot.split("");
		const spans = word.querySelectorAll("span");
		eachCaracterOfWord.forEach(function(letter, index) {
			if(letter === letterCurrent) {
				spans[index].innerText = letterCurrent;
			}
			if(spans[index].innerText == "_") {
				isTrue = false;
			}
		})
		if(isTrue) {
			resultat.innerText = "Gagné, félicitation !";
			btn.forEach(function(button) {
				button.removeEventListener("click", verify);
			})
		}
	} else {
		appendLetters(this)
	}
}

function appendLetters(letterChoice) {
	const letters = document.querySelector(".letters");
	let text = "";
	letterChoice.classList.add("disable");
	if (lettersEnter.indexOf(letterChoice.innerText) == -1) {
		lettersEnter.push(letterChoice.innerText);
	}
	lettersEnter.forEach(function (element, index) {
		if (lettersEnter.length === index - 1) {
			text += `<span>${element}</span>`;
		} else {
			text += `<span>${element}</span> `;
		}
	});
	letters.innerHTML = text;
	if (lettersEnter.length == 10) {
		resultat.innerText = "Perdu !";
		btn.forEach(function(button) {
			button.removeEventListener("click", verify);
		})
	}
}

init();
