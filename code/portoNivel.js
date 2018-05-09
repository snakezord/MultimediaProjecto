"use strict";

(function()
{
	window.addEventListener("load", main);
}());

var spArray;
function main() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	canvas.addEventListener("initend", initEndHandler);
	init(ctx);

	function initEndHandler(ev)
	{
		spArray = ev.spArray;
		//iniciar a animação
		startAnim(ctx, spArray);
	}
}

function init(ctx){
	var nLoad = 0;
	var totLoad = 7;
	var spArray = new Array(totLoad);

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="porto";
	img.src = "../PhotoshopResources/portoNivel.png";  //dá ordem de carregamento da imagem	

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="carroVermelho";
	img.src = "../PhotoshopResources/carroVermelhoLeft.png";  //dá ordem de carregamento da imagem	

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="carroAzul";
	img.src = "../PhotoshopResources/carroAzulRight.png";  //dá ordem de carregamento da imagem	

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="carroAmarelo";
	img.src = "../PhotoshopResources/carroAmareloRight.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="barcoAzul";
	img.src = "../PhotoshopResources/barcoAzulRight.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="barcoCastanho";	
	img.src = "../PhotoshopResources/barcoCastanhoLeft.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="boneco";
	img.src = "../PhotoshopResources/boneco.png";  //dá ordem de carregamento da imagem	

	// falta acabar o que esta dentro da funcao
	function imgLoadedHandler(ev) {
		if (ev.target.id == 'porto') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(0, 0, nw, nh, 1, img);
			spArray[0] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'carroVermelho') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(520, 335, nw, nh, 3, "left", img, "../PhotoshopResources/carroVermelhoLeft.png", "../PhotoshopResources/carroVermelhoRight.png");
			spArray[1] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'carroAzul') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(136, 400, nw, nh, 3, "right", img, "../PhotoshopResources/carroAzulLeft.png", "../PhotoshopResources/carroAzulRight.png");
			spArray[2] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'carroAmarelo') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(152, 230, nw, nh, 3, "right", img, "../PhotoshopResources/carroAmareloLeft.png", "../PhotoshopResources/carroAmareloRight.png");
			spArray[3] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'barcoAzul') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(100, 65, nw, nh, 3, "right", img, "../PhotoshopResources/barcoAzulLeft.png", "../PhotoshopResources/barcoAzulRight.png");
			spArray[4] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'barcoCastanho') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(560, 115, nw, nh, 3, "left", img, "../PhotoshopResources/barcoCastanhoLeft.png", "../PhotoshopResources/barcoCastanhoRight.png");
			spArray[5] = sp;
			nLoad++;
		}
		
		else if (ev.target.id == 'boneco') {
			var img = ev.target;
			var nw = 30;
			var nh = 30;
			var sp = new SpriteImage(364, 470, nw, nh, 25, img);
			spArray[6] = sp;
			nLoad++;
		}

		if (nLoad == totLoad)
		{
			var ev2 = new Event("initend");
			ev2.spArray = spArray;
			ctx.canvas.dispatchEvent(ev2);
		}
	}	
}

function keydownHandler(ev) {
	var cw = canvas.width;
	var ch = canvas.height;
	var sp = spArray[6];
	if(ev.keyCode == 37){
		console.log(sp.x);
		console.log(ev.keyCode);
 		if (sp.x > 0){
			if (sp.x - sp.speed < 0)
				sp.x = 0;
			else
				sp.x = sp.x - sp.speed;
		}	
	}

	if(ev.keyCode == 38){
		console.log(sp.y);
		console.log(ev.keyCode);
 		if (sp.y > 0){
			if (sp.y - sp.speed < 0)
				sp.y = 0 + sp.width;
			else
				sp.y = sp.y - sp.speed;
		}	
	}

	if(ev.keyCode == 39){
		console.log(sp.x);
		console.log(ev.keyCode);
 		if (sp.x + sp.width < cw){
			if (sp.x + sp.width + sp.speed > cw)
				sp.x = cw - sp.width;
			else
				sp.x = sp.x + sp.speed;
		}	
	}

	if(ev.keyCode == 40){
		console.log(sp.y);
		console.log(ev.keyCode);
 		if (sp.y + sp.height < ch){
			if (sp.y + sp.speed > ch)
				sp.y = ch;
			else
				sp.y = sp.y + sp.speed;
		}	
	}
}

