import { Card, PlaceholderCard } from "./card";
import { Deck } from "./deck";
import { Player } from "./player";

export interface Game {
    id: string;
    round: number;
    currentPlaceholderCard: PlaceholderCard;
    deck: Deck;
    players: Record<string, Player>;
}
