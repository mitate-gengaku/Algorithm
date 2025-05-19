/**
 * 空のマス型
 */
type EmptyCell = " ";

/**
 * ユーザー型
 */
type Player = "O" | "X";

/**
 * 指定できるインデックス型
 */
type Index = 0 | 1 | 2

/**
 * ポジション型
 */
type Position = [Index, Index]

/**
 * マス型
 */
type Cell = Player | EmptyCell

/**
 * 盤面型
 */
type Board = [
  [Cell, Cell, Cell],
  [Cell, Cell, Cell],
  [Cell, Cell, Cell]
]

/**
 * 初期の盤面型
 */
type InitialBoard = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "]
]

/**
 * マスが埋まっているか調べる型
 */
type GetCell<B extends Board, P extends Position> = B[P[0]][P[1]] extends " " ? true : false

/**
 * マスを指定して変更した盤面を返す型
 */
type SetCell<B extends Board, P extends Position, C extends Player> = {
  0: P extends [0, 0] ? [[C, B[0][1], B[0][2]], B[1], B[2]] : never,
  1: P extends [0, 1] ? [[B[0][0], C, B[0][2]], B[1], B[2]] : never,
  2: P extends [0, 2] ? [[B[0][0], B[0][1], C], B[1], B[2]] : never,
  3: P extends [1, 0] ? [B[0], [C, B[1][1], B[1][2]], B[2]] : never,
  4: P extends [1, 1] ? [B[0], [B[1][0], C, B[1][2]], B[2]] : never,
  5: P extends [1, 2] ? [B[0], [B[1][0], B[1][1], C], B[2]] : never,
  6: P extends [2, 0] ? [B[0], B[1], [C, B[2][1], B[2][2]]] : never,
  7: P extends [2, 1] ? [B[0], B[1], [B[2][0], C, B[2][2]]] : never,
  8: P extends [2, 2] ? [B[0], B[1], [B[2][0], B[2][1], C]] : never,
}

/**
 * never型を取り除くユーティリティ型
 */
type ValueOf<T> = T[keyof T]

/**
 * 行の勝利型
 */
type CheckRowWin<B extends Board, I extends Index, C extends Player> = B[I][0] extends C ? B[I][1] extends C ? B[I][2] extends C ? true : false : false : false


/**
 * 列の勝利型
 */
type CheckColWin<B extends Board, I extends Index, C extends Player> = B[0][I] extends C ? B[1][I] extends C ? B[2][I] extends C ? true : false : false : false


/**
 * 対角線の勝利型
 */
type CheckDiagonWin<B extends Board, C extends Player> =
  (
    B[0][0] extends C
    ? B[1][1] extends C
    ? B[2][2] extends C
    ? true
    : false
    : false
    : false
  ) extends true ? true
  : (B[0][2] extends C
    ? B[1][1] extends C
    ? B[2][0] extends C
    ? true
    : false
    : false
    : false
  )

/**
 * 
 */
type CheckAllWin<B extends Board, C extends Player> =
  CheckRowWin<B, 0, C> extends true ? true :
  CheckRowWin<B, 1, C> extends true ? true :
  CheckRowWin<B, 2, C> extends true ? true :
  CheckColWin<B, 0, C> extends true ? true :
  CheckColWin<B, 1, C> extends true ? true :
  CheckColWin<B, 2, C> extends true ? true :
  CheckDiagonWin<B, C> extends true ? true :
  false

/**
 * プレイする型
 */
type Play<B extends Board, P extends Position, C extends Player> = {
  board: GetCell<B, P> extends true ? ValueOf<SetCell<B, P, C>> : "すでに埋まっています",
  player: C
}

/**
 * 盤面を見やすいようにオブジェクト形式に変換する型
 */
type ConvertBoard<B extends Board> = {
  0: [B[0][0], B[0][1], B[0][2]],
  1: [B[1][0], B[1][1], B[1][2]],
  2: [B[2][0], B[2][1], B[2][2]],
}

/**
 * 勝利した場合、勝利文字列を返することで型エラーを起こす
 */
type CheckUserWin<B extends Board, P extends Position, C extends Player> =
  CheckAllWin<B, C> extends true ? {
    board: B,
    player: C,
    status: `${C}が勝利しました`,
  } : Play<B, P, C>

type Game = CheckUserWin<InitialBoard, [0, 0], "O">
type Game1 = CheckUserWin<Game["board"], [1, 0], "X">
type Game2 = CheckUserWin<Game1["board"], [0, 1], "O">
type Game3 = CheckUserWin<Game2["board"], [1, 1], "X">
type Game4 = CheckUserWin<Game3["board"], [0, 2], "O">

type FinalResult = ConvertBoard<Game4["board"]>