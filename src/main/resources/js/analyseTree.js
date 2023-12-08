const matrix = [
	[//main problemen
		"Is de zekering gesprongen? Stroomonderbreking?",
		"Stofzuiger reageert niet.",
		"Is het toestel oververhit?",
		"Zijn er geluiden die je nu hoort die je vroeger niet hoorde?",
		"De stofzuiger is uitgevallen.",
		"Heb je het toestel met water gepoetst?",
		"De stofzuiger laadt niet op.",
		"De zuigkracht is verminderd.",
		"De wieltjes rollen niet meer goed.",
		"Er komen krassen op de vloer.",
		"Het snoer rolt niet op."
	],
	[//"Is de zekering gesprongen? Stroomonderbreking?",
		"Zijn er storing op het netwerk?",
		"Is de kabel intact?",
		"Is de kabel beschadigd?",
	],
	[//"Stofzuiger reageert niet.", 
		"Brandt er een licht op de stofzuiger?",
		"Is het stopcontact defect.",
		"Is de batterij van de stofzuiger plat?"
	],
	[// Is het toestel oververhit?
		"Is de filter vol?",
		"Zit er iets in de slang?"
	],
	[//Zijn er geluiden die je nu hoort die je vroeger niet hoorde?
		"Hoor je luide motor geluiden?", 
		"Hoor je hoge tonen/fluitende geluiden?"
	],
	[//De stofzuiger is uitgevallen
		"Is de kabel intact?",
		"Is de kabel beschadigd?",
	],
	[//Heb je het toestel met water gepoetst?
		"Is de stofzuiger in contact gekomen met water aan de binnenkant of buitenkant?"
	],
	[//De stofzuiger laadt niet op.
		"Werkt het toestel met een nieuwe batterij?",
		"Is het laadstation aangesloten op een werkend stopcontact?",
		"Kan je een andere batterij opladen aan dit laadstation?",
	],//slide 23 & 24
	[//De zuigkracht is verminderd
		"Is de zuigkrachtregeling veranderd?",
		"Is er minder zuigkracht?",
		"Merk je een verstopping op?",
		"Zit er een lek in de plastic slang?",
		"Zit er een rubberen afsluiting los of is er een afsluiting kapot?",
		"Is de plastic slang kapot dicht bij een uiteinde?",
	],
	[//De wieltjes rollen niet meer goed
		"Zitten de wieltjes vast?", 
		"Zitten de wieltjes nog steeds vast na het schoonmaken?"
	],
	[//Er komen krassen op de vloer
		"Zijn er kleine steentjes of scherp afval vast geraakt in de borstel?"
	],
	[//Het snoer rolt niet op.
		"Is de veer van het snoer misschien versleten?",
		"Heeft de stofzuiger een ontgrendelmechanisme voor het vrijgeven van het snoer?",
		"Zijn er misschien haren, vuil of stof komen vast te zitten in het oprolmechanisme?"
	],
];

