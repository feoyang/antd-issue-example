import { useAtomValue, useSetAtom } from 'jotai';
import { accountAtoms } from './store';

export function useSetToken() {
  return useSetAtom(accountAtoms.token);
}

export function useToken() {
  return useAtomValue(accountAtoms.token);
}

export function useSetXlykToken() {
  return useSetAtom(accountAtoms.xlykToken);
}

export function useXlykToken() {
  return useAtomValue(accountAtoms.xlykToken);
}

export function useSetUser() {
  return useSetAtom(accountAtoms.selfInfo);
}

export function useUser() {
  return useAtomValue(accountAtoms.selfInfo);
}
