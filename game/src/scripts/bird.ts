export class Bird {
	game_context: CanvasRenderingContext2D;
	image: HTMLImageElement;
	max_height: number;
	max_width: number;

	position: number;
	going_up: boolean;

	speed: number = 2;

	constructor(game_context: CanvasRenderingContext2D, max_width: number, max_height: number) {
		this.game_context = game_context;
		this.image = new Image();
		this.image.src = 'fugl.png';
		this.max_width = max_width;
		this.max_height = max_height;
		this.position = max_height;
		this.going_up = false;
		this.addEventListeners();
	}

	update() {
		if (this.going_up) {
			this.position -= this.speed;
			this.position = Math.max(this.position, 0);
		} else {
			this.position += this.speed;
			this.position = Math.min(this.position, 130);
		}

		this.game_context.drawImage(this.image, 100, this.position);
	}

	should_be_deleted() {
		return this.position < -this.image.width;
	}

	//input controls
	addEventListeners = () => {
		document.addEventListener('keydown', () => {
			this.going_up = true;
		});
		document.addEventListener('keyup', () => {
			this.going_up = false;
		});
		document.addEventListener('mousedown', () => {
			this.going_up = true;
		});
		document.addEventListener('mouseup', () => {
			this.going_up = false;
		});
		document.addEventListener('touchstart', () => {
			this.going_up = true;
		});
		document.addEventListener('touchend', () => {
			this.going_up = false;
		});
	};
}
