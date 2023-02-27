import type { FillerCard, PlaceholderCard } from './card';

export interface Deck {
	name: string;
	placeholderCards: PlaceholderCard[];
	fillerCards: FillerCard[];
}
