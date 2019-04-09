export interface Game {
    _id?: string;
    name: string;
    complexity: number;
    highestScore: number;
    highestScorer: string;
    imagelink?: string;
}