export type ExprRule<Kind = any, Value = any> = {
  kind: Kind;
  value: Value;
};

export enum Kind {
  // abc
  CharSet,
  // (...)
  CaptureGroup,
  Repeat,
  // \d \w \s
  Escape,
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
};

/*


*/