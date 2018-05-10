"use strict";

class VeiculoNivel
{

	constructor(x, y, w, h, speed, direcao, img, srcLeft, srcRight)
	{
		//posição e movimento
		this.xIni = x;
		this.yIni = y;
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.speed = speed;
		this.direcao = direcao;
		this.srcLeft = srcLeft;
		this.srcRight = srcRight;

		//imagem
		this.img = img;

		this.imageData = this.getImageData(img);
	}

	createImgLeft(){
		var imgNova = new Image();
		imgNova.id= this.img.id;
		imgNova.src = this.srcLeft;

		this.img = imgNova; 
	}

	createImgRight(){
		var imgNova = new Image();
		imgNova.id=this.img.id;
		imgNova.src = this.srcRight;

		this.img = imgNova; 
	}

	getImageData(img){

        var canvasnova = document.createElement("canvas");
        canvasnova.width = this.width;
        canvasnova.height = this.height;

        var ctx = canvasnova.getContext("2d");
        ctx.drawImage(img, 0, 0, this.width, this.height);

        return ctx.getImageData(0, 0, this.width, this.height);
    }
	

	draw(ctx)
	{
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}


	clear(ctx)
	{
		ctx.clearRect(this.x, this.y, this.width, this.height);
	}


	reset(ev, ctx)
	{
		this.clear(ctx);
		this.x = this.xIni;
		this.y = this.yIni;
		this.clickable = this.clickableIni;
	}

	verificaColisao(outro) {
	    if (verificaColisaoBoundingBox(outro)) {
	        if (verificaColisaoPixelPorPixel(outro))
	            return true;
	        else
	        	return false;
	    } 
	    else
	        return false;
	}

	verificaColisaoBoundingBox(outro) {
	    //   console.log(rect1.width+" "+rect2.width)
	    if (this.x < outro.x + outro.width &&
	        this.x + this.width > outro.x &&
	        this.y < outro.y + outro.height &&
	        this.height + this.y > outro.y)
	        //console.log("colisao na caixa");
	        return true;
	    else
	        return false;
	}

	verificaColisaoPixelPorPixel(outro) {
	    let x_left = Math.floor(Math.max(outro.x, this.x));
	    let x_right = Math.floor(Math.min(outro.x + outro.width, this.x + this.width));
	    let y_top = Math.floor(Math.max(outro.y, element.y));
	    let y_bottom = Math.floor(Math.min(outro.y + outro.height, this.y + this.height));

	    for (let y = y_top; y < y_bottom; y++) {
	        for (let x = x_left; x < x_right; x++) {
	            let x_0 = Math.round(x - outro.x);
	            let y_0 = Math.round(y - outro.y);
	            let n_pix = y_0 * outro.width + x_0; //n pixel to check
	            let pix_op = outro.imageData.data[4 * n_pix + 3]; //opacity (R G B A)

	            let element_x_0 = Math.round(x - this.x);
	            let element_y_0 = Math.round(y - this.y);
	            let element_n_pix = element_y_0 * this.width + element_x_0; //n pixel to check
	            let element_pix_op = this.imageData.data[4 * element_n_pix + 3]; //opacity (R G B A)

	            if (pix_op == 255 && element_pix_op == 255) {
	                /*Debug*/
	                console.log("colisao no pixel");
	                return true;
	            }
	        }
	    }
	    return false;
	}
}