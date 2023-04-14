export enum TokenType {
  // [.]
  RangeBlock,
  // [^.]
  RangeBlockExclude,
  RangeBlock_Number,
  RangeBlock_AlphaLowerCase,
  RangeBlock_AlphaUppercase,
  // (.)
  CaptureGroup,
  Repeat,
  // \*
  Escape,
  // a
  NormalChar,
  // ?
  OneOrNone,
  // .
  AnyChar,
  // |
  Or,
  // *
  NullOrMore,
  // +
  OneOrMore,
  // ^
  ExpressionStart,
  // $
  ExpressionEnd
}
