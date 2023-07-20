import { img } from './Img';

export class Bird {
	game_context: CanvasRenderingContext2D;
	sprites: { [name: string]: HTMLImageElement[] };
	image: HTMLImageElement;
	max_height: number;
	max_width: number;
	horizontal_position: number = 100;

	vertical_position: number;
	going_up: boolean;

	speed: number = 4;

	current_animation_frame: number = 0;
	current_animation_sprite: number = 0;

	constructor(game_context: CanvasRenderingContext2D, max_width: number, max_height: number) {
		this.game_context = game_context;
		this.max_width = max_width;
		this.max_height = max_height;
		this.vertical_position = max_height / 2;
		this.going_up = false;
		this.addEventListeners();

		this.sprites = {
			alive: [
				img('fugl/0.png'),
				img('fugl/1.png'),
				img('fugl/2.png'),
				img('fugl/3.png'),
				img('fugl/4.png'),
				img('fugl/5.png'),
			],
		};
		this.image = this.sprites.alive[0];
	}

	update(game_over: boolean) {
		if (!game_over) {
			this.move();
			this.animate();
		}

		this.game_context.drawImage(this.image, this.horizontal_position, this.vertical_position);
	}

	animate() {
		this.current_animation_frame = (this.current_animation_frame + 1) % 4;
		if (this.current_animation_frame === 0) {
			this.current_animation_sprite =
				(this.current_animation_sprite + 1) % this.sprites.alive.length;
			this.image = this.sprites.alive[this.current_animation_sprite];
		}
	}

	move() {
		if (this.going_up) {
			this.vertical_position -= this.speed;
			this.vertical_position = Math.max(this.vertical_position, 0);
		} else {
			this.vertical_position += this.speed;
			this.vertical_position = Math.min(this.vertical_position, this.max_height - 20);
		}
	}

	should_be_deleted() {
		return this.vertical_position < -this.image.width;
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
