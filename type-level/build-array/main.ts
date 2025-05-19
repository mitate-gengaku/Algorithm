/**
 * 引数Lと同じ長さの配列を生成する
 * 配列AがLと等しくなるまで再帰的に繰り返す
 */
type BuildArray<L extends number, A extends unknown[] = []> = A["length"] extends L ? A : BuildArray<L, [...A, unknown]>

type Array7 = BuildArray<7>
type Array7Length = BuildArray<7>["length"]
type IsLength7 = Array7Length extends 7 ? true : false;
