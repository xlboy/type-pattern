import type { Utils, O } from 'type-toolkit';
import type { Lexer } from './lexer.tzen';
import type { MainMatcher } from './main-matcher.tzen';
import type * as Extract from './extract.tzen';
import type { ErrorWrapper, TokenWrapper } from './common';
import type { TokenType } from '../token';
import type { RangeBlock } from './range-block.tzen';

type _Extract = {
  Escape: Checker<
    [
      Equal<Extract.Escape<'\\'>, false>,
      Equal<Extract.Escape<'\\1'>, ['', TokenWrapper<TokenType.Escape, '1'>]>,
      Equal<
        Extract.Escape<'\\几哈哈哈哈'>,
        ['哈哈哈哈', TokenWrapper<TokenType.Escape, '几'>]
      >
    ]
  >;
  NormalChar: Checker<
    [
      Equal<Extract.NormalChar<'ab'>, ['b', TokenWrapper<TokenType.NormalChar, 'a'>]>,
      Equal<
        Extract.NormalChar<'abcd2_'>,
        ['bcd2_', TokenWrapper<TokenType.NormalChar, 'a'>]
      >
    ]
  >;
  OneOrNone: Checker<
    [
      Equal<Extract.OneOrNone<'?ab'>, ['ab', TokenWrapper<TokenType.OneOrNone>]>,
      Equal<Extract.OneOrNone<'?abcd2_'>, ['abcd2_', TokenWrapper<TokenType.OneOrNone>]>
    ]
  >;
  AnyChar: Checker<
    [
      Equal<Extract.AnyChar<'.ab'>, ['ab', TokenWrapper<TokenType.AnyChar>]>,
      Equal<Extract.AnyChar<'.abcd2_'>, ['abcd2_', TokenWrapper<TokenType.AnyChar>]>
    ]
  >;
  Or: Checker<
    [
      Equal<Extract.Or<'|ab'>, ['ab', TokenWrapper<TokenType.Or>]>,
      Equal<Extract.Or<'|abcd2_'>, ['abcd2_', TokenWrapper<TokenType.Or>]>
    ]
  >;
  NullOrMore: Checker<
    [
      Equal<Extract.NullOrMore<'*ab'>, ['ab', TokenWrapper<TokenType.NullOrMore>]>,
      Equal<Extract.NullOrMore<'*abcd2_'>, ['abcd2_', TokenWrapper<TokenType.NullOrMore>]>
    ]
  >;
  OneOrMore: Checker<
    [
      Equal<Extract.OneOrMore<'+ab'>, ['ab', TokenWrapper<TokenType.OneOrMore>]>,
      Equal<Extract.OneOrMore<'+abcd2_'>, ['abcd2_', TokenWrapper<TokenType.OneOrMore>]>
    ]
  >;
  ExpressionStart: Checker<
    [
      Equal<
        Extract.ExpressionStart<'^ab'>,
        ['ab', TokenWrapper<TokenType.ExpressionStart>]
      >,
      Equal<
        Extract.ExpressionStart<'^abcd2_'>,
        ['abcd2_', TokenWrapper<TokenType.ExpressionStart>]
      >
    ]
  >;
  ExpressionEnd: Checker<
    [
      Equal<Extract.ExpressionEnd<'$ab'>, ['ab', TokenWrapper<TokenType.ExpressionEnd>]>,
      Equal<
        Extract.ExpressionEnd<'$abcd2_'>,
        ['abcd2_', TokenWrapper<TokenType.ExpressionEnd>]
      >
    ]
  >;
  Repeat: Checker<
    [
      Equal<
        Extract.Repeat<'{1,2}ab'>,
        ['ab', TokenWrapper<TokenType.Repeat, { type: 'range'; value: [1, 2] }>]
      >,
      Equal<
        Extract.Repeat<'{1,}ab'>,
        ['ab', TokenWrapper<TokenType.Repeat, { type: 'min'; value: 1 }>]
      >,
      Equal<
        Extract.Repeat<'{,2}ab'>,
        ['ab', TokenWrapper<TokenType.Repeat, { type: 'max'; value: 2 }>]
      >,
      Equal<
        Extract.Repeat<'{1}ab'>,
        ['ab', TokenWrapper<TokenType.Repeat, { type: 'exact'; value: 1 }>]
      >
    ]
  >;
  RangeBlock: Checker<
    [
      Equal<
        RangeBlock<'[a-z]ab'>,
        [
          'ab',
          TokenWrapper<
            TokenType.RangeBlock,
            [TokenWrapper<TokenType.RangeBlock_AlphaLowerCase, ['a', 'z']>]
          >
        ]
      >,
      Equal<
        RangeBlock<'[a-z0-9]ab'>,
        [
          'ab',
          TokenWrapper<
            TokenType.RangeBlock,
            [
              TokenWrapper<TokenType.RangeBlock_AlphaLowerCase, ['a', 'z']>,
              TokenWrapper<TokenType.RangeBlock_Number, ['0', '9']>
            ]
          >
        ]
      >
    ]
  >;
};

