import { writable } from 'svelte/store';

export const scoreStore = writable(0);

export const gameStore = writable(false);

export const telegramStore = writable(false);
