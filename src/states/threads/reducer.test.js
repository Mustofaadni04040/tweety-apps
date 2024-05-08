/**
 *
 * test scenario for threadsReducer
 * - threadReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the thread  when given by RECEIVE_THREADS action
 *  - should return new thread  when given by CREATE_THREAD action
 *  - should return the thread  with toggled UpVote when given by UP_VOTE_THREAD action
 *  - should return the thread with toggled DownVote when given by DOWN_VOTE_THREAD action
 *  - should return the thread without toggled UpVote and DownVote when given
 *    by NEUTRALIZE_VOTE_THREAD action
 */

import { describe, expect, it } from 'vitest';
import threadsReducer from './reducer';

describe('threadsReducer function', () => {
  it('should return the intial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the thread when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Satu',
            body: 'Ini adalah thread Satu',
            category: 'Welcome',
            createdAt: '2022-09-22T10:06:55.588Z',
            ownerId: 'user-1',
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return new thread when given by CREATE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Satu',
        body: 'Ini adalah thread Satu',
        category: 'Welcome',
        createdAt: '2022-09-22T10:06:55.588Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const action = {
      type: 'CREATE_THREAD',
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread Dua',
          body: 'Ini adalah thread dua',
          category: 'Welcome',
          createdAt: '2022-09-22T10:06:55.588Z',
          ownerId: 'user-2',
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should return the thread with toggled UpVote when given by UP_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Satu',
        body: 'Ini adalah thread Satu',
        category: 'Welcome',
        createdAt: '2022-09-22T10:06:55.588Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const action = {
      type: 'UP_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
        downVotesBy: [],
      },
    ]);
  });

  it('should return the thread with toggled DownVote when given by DOWN_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Satu',
        body: 'Ini adalah thread Satu',
        category: 'Welcome',
        createdAt: '2022-09-22T10:06:55.588Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const action = {
      type: 'DOWN_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [action.payload.userId],
      },
    ]);
  });

  it('should return the thread with toggled NeutralizeVote when given by NEUTRALIZE_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Satu',
        body: 'Ini adalah thread Satu',
        category: 'Welcome',
        createdAt: '2022-09-22T10:06:55.588Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const action = {
      type: 'NEUTRALIZE_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);
  });
});