const solution_matrix = [
	[//"Is de zekering gesprongen? Stroomonderbreking?",
		"Stroomonderbreking: Algemene stroomonderbreking Elektricien bellen",
		"Stofzuiger met kabel, stekker zit goed in het stopcontact, er is stroom, in de “aan” stand, er brandt geen licht op de stofzuiger, geen zichtbare schade aan de kabel Stofzuiger demonteren en diagnose stellen: diagnosetijd: 20min",
		"Stofzuiger met kabel, zichtbare schade aan de kabel: Kabel breuk aan de stekker: Afknippen en herstellen Hersteltijd: 10min Nieuwe stekker: 6EUR Kabel breuk ergens anders: Stofzuiger demonteren Hersteltijd: 30min  Wisselstuk"
	],
	[//"Stofzuiger reageert niet.", 
		"Check of jij de stofzuiger aan hebt gezet.",
		"Check dat de zekering misschien niet gesprongen is bij het starten van de stofzuiger. Steek een ander elektrisch toestel in het stopcontact.Steek de stofzuiger misschien anders in een ander stopcontact.",
		"Check of de batterij van de stofzuiger niet plat is."
	],
	[// Is het toestel oververhit?
		"Zorg ervoor dat de filters leeg zijn.",
		"Controleer of dat er geen afavl, voorwerp vastzit in de slang van de stofzuiger."
	],
	[//Zijn er geluiden die je nu hoort die je vroeger niet hoorde?
		"Stofzuiger met kabel, stekker zit goed in het stopcontact, er is stroom, in de “aan” stand, er brandt geen licht op de stofzuiger, geen zichtbare schade aan de kabel Stofzuiger demonteren en diagnose stellen: diagnosetijd: 20min",
		"Stofzuiger met kabel, zichtbare schade aan de kabel: Kabel breuk aan de stekker: Afknippen en herstellen Hersteltijd: 10min Nieuwe stekker: 6EUR Kabel breuk ergens anders: Stofzuiger demonteren Hersteltijd: 30min  Wisselstuk"
	],
	[//De stofzuiger is uitgevallen
		"Verwijder de borstel,handvat en de slang. Moest er iets in vast zit verwijder dit en vergeet zeker ook niet de filter te leegen of te vravangen.",
		"Er is een lek op een van deze locaties: Plastic slang:lek herstellen tape rubberen aansluiting: terug op zijn plaats zetten of vervangen."
	],
	[//Heb je het toestel met water gepoetst?
		"Zorg dat er niks nog nat is of steek de stofzuiger later opnieuw in het stopcontact."
	],
	[
		"De batterij van je apparaat is defect.",
		"Mogelijks is de batterij van je apparaat defect.",
		"Moglijks is de batterij van je appraat defect."
	],
	[
		"Verwijder de verstopping uit je stofzuiger.",
		"Verwijder de verstopping uit je stofzuiger.",
		"Verwijder de verstopping uit je stofzuiger.",
		"Vervang verbrand onderdeel van je stofzuiger.",
		"Vervang of zet de afsluiting terug vast.",
		"Vervang dit gedeelte van de slang."
	],
	[
		"Maak de wieltjes van de stofzuiger schoon.",
		"Maak de wieltjes los en kuisenVervang de wielen als het bovenstaande niet helpt."
	],
	[
		"Verwijder de steentjes of scherpe voorwerpen."
	],
	[
		"Check of de veer van het snoer niet versleten is.",
		"Check of de ontgrendelmechanisme aan staat.",
		"Zorg ervoor dat er geen afval/voorwerp vastzit in het snoer."
	]	
];

const matrixProblems = [
		"Is de zekering gesprongen? Stroomonderbreking?",
		"Stofzuiger reageert niet.",
		"Is het toestel oververhit?",
		"Zijn er geluiden die je nu hoort die je vroeger niet hoorde?",
		"De stofzuiger is uitgevallen",
		"Heb je het toestel met water gepoetst?",
		"De stofzuiger laadt niet op.",
		"De zuigkracht is verminderd",
		"De wieltjes rollen niet meer goed",
		"Er komen krassen op de vloer",
		"Het snoer rolt niet op."
];

const matrixDIYLinks = [
	["https://www.youtube.com/watch?v=jb9giwMlJc0"],
	["https://www.youtube.com/watch?v=EqNVrcuDays", "https://www.youtube.com/watch?v=OeBpbHHWxyg"],
	["https://www.youtube.com/watch?v=yigM39gjsHc"],
	["https://www.youtube.com/watch?v=IRYkuah3ooc"],
	["https://www.youtube.com/watch?v=YNchPUcEv7Q"],
	["https://www.youtube.com/watch?v=VvX476IRn7g"],
	["https://www.youtube.com/watch?v=t_IznrzBsJE"],
	["https://www.youtube.com/watch?v=jb9giwMlJc0"],
	["https://youtu.be/oHLheMwYidY?si=l-mxZZ-4aj5Eto7T"],
	["https://youtu.be/nUD1u4ovwXg?si=fz0KcLOkBxvRXa9A"],
	["https://youtu.be/XfP3Tng3gr4?si=GssKf_gwaQrbcE5i"]
];