namespace Matcher {
  type Main = Checker<
    [
      Equal<MainMatcher<'ab'>, ['b', TokenWrapper<TokenType.NormalChar, 'a'>]>,
      Equal<MainMatcher<'\\ab'>, ['b', TokenWrapper<TokenType.Escape, 'a'>]>,
      Equal<MainMatcher<'?ab'>, ['ab', TokenWrapper<TokenType.OneOrNone>]>,
      Equal<MainMatcher<'.ab'>, ['ab', TokenWrapper<TokenType.AnyChar>]>,
      Equal<MainMatcher<'|ab'>, ['ab', TokenWrapper<TokenType.Or>]>,
      Equal<MainMatcher<'*ab'>, ['ab', TokenWrapper<TokenType.NullOrMore>]>,
      Equal<MainMatcher<'+ab'>, ['ab', TokenWrapper<TokenType.OneOrMore>]>,
      Equal<MainMatcher<'^ab'>, ['ab', TokenWrapper<TokenType.ExpressionStart>]>,
      Equal<MainMatcher<'$ab'>, ['ab', TokenWrapper<TokenType.ExpressionEnd>]>,
      Equal<
        MainMatcher<'{1,2}ab'>,
        ['ab', TokenWrapper<TokenType.Repeat, { type: 'range'; value: [1, 2] }>]
      >,
      Equal<
        MainMatcher<'{1,}ab'>,
        ['ab', TokenWrapper<TokenType.Repeat, { type: 'min'; value: 1 }>]
      >,
      Equal<
        MainMatcher<'{,2}ab'>,
        ['ab', TokenWrapper<TokenType.Repeat, { type: 'max'; value: 2 }>]
      >,
      Equal<
        MainMatcher<'{1}ab'>,
        ['ab', TokenWrapper<TokenType.Repeat, { type: 'exact'; value: 1 }>]
      >,
      Equal<MainMatcher<'{1 }ab'>, ['1 }ab', TokenWrapper<TokenType.NormalChar, '{'>]>,
      Equal<
        MainMatcher<'{ 1,2}ab'>,
        [' 1,2}ab', TokenWrapper<TokenType.NormalChar, '{'>]
      >,
      Equal<MainMatcher<'{ 1}ab'>, [' 1}ab', TokenWrapper<TokenType.NormalChar, '{'>]>,
      Equal<MainMatcher<'{ 1,}ab'>, [' 1,}ab', TokenWrapper<TokenType.NormalChar, '{'>]>,
      Equal<MainMatcher<'{ ,2}ab'>, [' ,2}ab', TokenWrapper<TokenType.NormalChar, '{'>]>
    ]
  >;
}

type _Lexer = {
  Main: Checker<
    [
      Equal<
        Lexer<'ab'>,
        [TokenWrapper<TokenType.NormalChar, 'a'>, TokenWrapper<TokenType.NormalChar, 'b'>]
      >,
      Equal<
        Lexer<'^ab, 1?b*.+'>,
        [
          TokenWrapper<TokenType.ExpressionStart>,
          TokenWrapper<TokenType.NormalChar, 'a'>,
          TokenWrapper<TokenType.NormalChar, 'b'>,
          TokenWrapper<TokenType.NormalChar, ','>,
          TokenWrapper<TokenType.NormalChar, ' '>,
          TokenWrapper<TokenType.NormalChar, '1'>,
          TokenWrapper<TokenType.OneOrNone>,
          TokenWrapper<TokenType.NormalChar, 'b'>,
          TokenWrapper<TokenType.NullOrMore>,
          TokenWrapper<TokenType.AnyChar>,
          TokenWrapper<TokenType.OneOrMore>
        ]
      >,
      Equal<
        Lexer<'^1{1,2}'>,
        [
          TokenWrapper<TokenType.ExpressionStart>,
          TokenWrapper<TokenType.NormalChar, '1'>,
          TokenWrapper<TokenType.Repeat, { type: 'range'; value: [1, 2] }>
        ]
      >,
      Equal<
        Lexer<'^1[a-zdd\\d][^1]'>,
        [
          TokenWrapper<TokenType.ExpressionStart>,
          TokenWrapper<TokenType.NormalChar, '1'>,
          TokenWrapper<
            TokenType.RangeBlock,
            [
              TokenWrapper<TokenType.RangeBlock_AlphaLowerCase, ['a', 'z']>,
              TokenWrapper<TokenType.NormalChar, 'd'>,
              TokenWrapper<TokenType.NormalChar, 'd'>,
              TokenWrapper<TokenType.Escape, 'd'>
            ]
          >,
          TokenWrapper<
            TokenType.RangeBlockExclude,
            [TokenWrapper<TokenType.NormalChar, '1'>]
          >
        ]
      >
    ]
  >;
};

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false;

type Checker<T extends true[]> = T;
