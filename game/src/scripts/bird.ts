export class Bird {
	gameContext: CanvasRenderingContext2D;
	image: HTMLImageElement;
	maxHeight: number;
	maxWidth: number;

	position: number;
	going_up: boolean;

	constructor(gameContext: CanvasRenderingContext2D, maxWidth: number, maxHeight: number) {
		this.gameContext = gameContext;
		this.image = new Image();
		this.image.src = '../../fugl.png';
		this.maxWidth = maxWidth;
		this.maxHeight = maxHeight;
		this.position = maxHeight;
		this.going_up = true;
	}

	update() {
		if (this.going_up) {
			this.position -= 1;
			this.going_up = this.position > 0;
		} else {
			this.position += 1;
			this.going_up = this.position > this.maxHeight;
		}

		this.gameContext.drawImage(this.image, 100, this.position);
	}

	should_be_deleted() {
		return this.position < -this.image.width;
	}
}
