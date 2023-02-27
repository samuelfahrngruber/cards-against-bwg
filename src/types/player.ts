import { FillerCard } from "./card";

export interface Player {
    name: string;
    points: number;
    handCards: FillerCard;
    playedCards: FillerCard;
}