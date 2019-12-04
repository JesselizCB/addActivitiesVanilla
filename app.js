// var globales
const formUI = document.querySelector('#formulario');
const actListUI = document.getElementById('activitiesList');
let arrAct = [];


//funciones
const createCard = (actividad) => {
	let item = {
		actividad: actividad,
		estado: false
	}
	arrAct.push(item);
	return item;
}

const guardarDb = () => {
	localStorage.setItem('card', JSON.stringify(arrAct));
	pintarDB();
}

const pintarDB = () => {
	actListUI.innerHTML = '';
	arrAct = JSON.parse(localStorage.getItem('card'));
	if (arrAct === null) {
		arrAct = [];
	} else {
		arrAct.forEach(element => {
			if (element.estado) {
				actListUI.innerHTML += `<div class="alert alert-success" role="alert"><i class="material-icons float-left mr-2">credit_card</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
			} else {
				actListUI.innerHTML += `<div class="alert alert-danger" role="alert"><i class="material-icons float-left mr-2">credit_card</i><b>${element.actividad}</b> - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete</i></span></div>`
			}
		});
	}
}

const eliminarBd = (actividad) => {
	let indexArr;

	arrAct.forEach((element, index) => {
		if (element.actividad === actividad) {
			indexArr = index;
		}
	});

	arrAct.splice(indexArr, 1);
	guardarDb();
}

const editDb = (actividad) => {
	let indexArr = arrAct.findIndex((elemento) => {
		return elemento.actividad === actividad
	});
	if(arrAct[indexArr].estado){
		arrAct[indexArr].estado = false;
	} else {
		arrAct[indexArr].estado = true;
	}
	
	guardarDb();
}

//event listener
formUI.addEventListener('submit', (e) => {
	e.preventDefault();
	let actividadUI = document.querySelector('#card-text').value;
	createCard(actividadUI);
	guardarDb();
	formUI.reset();
});


document.addEventListener('DOMContentLoaded', pintarDB); //es lo primero que carga cuando se inicia la pag
actListUI.addEventListener('click', (e) => {

	e.preventDefault();

	console.log(e.target.innerHTML);
	/*  if (e.target.innerHTML === 'done' || e.target.innerHTML === 'delete') {
			 console.log(e.path[2].childNodes[1].innerHTML);
 
	 } */
	let cardText = e.path[2].childNodes[1].innerHTML;
	if (e.target.innerHTML === 'done') {
		editDb(cardText);
	}
	if (e.target.innerHTML === 'delete') {
		eliminarBd(cardText);
	}
});
