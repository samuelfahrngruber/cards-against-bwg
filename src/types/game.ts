import type { PlaceholderCard } from './card';
import type { Deck } from './deck';
import type { Player } from './player';

export interface Game {
	round: number;
	currentPlaceholderCard: PlaceholderCard;
	deck: Deck;
	players: Record<string, Player>;
	playerMaster: string;
}
