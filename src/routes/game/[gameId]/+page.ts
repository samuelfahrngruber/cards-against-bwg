import type { Load } from '@sveltejs/kit';
import { game } from '../../../store/game';

export const load: Load = async ({ params }) => {
	if (params.gameId != undefined) {
		game.joinGame(params.gameId);
	}
};
