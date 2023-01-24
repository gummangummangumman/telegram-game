export class Bird {
	game_context: CanvasRenderingContext2D;
	image: HTMLImageElement;
	max_height: number;
	max_width: number;

	position: number;
	going_up: boolean;

	speed: number = 5;

	constructor(game_context: CanvasRenderingContext2D, max_width: number, max_height: number) {
		this.game_context = game_context;
		this.image = new Image();
		this.image.src = 'fugl.png';
		this.max_width = max_width;
		this.max_height = max_height;
		this.position = max_height;
		this.going_up = true;
	}

	update() {
		if (this.going_up) {
			this.position -= this.speed;
			this.going_up = this.position > 0;
		} else {
			this.position += this.speed;
			this.going_up = this.position > this.max_height;
		}

		this.game_context.drawImage(this.image, 100, this.position);
	}

	should_be_deleted() {
		return this.position < -this.image.width;
	}
}
