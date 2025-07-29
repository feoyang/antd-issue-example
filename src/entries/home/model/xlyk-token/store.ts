import { atom } from 'jotai';

export const xlykTokensAtom = atom<{ ApiToken: string | undefined; userToken: string | undefined}>({
  ApiToken: undefined,
  userToken: undefined,
});
