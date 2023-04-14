import type tt from 'type-toolkit'
import type { Lexer } from '../lexer'

type Tokens = tt.O.Simplify<Lexer<'qq:\\d+'>>

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false;

type Checker<T extends true[]> = T;
