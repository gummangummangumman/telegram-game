export class Sunflower {
	gameContext: CanvasRenderingContext2D;
	image: HTMLImageElement;
	maxHeight: number;
	maxWidth: number;

	position: number;

	constructor(gameContext: CanvasRenderingContext2D, maxWidth: number, maxHeight: number) {
		console.log('sunflower');
		this.gameContext = gameContext;
		this.image = new Image();
		this.image.src = 'solsikke.png';
		this.maxWidth = maxWidth;
		this.maxHeight = maxHeight;
		this.position = maxWidth;
	}

	update() {
		this.position -= 1;
		this.gameContext.drawImage(this.image, this.position, 150 - this.image.height);
	}

	should_be_deleted() {
		return this.position < -this.image.width;
	}
}
