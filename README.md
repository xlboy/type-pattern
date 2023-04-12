# type-pattern

input: abc?

tokens: [
    { type: TokenType.AlphaLowerCase, value: 'a' },
    { type: TokenType.AlphaLowerCase, value: 'b' },
    { type: TokenType.AlphaLowerCase, value: 'c' },
    { type: TokenType.QuestionMark, value: '?' },
]

ast: [
    { kind: ASTKind.CharSet, value: 'ab' },
    { kind: ASTKind.Optional, value: { kind: ASTKind.CharSet, value: 'c' } }
]