let price = 0;
let age = 0;
let bereid_te_betalen = 0;
let modelnummer = "";

const getRole = async (email) => {
	const response = await fetch(`http://localhost:8080/api/profile/${email}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	const result = await response.json();
	console.log(result.role);
};
getRole("jules@jules.com");
const generateMainDiv = () => {
	const div = document.createElement("div");
	div.id = "maindiv";
	const main = document.querySelector("main");
	main.appendChild(div);
};
const displayMainDiv = () => {
	generateMainDiv();
	const div = document.getElementById("maindiv");
	createDropDown();
	createNextButton();
	document.getElementById("next").addEventListener("click", () => {
		const value = document.querySelector("select").value;
		console.log(value);
		clearDiv("maindiv");
		div.setAttribute("id", "nextdiv");
		enterModel();
	});
};

const enterAndPostDeviceInfo = async () => {
	const input1 = document.getElementById("input1").value;
	modelnummer = input1;
	const input2 = document.getElementById("input2").value;
	price = input2;
	const input3 = document.getElementById("input3").value;
	bereid_te_betalen = input3;
	const input4 = document.getElementById("input4").value;
	age = input4;
	const device = { deviceModelNumber: input1, purchasePrice: input2, bereidteBetalen: input3, ageInMonths: input4 };
	const response = await fetch("http://localhost:8080/api/devices/add", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(device),
	});
	const result = await response.json();
	if (response.status === 400) {
		Object.keys(result).forEach((fieldName) => {
			document.getElementById(`${fieldName}-error`).innerText = result[fieldName];
		});
		console.log("Device is not added.");
	} else {
		console.log("werkt wel");
		console.log(input1, input2, input3);
	}
};

const getRepairs = async () => {
	const response = await fetch("http://localhost:8080/api/devices/overview", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	const result = await response.json();
	console.log(result);
};

const isEmpty = () => {
	const input1 = document.getElementById("input1").value;
	const input2 = document.getElementById("input2").value;
	const input3 = document.getElementById("input3").value;
	const input4 = document.getElementById("input4").value;
	if (input1 == "" || input2 == "" || input3 == "" || input4 == "") {
		return true;
	} else {
		return false;
	}
};

const isInt = (value) => {
	// Use parseInt to attempt to convert the value to an integer
	// If the conversion is successful, and the result is not NaN, it's an integer
	return !isNaN(parseInt(value, 10)) && Number.isInteger(parseFloat(value));
};

const isString = (value) => {
	return typeof value === "string";
};

const ofTypeInt = () => {
	const input2 = document.getElementById("input2").value;
	const input3 = document.getElementById("input3").value;
	const input4 = document.getElementById("input4").value;
	if (isInt(input2) && isInt(input3) && isInt(input4)) {
		return true;
	} else {
		return false;
	}
};

const ofTypeString = () => {
	const input1 = document.getElementById("input1").value;

	if (isString(input1)) {
		return true;
	} else {
		return false;
	}
};

const enterModel = () => {
	const div = document.getElementById("nextdiv");
	const label1 = document.createElement("label");
	label1.innerHTML = "Model Nummer Apparaat: ";
	const input1 = document.createElement("input");

	input1.id = "input1";
	input1.required = true;
	const label2 = document.createElement("label");
	label2.innerHTML = "Aankoopprijs:";
	const input2 = document.createElement("input");
	input2.id = "input2";
	const label3 = document.createElement("label");
	label3.innerHTML = "Bereid te betalen:";
	const input3 = document.createElement("input");
	input3.id = "input3";
	const label4 = document.createElement("label");
	label4.innerHTML = "Leeftijd toestel (in maanden):";
	const input4 = document.createElement("input");
	input4.id = "input4";
	div.appendChild(label1);
	div.appendChild(input1);
	div.appendChild(label2);
	div.appendChild(input2);
	div.appendChild(label3);
	div.appendChild(input3);
	div.appendChild(label4);
	div.appendChild(input4);
	const button = document.createElement("button");
	button.innerHTML = "Start";
	button.id = "start";
	div.appendChild(button);
	const startbutton = document.getElementById("start");
	const p = document.createElement("p");
	startbutton.addEventListener("click", () => {
		if (isEmpty()) {
			p.innerHTML = "Vul alle velden in";

			p.id = "error";
			div.appendChild(p);
		} else if (ofTypeInt() == false) {
			const p = document.createElement("p");
			p.innerHTML = "Vul een getal in bij aankoopprijs, bouwjaar en leeftijd toestel";

			p.id = "error";
			div.appendChild(p);
		} else if (ofTypeString() == false) {
			const p = document.createElement("p");
			p.innerHTML = "Vul een tekst in bij model nummer";

			p.id = "error";
			div.appendChild(p);
		} else {
			enterAndPostDeviceInfo();
			getRepairs();
			clearDiv("nextdiv");
			div.setAttribute("id", "vraag1div");
			displayBranchQuestion();
		}
	});
};

const createDropDown = () => {
	const label = document.createElement("label");
	label.innerHTML = "Selecteer uw apparaat: ";
	label.id = "dropdownlabel";
	const select = document.createElement("select");
	select.id = "devices";
	label.appendChild(select);
	const option1 = document.createElement("option");
	option1.value = "Stofzuiger";
	option1.innerHTML = "Stofzuiger";
	select.appendChild(option1);
	const option2 = document.createElement("option");
	option2.value = "...";
	option2.innerHTML = "...";
	select.appendChild(option2);
	const div = document.getElementById("maindiv");
	div.appendChild(label);
};

const createNextButton = () => {
	const button = document.createElement("button");
	button.innerHTML = "Volgende";
	button.id = "next";

	const div = document.getElementById("maindiv");
	div.appendChild(button);
};
let selectedInput = 0;
const displayBranchQuestion = () => {
	const div = document.getElementById("vraag1div");
	const data = matrix[0];
	let clickedInputId = null;
	let index = 1;
	data.forEach((element) => {
		const label = document.createElement("label");
		label.innerHTML = element;
		div.appendChild(label);
		const input = document.createElement("input");
		input.type = "radio";
		input.id = `${index}`;
		input.name = "vraag1";
		// input.setAttribute('required','true')
		div.appendChild(input);
		index++;

		// test
		input.addEventListener("click", (event) => {
			const clickedInput = event.target;
			clickedInputId = clickedInput.id;
			selectedInput = clickedInput.id;
			console.log(`Clicked input ID : ${clickedInputId}`);
		});
	});
	const vraag1button = document.createElement("button");
	vraag1button.innerHTML = "Volgende";
	vraag1button.id = "vraag1button";
	div.appendChild(vraag1button);
	const p = document.createElement("p");
	vraag1button.addEventListener("click", () => {
		if (clickedInputId == null) {
			p.innerHTML = "Selecteer een optie";
			p.id = "error";
			div.appendChild(p);
		} else {
			clearDiv("vraag1div");
			div.setAttribute("id", "treediv");
			const BranchDecider = clickedInputId;

			branchNavigation(BranchDecider);
		}
	});
};
let index = 0;
let result = [];
const branchNavigation = (BranchDecider) => {
	let clickedInputId = null;

	const div = document.getElementById("treediv");
	const p = document.createElement("p");
	p.innerHTML = matrix[BranchDecider][index];
	div.appendChild(p);

	const label1 = document.createElement("label");
	label1.innerHTML = "Ja";
	const label2 = document.createElement("label");
	label2.innerHTML = "Nee";

	const input1 = document.createElement("input");
	input1.type = "radio";
	input1.name = "tree";
	input1.id = 1;

	input1.addEventListener("click", (event) => {
		const clickedInput = event.target;
		clickedInputId = clickedInput.id;
	});

	const input2 = document.createElement("input");
	input2.type = "radio";
	input2.name = "tree";
	input2.id = 0;

	input2.addEventListener("click", (event) => {
		const clickedInput = event.target;
		clickedInputId = clickedInput.id;
	});

	div.appendChild(label1);
	div.appendChild(input1);
	div.appendChild(label2);
	div.appendChild(input2);

	const treeButton = document.createElement("button");
	treeButton.innerHTML = "Volgende";
	treeButton.id = "treebutton";
	div.appendChild(treeButton);
	const p2 = document.createElement("p");
	treeButton.addEventListener("click", () => {
		if (clickedInputId == null) {
			p2.innerHTML = "Selecteer een optie";
			p2.id = "error";
			div.appendChild(p2);
		} else {
			index++;
			if (matrix[BranchDecider].length === index) {
				//POST result
				clearDiv("treediv");
				result.push(clickedInputId);
				console.log(result);
				div.setAttribute("id", "solutiondiv");
				displaySolution(BranchDecider);
			} else {
				clearDiv("treediv");
				branchNavigation(BranchDecider);
				result.push(clickedInputId);
			}
		}
	});
};

const displaySolution = (BranchDecider) => {
	const extractVideoId = (url) => {
		const match1 = url.match(/[?&]v=([^&]+)/);
		const match2 = url.match("/embed/([a-zA-Z0-9_-]+)?");
		const match3 = url.match("/youtu.be/([a-zA-Z0-9_-]+)?");

		//id=match1 ? match1[1] : null
		if (match1) {
			return match1 ? match1[1] : null;
		} else if (match2) {
			return match2 ? match2[1] : null;
		} else if (match3) {
			return match3 ? match3[1] : null;
		}
	};

	// Create the embed link for the youtube video
	const createYouTubeEmbedCode = (videoId) => {
		return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
	};

	const createVitoTool = () => {
		return `<iframe height="450" src="https://www.guidance.sharepair.org/en/repair-impact-result?productCategory=coffee maker senseo&productAge=${age}" title="Vito Tool" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
	};
	const createMap = () => {
		return `<iframe class='leafletMap' height="450" src="https://www.leuvenfixt.be/repair-leuven/" title="Vito Tool" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
	};

	//Create header
	const div = document.getElementById("solutiondiv");
	const header = document.createElement("h1");
	const h2Repair = document.createElement("h2");
	const h2DoeHetZelf = document.createElement("h2");
	const articlePrijs = document.createElement("article");
	const articleDoehetZelf = document.createElement("article");
	const articleProblem = document.createElement("article");
	const probleemText = document.createElement("p");
	const pr30 = document.createElement("p");
	const pr50 = document.createElement("p");
	const pCost = document.createElement("p");
	const vitoTitle = document.createElement("h2");
	const vitoLinkDiv = document.createElement("div");
	let selectedProblem = "";
	vitoLinkDiv.innerHTML = createVitoTool();
	console.log(matrixProblems[0]);
	const problemHeader = document.createElement("h2");
	problemHeader.innerHTML = "Probleem";

	//document.getElementByClassName('leafletMap').contents().find(".md:h-screen leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom").focus();

	const articleVito = document.createElement("article");
	const articleVideo = document.createElement("article");
	const videoHeader = document.createElement("h2");
	videoHeader.innerHTML = "DIY videos";
	articleVideo.appendChild(videoHeader);

	matrixDIYLinks[selectedInput - 1].forEach((link) => {
		const div = document.createElement("div");
		div.setAttribute("class", "videoMargin");
		div.innerHTML = createYouTubeEmbedCode(extractVideoId(link));

		articleVideo.appendChild(div);
	});
	header.innerHTML = "Oplossingen";
	h2Repair.innerHTML = "Prijs";

	h2DoeHetZelf.innerHTML = "Doe Het Zelf";
	vitoTitle.innerHTML = "Vito tool";
	pCost.innerHTML = `De waarde van het apparaat op dit moment: €${getWaardeBepaling()}`;
	pr30.innerHTML = `Uit onderzoek blijkt dat mensen bereid zijn om 30% van de aankoopprijs te betalen voor een reparatie: ${
		getWaardeBepaling() * 0.3
	}`;
	pr50.innerHTML = `of 50% van de nieuw koopprijs te betalen voor een reparatie: to be done`;

	const h2RepairCaféLocaties = document.createElement("h2");
	const h2EndOfLife = document.createElement("h2");
	const descriptionEndOfLife = document.createElement("p");
	descriptionEndOfLife.innerHTML =
		"U kan eventueel langskomen bij een van de repaircafé's om het defecte apparaat binnen te brengen.\n Dit kunnen wij dan gebruiken als wisselstukken.";

	const articleLocaties = document.createElement("article");
	const articleEndOfLife = document.createElement("article");

	h2RepairCaféLocaties.innerHTML = "Repair Café Locaties";
	h2EndOfLife.innerHTML = "End of Life toestel";

	const mapRepairCafés = document.createElement("div");
	//linkMapRepairCafés.href = "https://www.leuvenfixt.be/repair-leuven";
	//linkMapRepairCafés.innerHTML = "Leuvenfixt"

	articleLocaties.appendChild(h2RepairCaféLocaties);
	articleEndOfLife.appendChild(h2EndOfLife);
	articleEndOfLife.appendChild(descriptionEndOfLife);

	div.appendChild(header);
	div.appendChild(h2DoeHetZelf);
	console.log(articlePrijs);

	probleemText.innerHTML = `${matrixProblems[selectedInput - 1]}`;
	mapRepairCafés.innerHTML = createMap();
	articleProblem.appendChild(problemHeader);
	articleProblem.appendChild(probleemText);

	articleDoehetZelf.appendChild(h2DoeHetZelf);
	articlePrijs.appendChild(h2Repair);
	articlePrijs.appendChild(pCost);
	articlePrijs.appendChild(pr30);
	articlePrijs.appendChild(pr50);
	articleVito.appendChild(vitoTitle);
	articleVito.appendChild(vitoLinkDiv);
	articleLocaties.appendChild(mapRepairCafés);

	div.appendChild(articleProblem);
	div.appendChild(articleDoehetZelf);
	div.appendChild(articlePrijs);
	div.appendChild(articleVideo);
	div.appendChild(articleLocaties);
	div.appendChild(articleEndOfLife);
	div.appendChild(articleVito);

	//Loop to get correct solutions
	let solution = [];
	let i = 0;
	result.forEach((element) => {
		if (element == 1) {
			if (!solution.includes(solution_matrix[BranchDecider - 1][i])) {
				solution.push(solution_matrix[BranchDecider - 1][i]);
				i++;
			}
		} else {
			i++;
		}
	});
	console.log(solution);
	if (solution.length == 0) {
		const p = document.createElement("p");
		p.innerHTML = "Er zijn geen doe het zelf stappen voor dit probleem";
		articleDoehetZelf.appendChild(p);
	} else {
		solution.forEach((element) => {
			const p = document.createElement("p");
			p.innerHTML = element;
			div.appendChild(p);
		});
	}

	//style kader
	[articleDoehetZelf, articlePrijs, articleProblem, articleVideo, articleVito, articleLocaties, articleEndOfLife].forEach((element) => {
		element.setAttribute("id", "kader");
	});


	//const mapDiv = document.createElement('div');
	//mapDiv.id = 'map';
	//const map = document.querySelector('map');
	//articleLocaties.appendChild(mapDiv);
};

// const myClick = (element)=> {
//     if (element.getAttribute("class") == "deactivate"){
//         element.setAttribute("class","activate")
//         console.log("activaded")
//     }
//     else{
//         element.setAttribute("class","deactivate")
//     }
// }

// articlePrijs.addEventListener("click",()=> myClick(pCost))

// };

const getWaardeBepaling = () => {
	return price - 0.01 * price * age;
};

// displayMainDiv();