function startAnim(ctx, spArray)
{
	draw(ctx, spArray);
	animLoop(ctx, spArray);
}

//desenhar sprites
function draw(ctx, spArray)
{
	var dim = spArray.length;
	for (let i = 0; i < dim; i++)
	{
		spArray[i].draw(ctx);
	}
}

//apagar sprites
function clear(ctx, spArray)
{
	var dim = spArray.length;

	for (let i = 0; i < dim; i++)
	{
		spArray[i].clear(ctx);
	}
}

//-------------------------------------------------------------
//--- controlo da animação: coração da aplicação!!!
//-------------------------------------------------------------
function animLoop(ctx, spArray)
{
	var al = function(time)
	{
		window.addEventListener("keydown", keydownHandler);
		animLoop(ctx, spArray);
	}
	var reqID = window.requestAnimationFrame(al);


	render(ctx, spArray, reqID);
}

//resedenho, actualizações, ...
function render(ctx, spArray, reqID, dt)
{
	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;

	//apagar canvas
	ctx.clearRect(0, 0, cw, ch);

	/*
	//arrayEsquerda.push(spArray[6]);
	if(spArray[0].checkCollision(spArray[1])){
 		spArray[0].speed *= 1.5;
 		var audio = new Audio("resources/turbo.mp3");
		audio.play();
	}*/

	verificaColisoesLaterais(spArray,ctx);
	verificaColisoesCarros(spArray,ctx);
	draw(ctx, spArray);
}

function verificaColisoesLaterais(spArray,ctx){

	var cw = ctx.canvas.width;

	//Verifica Colisão à esquerda
	for(let i = 1;i <= 5; i++){
		if(spArray[i].direcao == 'left'){
			if (spArray[i].x >= 0){
				if (spArray[i].x - spArray[i].speed < 0){
					spArray[i].direcao = "right";
					spArray[i].createImgRight(); 
				}
				else
					spArray[i].x = spArray[i].x - spArray[i].speed;
			}
		}
		else{
			if (spArray[i].x + spArray[i].width <= cw){
				if (spArray[i].x + spArray[i].width + spArray[i].speed > cw){
					spArray[i].direcao = "left";
					spArray[i].createImgLeft();
				}
				else
					spArray[i].x = spArray[i].x + spArray[i].speed;
			}
		}
	}
}

function verificaColisoesCarros(spArray,ctx){
	for(let i=1;i<=3;i++){
		if(checkCollision(spArray[6],spArray[i])){
			spArray[6].reset(ctx);
		}
	}

	for(let i=4;i<=5;i++){
		if(checkCollision(spArray[6],spArray[i])){
			spArray[6].x = spArray[i].x + (spArray[i].width/2);
		}	
	}
	
}

function checkCollision(element, element2) {
    if (checkCollisionBoundingBox(element, element2)) {
        if (checkCollisionPixelByPixel(element, element2))
            return true;
        else
        	return false;
    } 
    else
        return false;
}

function checkCollisionBoundingBox(rect1, rect2) {
    //   console.log(rect1.width+" "+rect2.width)
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {
        //console.log("colisao na caixa");
        return true;
    } else {
        return false;
    }
}

function checkCollisionPixelByPixel(element, element2) {
    let x_left = Math.floor(Math.max(element2.x, element.x));
    let x_right = Math.floor(Math.min(element2.x + element2.width, element.x + element.width));
    let y_top = Math.floor(Math.max(element2.y, element.y));
    let y_bottom = Math.floor(Math.min(element2.y + element2.height, element.y + element.height));

    for (let y = y_top; y < y_bottom; y++) {
        for (let x = x_left; x < x_right; x++) {
            let x_0 = Math.round(x - element2.x);
            let y_0 = Math.round(y - element2.y);
            let n_pix = y_0 * element2.width + x_0; //n pixel to check
            let pix_op = element2.imageData.data[4 * n_pix + 3]; //opacity (R G B A)

            let element_x_0 = Math.round(x - element.x);
            let element_y_0 = Math.round(y - element.y);
            let element_n_pix = element_y_0 * element.width + element_x_0; //n pixel to check
            let element_pix_op = element.imageData.data[4 * element_n_pix + 3]; //opacity (R G B A)

            if (pix_op == 255 && element_pix_op == 255) {
                /*Debug*/
                console.log("colisao no pixel");
                return true;
            }
        }
    }
    return false;
}