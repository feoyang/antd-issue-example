import { useAtomValue, useSetAtom } from 'jotai';
import { xlykTokensAtom } from './store';

export function useSetXLYKTokens() {
  return useSetAtom(xlykTokensAtom);
}

export function useXLYKTokens() {
  return useAtomValue(xlykTokensAtom);
}
