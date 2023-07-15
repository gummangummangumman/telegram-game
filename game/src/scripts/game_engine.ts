import { Bird } from './bird';
import { Sunflower } from './sunflower';
import { scoreStore } from '../store/stores.js';

export class GameEngine {
	game_context: CanvasRenderingContext2D;
	bird: Bird;
	sunflowers: Sunflower[];
	max_height: number;
	max_width: number;

	sunflowers_passed: number;
	dead: boolean;

	finish: Function;

	constructor(
		game_context: CanvasRenderingContext2D,
		max_width: number,
		max_height: number,
		finish: Function
	) {
		this.game_context = game_context;
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
		if (this.dead) {
			return;
		}
		this.game_context.clearRect(0, 0, 300, 150);
		this.update_sunflowers();
		this.bird.update();

		this.sunflowers.forEach((flower) => {
			if (flower.position < 120 && !flower.collision_checked) {
				if (
					this.bird.position < flower.vertical_position ||
					this.bird.position > flower.vertical_position + 40
				) {
					this.dead = true;
					this.finish();
				} else {
					scoreStore.update((n) => Math.min(5, n + 1));
				}

				flower.collision_checked = true;
			}
		});
	}

	update_sunflowers() {
		this.sunflowers.forEach((sunflower) => {
			sunflower.update();
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
