export enum Color {
  White,
  Black
}

export enum FENChar {
  WhitePawn = 'P',
  WhiteKnight = 'N',
  WhiteBishop = 'B',
  WhiteRook = 'R',
  WhiteQueen = 'Q',
  WhiteKing = 'K',
  BlackPawn = 'p',
  BlackKnight = 'n',
  BlackBishop = 'b',
  BlackRook = 'r',
  BlackQueen = 'q',
  BlackKing = 'k'

}

export const FENCharReverseMapping: { [key: string]: keyof typeof FENChar } = {
  'P': 'WhitePawn',
  'N': 'WhiteKnight',
  'B': 'WhiteBishop',
  'R': 'WhiteRook',
  'Q': 'WhiteQueen',
  'K': 'WhiteKing',
  'p': 'BlackPawn',
  'n': 'BlackKnight',
  'b': 'BlackBishop',
  'r': 'BlackRook',
  'q': 'BlackQueen',
  'k': 'BlackKing'
}




export type Coords = {
  x: number;
  y: number;
}

export const pieceImagePath: Readonly<Record<string, string>> = {
  'P': "../../assets/white_pawn.svg",
  'N': "../../assets/white_knight.svg",
  'B': "../../assets/white_bishop.svg",
  'R': "../../assets/white_rook.svg",
  'Q': "../../assets/white_queen.svg",
  'K': "../../assets/white_king.svg",
  'p': "../../assets/black_pawn.svg",
  'n': "../../assets/black_knight.svg",
  'b': "../../assets/black_bishop.svg",
  'r': "../../assets/black_rook.svg",
  'q': "../../assets/black_queen.svg",
  'k': "../../assets/black_king.svg"
}
