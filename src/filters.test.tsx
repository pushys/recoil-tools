import React from 'react';
import { RecoilRoot } from 'recoil';
import { renderHook, act } from '@testing-library/react-hooks';
import { filtersAtom, useRecoilFilters } from './filters';

let key = 0;

describe('Recoil Filters', () => {
  beforeEach(() => {
    key++;
  });

  it('should set open state', () => {
    const atom = filtersAtom<{}>({
      key: `filters${key}`,
      default: {
        isOpen: false,
        isApplied: false,
        values: {},
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilFilters(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].setOpen(true);
    });

    expect(result.current[0]).toMatchObject({
      isOpen: true,
      isApplied: false,
      values: {},
    });
  });

  it('should set open state using updater', () => {
    const atom = filtersAtom<{}>({
      key: `filters${key}`,
      default: {
        isOpen: true,
        isApplied: false,
        values: {},
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilFilters(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].setOpen((isOpen) => !isOpen);
    });

    expect(result.current[0]).toMatchObject({
      isOpen: false,
      isApplied: false,
      values: {},
    });
  });

  it('should set open state to `true`', () => {
    const atom = filtersAtom<{}>({
      key: `filters${key}`,
      default: {
        isOpen: false,
        isApplied: false,
        values: {},
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilFilters(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].open();
    });

    expect(result.current[0]).toMatchObject({
      isOpen: true,
      isApplied: false,
      values: {},
    });
  });

  it('should set open state to `false`', () => {
    const atom = filtersAtom<{}>({
      key: `filters${key}`,
      default: {
        isOpen: true,
        isApplied: false,
        values: {},
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilFilters(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].close();
    });

    expect(result.current[0]).toMatchObject({
      isOpen: false,
      isApplied: false,
      values: {},
    });
  });

  it('should apply values', () => {
    const atom = filtersAtom<{ userId: string }>({
      key: `filters${key}`,
      default: {
        isOpen: false,
        isApplied: false,
        values: { userId: '' },
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilFilters(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].apply({ userId: '1' });
    });

    expect(result.current[0]).toMatchObject({
      isOpen: false,
      isApplied: true,
      values: { userId: '1' },
    });
  });

  it('should apply values using updater', () => {
    const atom = filtersAtom<{ userId: string; categoryId: string }>({
      key: `filters${key}`,
      default: {
        isOpen: false,
        isApplied: false,
        values: { userId: '3', categoryId: '' },
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilFilters(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].apply((prevValues) => ({
        ...prevValues,
        categoryId: '1',
      }));
    });

    expect(result.current[0]).toMatchObject({
      isOpen: false,
      isApplied: true,
      values: { userId: '3', categoryId: '1' },
    });
  });

  it('should reset filters state', () => {
    const atom = filtersAtom<{ userId: string }>({
      key: `filters${key}`,
      default: {
        isOpen: false,
        isApplied: false,
        values: { userId: '3' },
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilFilters(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].apply({ userId: '8' });
      result.current[1].open();
      result.current[1].reset();
    });

    expect(result.current[0]).toMatchObject({
      isOpen: false,
      isApplied: false,
      values: { userId: '3' },
    });
  });
});
