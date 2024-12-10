export enum CardStatus {
    Default = 'default',
    Flipped = 'flipped',
    Matched = 'matched'
}

export interface CardData {
    imageId: string,
    status: CardStatus
}