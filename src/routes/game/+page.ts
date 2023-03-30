import type { Load } from '@sveltejs/kit';
import { loadDecks } from '../../../../../../../Users/samue/src/cards-against-bwg/src/business/game-logic';

export const load: Load = async () => ({
	decks: await loadDecks()
});
