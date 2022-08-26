import React from 'react';
import { RecoilRoot } from 'recoil';
import { renderHook, act } from '@testing-library/react-hooks';
import { paginationAtom, useRecoilPagination } from './pagination';

let key = 0;

describe('Recoil Pagination', () => {
  beforeEach(() => {
    key++;
  });

  it('should set total', () => {
    const atom = paginationAtom({
      key: `pagination${key}`,
      default: {
        total: 0,
        page: 1,
        limit: 10,
        offset: 0,
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilPagination(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].setTotal(412);
    });

    expect(result.current[0]).toMatchObject({
      total: 412,
      page: 1,
      limit: 10,
      offset: 0,
    });
  });

  it('should set total using updater', () => {
    const atom = paginationAtom({
      key: `pagination${key}`,
      default: {
        total: 0,
        page: 1,
        limit: 10,
        offset: 0,
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilPagination(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].setTotal((prevTotal) => prevTotal + 412);
    });

    expect(result.current[0]).toMatchObject({
      total: 412,
      page: 1,
      limit: 10,
      offset: 0,
    });
  });

  it('should set page', () => {
    const atom = paginationAtom({
      key: `pagination${key}`,
      default: {
        total: 0,
        page: 1,
        limit: 10,
        offset: 0,
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilPagination(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].setPage(10);
    });

    expect(result.current[0]).toMatchObject({
      total: 0,
      page: 10,
      limit: 10,
      offset: 90,
    });
  });

  it('should set page using updated', () => {
    const atom = paginationAtom({
      key: `pagination${key}`,
      default: {
        total: 0,
        page: 1,
        limit: 10,
        offset: 0,
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilPagination(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].setPage((prevPage) => prevPage + 1);
    });

    expect(result.current[0]).toMatchObject({
      total: 0,
      page: 2,
      limit: 10,
      offset: 10,
    });
  });

  it('should set limit', () => {
    const atom = paginationAtom({
      key: `pagination${key}`,
      default: {
        total: 0,
        page: 4,
        limit: 10,
        offset: 0,
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilPagination(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].setLimit(13);
    });

    expect(result.current[0]).toMatchObject({
      total: 0,
      page: 4,
      limit: 13,
      offset: 39,
    });
  });

  it('should set limit using updater', () => {
    const atom = paginationAtom({
      key: `pagination${key}`,
      default: {
        total: 0,
        page: 4,
        limit: 10,
        offset: 0,
        meta: undefined,
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilPagination(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].setLimit((prevLimit) => prevLimit + 3);
    });

    expect(result.current[0]).toMatchObject({
      total: 0,
      page: 4,
      limit: 13,
      offset: 39,
    });
  });

  it('should set meta', () => {
    const atom = paginationAtom<string>({
      key: `pagination${key}`,
      default: {
        total: 0,
        page: 1,
        limit: 10,
        offset: 0,
        meta: '',
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilPagination(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].setMeta('metadata');
    });

    expect(result.current[0]).toMatchObject({
      total: 0,
      page: 1,
      limit: 10,
      offset: 0,
      meta: 'metadata',
    });
  });

  it('should set meta using updater', () => {
    const atom = paginationAtom<string>({
      key: `pagination${key}`,
      default: {
        total: 0,
        page: 1,
        limit: 10,
        offset: 0,
        meta: 'meta',
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilPagination(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].setMeta((prevMeta) => `${prevMeta}data`);
    });

    expect(result.current[0]).toMatchObject({
      total: 0,
      page: 1,
      limit: 10,
      offset: 0,
      meta: 'metadata',
    });
  });

  it('should reset pagination state', () => {
    const atom = paginationAtom<string>({
      key: `pagination${key}`,
      default: {
        total: 0,
        page: 1,
        limit: 10,
        offset: 0,
        meta: 'meta',
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <RecoilRoot>{children}</RecoilRoot>
    );
    const { result } = renderHook(() => useRecoilPagination(atom), {
      wrapper,
    });

    act(() => {
      result.current[1].setMeta('metas');
      result.current[1].setTotal(211);
      result.current[1].setPage(31);
      result.current[1].setLimit(3);
      result.current[1].reset();
    });

    expect(result.current[0]).toMatchObject({
      total: 0,
      page: 1,
      limit: 10,
      offset: 0,
      meta: 'meta',
    });
  });
});
