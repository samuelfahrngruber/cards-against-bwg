import type { Load } from '@sveltejs/kit';
import { loadGames } from '../business/game-logic';

export const load: Load = async () => ({
	games: await loadGames()
});
