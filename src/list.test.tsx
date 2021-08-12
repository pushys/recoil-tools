import React from 'react';
import { RecoilRoot } from 'recoil';
import { renderHook, act } from '@testing-library/react-hooks';
import { listAtom, useRecoilList } from './list';

let key = 0;

describe('Recoil List', () => {
  beforeEach(() => {
    key++;
  });

  it('should set data', () => {
    const atom = listAtom<number, undefined>({
      key: `list${key}`,
      default: {
        data: [],
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilList(atom), { wrapper });

    act(() => {
      result.current[1].setData([1, 2, 3]);
    });

    expect(result.current[0]).toMatchObject({
      data: [1, 2, 3],
      meta: undefined,
    });
  });

  it('should set data using updater', () => {
    const atom = listAtom<number, undefined>({
      key: `list${key}`,
      default: {
        data: [1, 2],
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilList(atom), { wrapper });

    act(() => {
      result.current[1].setData((prevData) => [...prevData, 3, 4]);
    });

    expect(result.current[0]).toMatchObject({
      data: [1, 2, 3, 4],
      meta: undefined,
    });
  });

  it('should clear data', () => {
    const atom = listAtom<number, undefined>({
      key: `list${key}`,
      default: {
        data: [1, 2, 3],
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilList(atom), { wrapper });

    act(() => {
      result.current[1].clearData();
    });

    expect(result.current[0]).toMatchObject({
      data: [],
      meta: undefined,
    });
  });

  it('should set meta', () => {
    const atom = listAtom<number, string>({
      key: `list${key}`,
      default: {
        data: [],
        meta: '',
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilList(atom), { wrapper });

    act(() => {
      result.current[1].setMeta('meta data');
    });

    expect(result.current[0]).toMatchObject({
      data: [],
      meta: 'meta data',
    });
  });

  it('should set meta using updater', () => {
    const atom = listAtom<number, string>({
      key: `list${key}`,
      default: {
        data: [],
        meta: 'meta',
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilList(atom), { wrapper });

    act(() => {
      result.current[1].setMeta((prevMeta) => `${prevMeta} data`);
    });

    expect(result.current[0]).toMatchObject({
      data: [],
      meta: 'meta data',
    });
  });

  it('should push items', () => {
    const atom = listAtom<number, undefined>({
      key: `list${key}`,
      default: {
        data: [1, 2],
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilList(atom), { wrapper });

    act(() => {
      result.current[1].push(3, 4);
    });

    expect(result.current[0]).toMatchObject({
      data: [1, 2, 3, 4],
      meta: undefined,
    });
  });

  it('should unshift items', () => {
    const atom = listAtom<number, undefined>({
      key: `list${key}`,
      default: {
        data: [1, 2],
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilList(atom), { wrapper });

    act(() => {
      result.current[1].unshift(3, 4);
    });

    expect(result.current[0]).toMatchObject({
      data: [3, 4, 1, 2],
      meta: undefined,
    });
  });

  it('should update item at particular index', () => {
    const atom = listAtom<number, undefined>({
      key: `list${key}`,
      default: {
        data: [1, 2, 3, 4],
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilList(atom), { wrapper });

    act(() => {
      result.current[1].updateAt(2, 10);
    });

    expect(result.current[0]).toMatchObject({
      data: [1, 2, 10, 4],
      meta: undefined,
    });
  });

  it('should update first found item using predicate', () => {
    const atom = listAtom<number, undefined>({
      key: `list${key}`,
      default: {
        data: [1, 2, 3, 4],
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilList(atom), { wrapper });

    act(() => {
      result.current[1].update((item) => item === 1 || item === 4, 10);
    });

    expect(result.current[0]).toMatchObject({
      data: [10, 2, 3, 4],
      meta: undefined,
    });
  });

  it('should update all found items using predicate', () => {
    const atom = listAtom<number, undefined>({
      key: `list${key}`,
      default: {
        data: [1, 2, 3, 4],
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilList(atom), { wrapper });

    act(() => {
      result.current[1].updateAll((item) => item === 1 || item === 4, 10);
    });

    expect(result.current[0]).toMatchObject({
      data: [10, 2, 3, 10],
      meta: undefined,
    });
  });

  it('should remove item at particular index', () => {
    const atom = listAtom<number, undefined>({
      key: `list${key}`,
      default: {
        data: [1, 2, 3, 4],
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilList(atom), { wrapper });

    act(() => {
      result.current[1].removeAt(3);
    });

    expect(result.current[0]).toMatchObject({
      data: [1, 2, 3],
      meta: undefined,
    });
  });

  it('should remove first found item using predicate', () => {
    const atom = listAtom<number, undefined>({
      key: `list${key}`,
      default: {
        data: [1, 2, 3, 4],
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilList(atom), { wrapper });

    act(() => {
      result.current[1].remove((item) => item === 2 || item === 3);
    });

    expect(result.current[0]).toMatchObject({
      data: [1, 3, 4],
      meta: undefined,
    });
  });

  it('should remove all found items using predicate', () => {
    const atom = listAtom<number, undefined>({
      key: `list${key}`,
      default: {
        data: [1, 2, 3, 4],
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilList(atom), { wrapper });

    act(() => {
      result.current[1].removeAll((item) => item === 2 || item === 3);
    });

    expect(result.current[0]).toMatchObject({
      data: [1, 4],
      meta: undefined,
    });
  });

  it('should filter items', () => {
    const atom = listAtom<number, undefined>({
      key: `list${key}`,
      default: {
        data: [1, 2, 3, 4, 5],
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilList(atom), { wrapper });

    act(() => {
      result.current[1].filter((item) => item % 2 === 0);
    });

    expect(result.current[0]).toMatchObject({
      data: [2, 4],
      meta: undefined,
    });
  });

  it('should sort items', () => {
    const atom = listAtom<number, undefined>({
      key: `list${key}`,
      default: {
        data: [5, 1, 2, 4, 3],
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilList(atom), { wrapper });

    act(() => {
      result.current[1].sort((item1, item2) => item1 - item2);
    });

    expect(result.current[0]).toMatchObject({
      data: [1, 2, 3, 4, 5],
      meta: undefined,
    });
  });

  it('should reverse items', () => {
    const atom = listAtom<number, undefined>({
      key: `list${key}`,
      default: {
        data: [1, 2, 3, 4, 5],
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilList(atom), { wrapper });

    act(() => {
      result.current[1].reverse();
    });

    expect(result.current[0]).toMatchObject({
      data: [5, 4, 3, 2, 1],
      meta: undefined,
    });
  });
});
