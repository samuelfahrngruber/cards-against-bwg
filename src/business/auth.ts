import { getAuth, signInAnonymously, updateProfile } from 'firebase/auth';
import { firebaseApp } from './firebase';

const defaultUsernames = ['Nicer Dicer', 'Detlef D Soost'];
export const pickRandomDefaultName = () =>
	defaultUsernames[Math.floor(Math.random() * defaultUsernames.length)];

const firebaseAuth = getAuth(firebaseApp);

const getFirebaseUser = async () => (await signInAnonymously(firebaseAuth)).user;

export const getFirebaseUserInfo = async () => {
	const user = await getFirebaseUser();
	let nickname = user.displayName;
	if (nickname === undefined || nickname === null) {
		nickname = pickRandomDefaultName();
		updateFirebaseNickname(nickname);
	}
	return {
		id: user.uid,
		nickname
	};
};

export const updateFirebaseNickname = async (nickname: string) => {
	const user = await getFirebaseUser();
	updateProfile(user, { displayName: nickname });
};
