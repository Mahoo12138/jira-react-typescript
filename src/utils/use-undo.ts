import { useCallback, useReducer, useState } from "react";

type State<T> = {
  past: T[];
  present: T;
  future: T[];
};
enum ActionType {
  UNDO = "UNDO",
  REDO = "REDO",
  SET = "SET",
  RESET = "RESET",
}
type Action<T> = {
  newPresent?: T;
  type: ActionType;
};
const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { type, newPresent } = action;

  switch (type) {
    case ActionType.UNDO: {
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }
    case ActionType.REDO: {
      const next = future[0];
      const newFutrue = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFutrue,
      };
    }
    case ActionType.SET: {
      if (newPresent === present) {
        return state;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }
    case ActionType.RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
  }
};
export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>);

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    dispatch({ type: ActionType.UNDO });
  }, []);
  const redo = useCallback(() => {
    dispatch({ type: ActionType.REDO });
  }, []);

  const set = useCallback((newPresent: T) => {
    dispatch({ type: ActionType.SET, newPresent });
  }, []);
  const reset = useCallback((newPresent: T) => {
    dispatch({ type: ActionType.RESET, newPresent });
  }, []);
  return [state, { set, reset, undo, redo, canRedo, canUndo }];
};
