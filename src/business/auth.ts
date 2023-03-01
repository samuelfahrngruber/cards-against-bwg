import { getAuth, signInAnonymously, type User } from 'firebase/auth';
import { derived, readable, writable, type Readable } from 'svelte/store';
import { firebaseApp } from './firebase';

export type AuthStore = Readable<{ firebaseUser: User | undefined; nickname: string }> & {
	setNickname: (nickname: string) => void;
};

const defaultUsernames = ['Nicer Dicer', 'Detlef D Soost'];
const pickRandomDefaultName = () =>
	defaultUsernames[Math.floor(Math.random() * defaultUsernames.length)];

const firebaseAuth = getAuth(firebaseApp);
const logIntoFirebase = async () => (await signInAnonymously(firebaseAuth)).user;

const createAuth = (): AuthStore => {
	const firebaseUser = readable<User | undefined>(undefined, (set) => {
		logIntoFirebase().then((user) => set(user));
	});

	const nickname = writable<string>(pickRandomDefaultName());

	const combined = derived([firebaseUser, nickname], ([firebaseUser, nickname]) => ({
		firebaseUser,
		nickname
	}));

	return {
		subscribe: combined.subscribe,
		setNickname: nickname.set
	};
};

export const auth = createAuth();
