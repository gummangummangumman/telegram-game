import { img } from './Img';

export class Sunflower {
	game_context: CanvasRenderingContext2D;
	sprites: { [name: string]: HTMLImageElement };
	image: HTMLImageElement;
	max_height: number;
	max_width: number;

	gap_between_flowers: number;
	hitbox_leniency: number = 60; //how many vertical pixels "inside" of the sprite should not count for collisions

	position: number;
	vertical_position: number;

	speed: number = 4;
	added_speed_each_sunflower: number = 0.5;

	collision_checked: boolean = false;

	constructor(
		game_context: CanvasRenderingContext2D,
		max_width: number,
		max_height: number,
		sunflower_id: number
	) {
		this.game_context = game_context;
		this.max_width = max_width;
		this.max_height = max_height;
		this.gap_between_flowers = max_height / 6;
		this.position = max_width;
		this.vertical_position = Math.floor(
			Math.random() * (this.max_height - this.gap_between_flowers)
		);
		this.speed += this.added_speed_each_sunflower * sunflower_id;

		this.sprites = {
			alive: img('solsikke.png'),
			passed: img('solsikke_glad.png'),
			dead: img('solsikke_dead.png'),
		};
		this.image = this.sprites.alive;
	}

	update(game_over: boolean) {
		if (!game_over) {
			this.position -= this.speed;
		}

		//upper
		this.game_context.scale(1, -1);
		this.game_context.drawImage(
			this.image,
			this.position,
			-this.vertical_position + this.max_height,
			this.image.width,
			-this.image.height
		);
		this.game_context.scale(1, -1);

		//lower
		this.game_context.drawImage(
			this.image,
			this.position,
			this.vertical_position + this.max_height - this.image.height + this.gap_between_flowers,
			this.image.width,
			this.image.height
		);
	}

	should_be_deleted() {
		return this.position < -this.image.width;
	}

	getHitboxPosition() {
		return this.position + this.image.width / 2;
	}

	die() {
		this.image = this.sprites.dead;
	}

	pass() {
		this.image = this.sprites.passed;
	}
}
