import type { AlphaLowerCaseChars } from './common';
import type tt from 'type-toolkit';
import type { AlphaLowerCase } from './extract.tzen';

namespace Extract {
  export type AlphaLowerCase<
    S extends string,
    T
  > = S extends `${infer H extends AlphaLowerCaseChars}${any}`
    ? H extends AlphaLowerCaseChars
      ? H
      : never
    : never;
}

type To = 'abc1' extends AlphaLowerCase<'abc1', infer T> ? [T] : never;
