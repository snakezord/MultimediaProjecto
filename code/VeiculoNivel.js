"use strict";

class VeiculoNivel
{

	constructor(x, y, w, h, speed, direcao, clickable, img, srcLeft, srcRight)
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

		//rato
		this.clickableIni = clickable;
		this.clickable = clickable;
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

	checkCollision(ev){
		var mx = ev.offsetX;  //mx, my = mouseX, mouseY na canvas
		var my = ev.offsetY;

		if (mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height){
            return true;
		}
        else
            return false;
	}


	clickedBoundingBox(ev, ctx) //ev.target é a canvas
	{
		if (!this.clickable)
			return false;
		else
			return this.checkCollision(ev);
	}
}