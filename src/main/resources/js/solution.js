let price = 0;
let age = 0;
let bereid_te_betalen = 0;
let modelnummer = "";
let result = [];

const displaySolution = (BranchDecider, repair) => {
    console.log(repair)
    price = repair.purchasePrice;
    age = repair.ageInMonths;
    modelnummer = repair.deviceModelNumber;
    bereid_te_betalen = repair.willingToPay;
    result = repair.answersIds;
    const extractVideoId = (url) => {
        const match1 = url.match(/[?&]v=([^&]+)/);
        const match2 = url.match('\/embed\/([a-zA-Z0-9_-]+)\?');
        const match3 = url.match('\/youtu\.be\/([a-zA-Z0-9_-]+)\?');

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
    const problemHeader = document.createElement("h2");
    problemHeader.innerHTML = "Probleem";

    //document.getElementByClassName('leafletMap').contents().find(".md:h-screen leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom").focus();

    const articleVito = document.createElement("article");
    const articleVideo = document.createElement("article");
    const videoHeader = document.createElement("h2");
    videoHeader.innerHTML = "DIY videos";
    articleVideo.appendChild(videoHeader);
    console.log(BranchDecider);
    console.log(matrixDIYLinks[BranchDecider - 1]);

    matrixDIYLinks[BranchDecider - 1].forEach((link) => {
        const div = document.createElement("div");
        div.setAttribute("class", "videoMargin");
        div.innerHTML = createYouTubeEmbedCode(extractVideoId(link));

        articleVideo.appendChild(div);
    });
    header.innerHTML = "Oplossingen";
    h2Repair.innerHTML = "Prijs";

    h2DoeHetZelf.innerHTML = "Doe Het Zelf";
    vitoTitle.innerHTML = "Vito tool";
    vitop = document.createElement("p");
    vitop.innerHTML = "Deze VITO tool geeft een ecologische en economische vergelijking tussen een apparaat repareren en een nieuwe kopen";
    pCost.innerHTML = `De waarde van het apparaat op dit moment: € ${getWaardeBepaling()}`;
    pr30.innerHTML = `Uit onderzoek blijkt dat mensen bereid zijn om 30% van de aankoopprijs te betalen voor een reparatie: € ${getWaardeBepaling() * 0.3
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

    probleemText.innerHTML = `${matrixProblems[BranchDecider - 1]}`;
    mapRepairCafés.innerHTML = createMap();
    articleProblem.appendChild(problemHeader);
    articleProblem.appendChild(probleemText);

    articleDoehetZelf.appendChild(h2DoeHetZelf);
    articlePrijs.appendChild(h2Repair);
    articlePrijs.appendChild(pCost);
    articlePrijs.appendChild(pr30);
    articlePrijs.appendChild(pr50);
    articleVito.appendChild(vitoTitle);
    articleVito.appendChild(vitop);
    articleVito.appendChild(vitoLinkDiv);
    articleLocaties.appendChild(mapRepairCafés);

    //Volgorde solution divs
    div.appendChild(articleProblem);
    div.appendChild(articleVito);
    div.appendChild(articleDoehetZelf);
    div.appendChild(articlePrijs);
    div.appendChild(articleVideo);
    div.appendChild(articleLocaties);
    div.appendChild(articleEndOfLife);

    //Loop to get correct solutions
    let solution = [];
    let i = 0;
    console.log("result: " + result);
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
            articleDoehetZelf.appendChild(p);
            // p.setAttribute("class","deactivate");
            div.appendChild(articleDoehetZelf);
            // articleDoehetZelf.addEventListener("click",()=> myClick(p));
        });
    }

    //style kader
    [articleDoehetZelf, articlePrijs, articleProblem, articleVideo, articleVito, articleLocaties, articleEndOfLife].forEach((element) => {
        element.setAttribute("class", "kaderSolution");
    });

    //const mapDiv = document.createElement('div');
    //mapDiv.id = 'map';
    //const map = document.querySelector('map');
    //articleLocaties.appendChild(mapDiv);

    const terugButton = document.createElement('button');
    terugButton.innerHTML = "Terug";
    terugButton.id = "terugButton";
    terugButton.style.margin="2rem auto"
    solutiondiv.appendChild(terugButton);

    terugButton.addEventListener("click", async () => {
        window.location.href = "user.html";
    })

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



// const testje = getRepairValue();
// console.log("testje");


// displayMainDiv();

