import { Bird } from './bird';
import { Sunflower } from './sunflower';

export class GameEngine {
	gameContext: CanvasRenderingContext2D;
	bird: Bird;
	sunflowers: Sunflower[];
	maxHeight: number;
	maxWidth: number;

	constructor(gameContext: CanvasRenderingContext2D, maxWidth: number, maxHeight: number) {
		this.gameContext = gameContext;
		this.bird = new Bird(gameContext, maxWidth, maxHeight);
		this.sunflowers = [];
		this.maxWidth = maxWidth;
		this.maxHeight = maxHeight;
	}

	makeSunFlower() {
		this.sunflowers.push(new Sunflower(this.gameContext, this.maxWidth, this.maxHeight));
	}

	update() {
		this.gameContext.clearRect(0, 0, 300, 150);
		this.update_sunflowers();
		this.bird.update();
	}

	update_sunflowers() {
		this.sunflowers.forEach((sunflower) => {
			sunflower.update();
		});
		this.sunflowers = this.sunflowers.filter((sunflower) => {
			return !sunflower.should_be_deleted();
		});
		if (!this.sunflowers.length) {
			this.makeSunFlower();
		}
	}
}
