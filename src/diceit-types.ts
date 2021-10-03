export enum Stage { Reg, Run, Done }
export enum CurrentPlayer { Owner, Challenger }

export type Player = {
  turn: number
  score: number
  stop: boolean
}

export type Game = {
  id: number
  owner: string
  challenger: string
  stage: Stage
  maxScore: number
  maxTurn: number
  currentPlayer: CurrentPlayer
  ownerPlayer: Player
  challengerPlayer: Player
  winner: string
  bet: number
}
