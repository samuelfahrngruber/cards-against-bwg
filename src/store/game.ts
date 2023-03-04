import { writable, type Readable } from 'svelte/store';
import { joinGame, newGame } from '../business/game-logic';
import type { Deck } from '../types/deck';
import type { Game } from '../types/game';

export type GameStore = Readable<Game | undefined> & {
	joinGame: (gameId: string) => Promise<void>;
	newGame: (deck: Deck) => Promise<void>;
};

const createGame = (): GameStore => {
	const combined = writable<Game | undefined>(undefined);

	return {
		subscribe: combined.subscribe,
		joinGame: async (gameId) => {
			const game = await joinGame(gameId);
			combined.set(game);
		},
		newGame: async (deck: Deck) => {
			newGame(deck);
		}
	};
};

export const game = createGame();
