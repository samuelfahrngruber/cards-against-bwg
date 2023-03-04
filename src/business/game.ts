import {
	addDoc,
	collection,
	doc,
	DocumentReference,
	getDoc,
	getFirestore,
	updateDoc
} from 'firebase/firestore';
import { writable, type Readable } from 'svelte/store';
import type { Game } from '../types/game';
import type { Player } from '../types/player';
import { getFirebaseUserInfo } from './auth';
import { firebaseApp } from './firebase';

export type GameStore = Readable<Game | undefined> & {
	joinGame: (gameId: string) => Promise<void>;
	hostGame: () => void;
};

type GameRef = DocumentReference<Game>;

const firestore = getFirestore(firebaseApp);

const gameCollection = collection(firestore, 'game');

const referenceGame = (gameId: string) => doc(firestore, 'game', gameId) as GameRef;
const insertGame = async (game: Game) => (await addDoc(gameCollection, game)) as GameRef;
const updateGameAddPlayer = async (gameRef: GameRef, playerId: string, player: Player) =>
	await updateDoc(gameRef, { [`players.${playerId}`]: player });
const getGame = async (gameRef: GameRef) => (await getDoc(gameRef)).data();

const createGame = (): GameStore => {
	const combined = writable<Game | undefined>(undefined);

	return {
		subscribe: combined.subscribe,
		joinGame: async (gameId) => {
			const gameRef = referenceGame(gameId);
			const userInfo = await getFirebaseUserInfo();
			const player: Player = {
				name: userInfo.nickname,
				playedCards: [],
				handCards: [],
				points: 0
			};
			await updateGameAddPlayer(gameRef, userInfo.id, player);
			const game = await getGame(gameRef);
			combined.set(game);
		},
		hostGame: () => undefined
	};
};

export const game = createGame();
