import React from 'react';
import { RecoilRoot } from 'recoil';
import { renderHook, act } from '@testing-library/react-hooks';
import { dialogAtom, useRecoilDialog } from './dialog';

let key = 0;

describe('Recoil Dialog', () => {
  beforeEach(() => {
    key++;
  });

  it('should set open state', () => {
    const atom = dialogAtom<undefined>({
      key: `dialog${key}`,
      default: {
        isOpen: false,
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilDialog(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].setOpen(true);
    });

    expect(result.current[0]).toMatchObject({
      isOpen: true,
      meta: undefined,
    });
  });

  it('should set open state using updater', () => {
    const atom = dialogAtom<undefined>({
      key: `dialog${key}`,
      default: {
        isOpen: true,
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilDialog(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].setOpen((isOpen) => !isOpen);
    });

    expect(result.current[0]).toMatchObject({
      isOpen: false,
      meta: undefined,
    });
  });

  it('should set open state to `true`', () => {
    const atom = dialogAtom<undefined>({
      key: `dialog${key}`,
      default: {
        isOpen: false,
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilDialog(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].open();
    });

    expect(result.current[0]).toMatchObject({
      isOpen: true,
      meta: undefined,
    });
  });

  it('should set open state to `true` and `meta` property', () => {
    const atom = dialogAtom<number>({
      key: `dialog${key}`,
      default: {
        isOpen: false,
        meta: 51,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilDialog(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].open(64);
    });

    expect(result.current[0]).toMatchObject({
      isOpen: true,
      meta: 64,
    });
  });

  it('should set open state to `false`', () => {
    const atom = dialogAtom<undefined>({
      key: `dialog${key}`,
      default: {
        isOpen: true,
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilDialog(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].close();
    });

    expect(result.current[0]).toMatchObject({
      isOpen: false,
      meta: undefined,
    });
  });

  it('should set meta', () => {
    const atom = dialogAtom<{ userId: string }>({
      key: `dialog${key}`,
      default: {
        isOpen: false,
        meta: { userId: '' },
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilDialog(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].setMeta({ userId: '1' });
    });

    expect(result.current[0]).toMatchObject({
      isOpen: false,
      meta: { userId: '1' },
    });
  });

  it('should set meta using updater', () => {
    const atom = dialogAtom<{ userId: string; commentId: string }>({
      key: `dialog${key}`,
      default: {
        isOpen: false,
        meta: { userId: '1', commentId: '' },
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilDialog(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].setMeta((prevMeta) => ({
        ...prevMeta,
        commentId: '42',
      }));
    });

    expect(result.current[0]).toMatchObject({
      isOpen: false,
      meta: { userId: '1', commentId: '42' },
    });
  });
});
