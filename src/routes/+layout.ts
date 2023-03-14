import type { Load } from '@sveltejs/kit';
import { getFirebaseUserInfo } from '../business/auth';

export const load: Load = async () => {
	await getFirebaseUserInfo();
};
