export class Sunflower {
	game_context: CanvasRenderingContext2D;
	image: HTMLImageElement;
	upside_down_image: HTMLImageElement;
	max_height: number;
	max_width: number;
	gap_between_flowers: number;

	position: number;
	vertical_position: number;

	speed: number = 2;
	added_speed_each_sunflower: number = 0.2;

	collision_checked: boolean = false;

	constructor(
		game_context: CanvasRenderingContext2D,
		max_width: number,
		max_height: number,
		sunflower_id: number
	) {
		this.game_context = game_context;
		this.image = new Image();
		this.image.src = 'solsikke.png';
		this.upside_down_image = new Image();
		this.upside_down_image.src = 'solsikke_opp_ned.png';
		this.max_width = max_width;
		this.max_height = max_height;
		this.gap_between_flowers = max_height / 10;
		this.position = max_width;
		this.vertical_position = Math.floor(Math.random() * this.max_height);
		this.speed += this.added_speed_each_sunflower * sunflower_id;
	}

	update() {
		this.position -= this.speed;

		//upper
		this.game_context.drawImage(
			this.upside_down_image,
			this.position,
			this.vertical_position,
			this.image.width,
			-this.image.height
		);

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
}
