import { Bird } from './bird';
import { Sunflower } from './sunflower';
import { scoreStore } from '../store/stores';
import { Background } from './background';

export class GameEngine {
	game_context: CanvasRenderingContext2D;
	background: Background;
	bird: Bird;
	sunflowers: Sunflower[];
	max_height: number;
	max_width: number;

	sunflowers_passed: number;
	dead: boolean;

	//Callback for when the game is ending.
	//The countdown to go to the next page is in the function itself.
	finish: Function;

	constructor(
		game_context: CanvasRenderingContext2D,
		max_width: number,
		max_height: number,
		finish: Function
	) {
		this.game_context = game_context;
		this.background = new Background(game_context, max_width, max_height);
		this.bird = new Bird(game_context, max_width, max_height);
		this.sunflowers = [];
		this.max_width = max_width;
		this.max_height = max_height;
		this.sunflowers_passed = 0;
		this.dead = false;
		this.finish = finish;
	}

	make_sunflower() {
		this.sunflowers.push(
			new Sunflower(this.game_context, this.max_width, this.max_height, this.sunflowers_passed)
		);
	}

	update() {
		this.game_context.clearRect(0, 0, this.max_width, this.max_height);
		this.background.update(this.dead);
		this.update_sunflowers();
		this.bird.update(this.dead);

		this.sunflowers.forEach((flower) => {
			if (
				flower.getHitboxPosition() < this.bird.horizontal_position + this.bird.image.width &&
				!flower.collision_checked
			) {
				if (
					this.bird.vertical_position + this.bird.top_of_hitbox <
					flower.vertical_position - flower.hitbox_leniency
				) {
					//collide with upper flower
					this.dead = true;
					flower.die();
					this.finish();
				} else if (
					this.bird.vertical_position + this.bird.bottom_of_hitbox >
					flower.vertical_position + flower.gap_between_flowers + flower.hitbox_leniency
				) {
					//collide with lower flower
					this.dead = true;
					flower.die();
					this.finish();
				} else {
					scoreStore.update((n) => Math.min(5, n + 1));
					flower.pass();
					this.bird.pass();
				}

				flower.collision_checked = true;
			}
		});
	}

	update_sunflowers() {
		this.sunflowers.forEach((sunflower) => {
			sunflower.update(this.dead);
		});
		this.sunflowers = this.sunflowers.filter((sunflower) => {
			return !sunflower.should_be_deleted();
		});
		if (!this.sunflowers.length) {
			this.sunflowers_passed++;
			this.make_sunflower();
		}
	}
}
