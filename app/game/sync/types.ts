export interface Player {
    id: string,
    nickname: string
}

export type Direction = "up" | "down" | "left" | "right";

export type OutgoingMessageSender = (action: string, args?: any[]) => void;