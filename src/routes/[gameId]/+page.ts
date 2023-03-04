import type { Load } from '@sveltejs/kit';
import { getFirebaseUserInfo } from '../../business/auth';
import { game } from '../../business/game';

export const load: Load = async ({ params }) => {
	if (params.gameId != undefined) {
		await getFirebaseUserInfo();
		game.joinGame(params.gameId);
	}
};
