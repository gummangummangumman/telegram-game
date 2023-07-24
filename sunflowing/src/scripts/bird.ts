import { img } from './Img';

export class Bird {
	//game stuff
	game_context: CanvasRenderingContext2D;
	max_height: number;
	max_width: number;

	//static bird stuff
	sprites: { [name: string]: HTMLImageElement[] };
	image: HTMLImageElement;

	horizontal_position: number = 100;
	//hitboxes are defined from vertical_position, so from highest point and down
	top_of_hitbox: number = 24;
	bottom_of_hitbox: number = this.top_of_hitbox + 26;

	speed: number = 8;

	//dynamic bird stuff
	vertical_position: number; //highest point of sprite
	going_up: boolean;

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
		this.current_animation_frame = (this.current_animation_frame + 1) % 3;
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
			this.vertical_position = Math.min(
				this.vertical_position,
				this.max_height - this.image.height
			);
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
