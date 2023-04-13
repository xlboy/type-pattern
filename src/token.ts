export enum TokenType {
  // [.]
  RangeBlock,
  // [^.]
  RangeBlockExclude,
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

