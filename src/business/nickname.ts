import { writable } from 'svelte/store';
import { getFirebaseUserInfo, updateFirebaseNickname } from './auth';

const createNickname = () => {
	const nickname = writable<string>(
		undefined,
		(set) => void getFirebaseUserInfo().then((userInfo) => set(userInfo.nickname))
	);

	return {
		subscribe: nickname.subscribe,
		setNickname: (newName: string) => {
			nickname.set(newName);
			updateFirebaseNickname(newName);
		}
	};
};

export const nickname = createNickname();
