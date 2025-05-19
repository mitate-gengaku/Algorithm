/**
 * ## BuildArray
 * 
 * @param {number} L - 生成する配列の長さ
 * @param {unknown[]} A - 生成された配列
 * 
 * @example
 * type Result = BulidArray(3) // [unknown, unknown, unknown]
 * 
 * @description
 * 引数Lと同じ長さの配列を生成する
 * 配列AがLと等しくなるまで再帰的に繰り返す
 */
type BuildArray<L extends number, A extends unknown[] = []> = A["length"] extends L ? A : BuildArray<L, [...A, unknown]>

/**
 * ## Num(数値型)
 * 
 * @param {number} N - 数値型
 * @returns {number} 入力された数値型をそのまま返す
 * 
 * @example 
 * type Result = Num<5> // 5
 * 
 * @description
 * 入力された数値型をそのまま返す
 */
type Num<N extends number> = N;

/**
 * LessThan(数値の比較)
 * 
 * @param {number} A - 比較対象元
 * @param {number} B - 比較対象
 * 
 * @example
 * type Result = LessThan<5, 0> // true
 * 
 * @description
 * AがBより小さい場合trueを返す
 * それ以外はfalseを返す
 * 以下の動作を表している
 * a > b ? true : false
 */
type LessThan<A extends number, B extends number> =
  A extends B
  ? false
  : BuildArray<A> extends [...BuildArray<B>, ...infer Rest]
  ? false
  : true
  
/**
 * ## Add - 加算
 * 
 * @param {number} A - 被加数
 * @param {number} B - 加数
 * @returns {number} 加算結果を数値型として返す
 * 
 * @example
 * // 3 + 4 = 7
 * type Result = Add<3, 4> // 7
 * 
 * @description
 * 1. 引数A, Bの長さの配列を生成
 * 2. 生成した配列を結合する
 * 3. 結合した配列の長さが加算の結果となる
 */
type Add<A extends number, B extends number> = [...BuildArray<A>, ...BuildArray<B>]["length"]

/**
 * ## Sub(減算)
 * 
 * @param {number} A - 被減数
 * @param {number} B - 減数
 * @returns {number} 減算結果を数値型として返す
 * 
 * @example
 * type Result = Sub<10, 5> // 5
 * 
 * @description
 * #### 引数Aが引数Bより大きい場合
 * 1. 引数Aの長さの配列から引数Bの配列の長さ分を取り除いた残りの部分Restを返す
 * 
 * #### 引数Bが引数Aより大きい場合
 * 1. 引数Bの長さの配列から引数Aの配列の長さ分を取り除いた残りの部分Restを返す
 */
type Sub<A extends number, B extends number> = BuildArray<A> extends [...BuildArray<B>, ...infer Rest]
  ? Rest['length']
  : BuildArray<B> extends [...BuildArray<A>, ...infer Rest]
  ? Rest["length"]
  : never

/**
 * Multi(乗算)
 * 
 * @param {number} A - 被乗数
 * @param {number} B - 乗数
 * @returns {number} 乗算結果を数値型として返す
 * 
 * @example
 * type Result = Multi<4, 9> // 36
 * 
 * @description
 * 再帰的にBを1ずつ減らして結果RにAを足す
 */
type Multi<A extends number, B extends number, R extends number = 0> =
  A extends 0 ?
  R : B extends 0 ?
  R : Multi<A, Sub<B, 1>, Add<R, A> extends number ? Add<R, A> : never>;


/**
 * ## Div(除算)
 * 
 * @param {number} A - 被除数
 * @param {number} B - 除数
 * @returns {number} 除算結果を数値型として返す
 * 
 * @example
 * type Result = Div<24, 8> // 3
 * 
 * @description
 * 被除数が0になるまで再帰的に減算を繰り返し、結果Rに1ずつ足していく
 */
type Div<A extends number, B extends number, R extends number = 0> =
  A extends 0 ?
  R : B extends 0 ?
  R : LessThan<A, B> extends false ?
  Div<Sub<A, B>, B, Add<R, 1> extends number ? Add<R, 1> : never> : "計算できません"


// 計算
type add42 = Add<4, 2> // 6
type sub54 = Sub<5, 4> // 1
type sub105 = Sub<10, 5> // 5
type multi04 = Multi<0, 4> // 0
type multi40 = Multi<4, 0> // 0
type multi14 = Multi<1, 4> // 4
type multi101 = Multi<10, 1> // 10
type multi52 = Multi<5, 2> // 10
type multi49 = Multi<4, 9> // 36
type multi37 = Multi<3, 7> // 21
type div205 = Div<20, 5> // 4
type div248 = Div<24, 8> // 3
type div824 = Div<8, 28> // 計算できません