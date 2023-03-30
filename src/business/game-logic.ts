import {
	addDoc,
	collection,
	doc,
	DocumentReference,
	getDoc,
	getDocs,
	getFirestore,
	updateDoc
} from 'firebase/firestore';
import type { Deck } from '../types/deck';
import type { Game } from '../types/game';
import type { Identifyable } from '../types/identifyable';
import type { Player } from '../types/player';
import { getFirebaseUserInfo, type FirebaseUserInfo } from './auth';
import { firebaseApp } from './firebase';

const shuffled = <T>(arr: Array<T>): Array<T> =>
	arr === undefined ? [] : [...arr].sort(() => Math.random() - 0.5);
const shuffleDeck = (deck: Deck): Deck => ({
	...deck,
	placeholderCards: shuffled(deck.placeholderCards),
	fillerCards: shuffled(deck.fillerCards)
});

type GameRef = DocumentReference<Game>;

const firestore = getFirestore(firebaseApp);

const gameCollection = collection(firestore, 'game');
const deckCollection = collection(firestore, 'deck');

const referenceGame = (gameId: string) => doc(firestore, 'game', gameId) as GameRef;
const insertGame = async (game: Game) => (await addDoc(gameCollection, game)) as GameRef;
const updateGameAddPlayer = async (gameRef: GameRef, playerId: string, player: Player) =>
	await updateDoc(gameRef, { [`players.${playerId}`]: player });
const getGame = async (gameRef: GameRef) => (await getDoc(gameRef)).data();

const newPlayer = (userInfo: FirebaseUserInfo): Player => ({
	name: userInfo.nickname,
	playedCards: [],
	handCards: [],
	points: 0
});

export const joinGame = async (gameId: string): Promise<Game | undefined> => {
	const gameRef = referenceGame(gameId);
	const userInfo = await getFirebaseUserInfo();
	const player = newPlayer(userInfo);
	await updateGameAddPlayer(gameRef, userInfo.id, player);
	const game = await getGame(gameRef);
	return game;
};

export const newGame = async (deck: Deck) => {
	deck = shuffleDeck(deck);
	const currentPlaceholderCard = deck.placeholderCards.pop();
	if (!currentPlaceholderCard) {
		throw new Error('Seems this deck was empty! Could not create a game');
	}
	const userInfo = await getFirebaseUserInfo();
	const game: Game = {
		round: 0,
		currentPlaceholderCard,
		deck,
		players: { [userInfo.id]: newPlayer(userInfo) },
		playerMaster: userInfo.id
	};
	const gameRef = await insertGame(game);
	console.log(`Created new game ${gameRef.id}`);
	return gameRef.id;
};

export const loadDecks = async () =>
	(await getDocs(deckCollection)).docs.map((docSnapshot) => docSnapshot.data() as Deck);

export const loadGames = async () =>
	(await getDocs(gameCollection)).docs.map(
		(docSnapshot) => ({ ...docSnapshot.data(), id: docSnapshot.id } as Identifyable<Game>)
	);
