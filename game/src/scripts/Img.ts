//easy Image constructor to set src
export function img(src: string): HTMLImageElement {
	const image = new Image();
	image.src = src;
	return image;
}
