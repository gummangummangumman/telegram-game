import { img } from './Img';

export class Background {
	game_context: CanvasRenderingContext2D;
	image: HTMLImageElement;
	max_height: number;
	max_width: number;

	frames: number = 0;

	constructor(game_context: CanvasRenderingContext2D, max_width: number, max_height: number) {
		this.game_context = game_context;
		this.max_width = max_width;
		this.max_height = max_height;
		this.image = img('skyer.png');
	}

	update(game_over: boolean) {
		this.game_context.drawImage(this.image, -this.frames % this.max_width, 50);
		if (!game_over) {
			this.frames++;
		}
	}
}
