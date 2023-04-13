export type ErrorWrapper<Msg extends string> = {
  status: 'token-error';
  message: Msg;
};

export type TokenWrapper<Type, Value = null> = [Type, Value]