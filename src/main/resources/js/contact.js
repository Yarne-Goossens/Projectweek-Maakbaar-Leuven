const displayEmailMain = () => {
	const divMain = document.createElement("div");
	divMain.id = "emailMain";
	const main = document.querySelector("main");
	main.appendChild(divMain);

	const LabelOf = document.createElement("label");
	LabelOf.innerText = "Heb je een dringende vraag? Bel ons!";
	LabelOf.style.textAlign = "center";

	const LabelOfNumber = document.createElement("label");
	LabelOfNumber.innerText = "016 37 57 00";
	LabelOfNumber.style.textAlign = "center";

	divMain.appendChild(LabelOf);
	divMain.appendChild(LabelOfNumber);
};

displayEmailMain();
