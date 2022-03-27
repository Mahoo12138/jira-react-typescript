import { useCallback, useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
  const [state, setState] = useState<{
    past: T[];
    present: T;
    futrue: T[];
  }>({
    past: [],
    present: initialPresent,
    futrue: [],
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.futrue.length !== 0;

  const undo = useCallback(() => {
    // if(!canUndo)return
    setState((currentState) => {
      const { past, present, futrue } = currentState;
      if (past.length === 0) return currentState;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        futrue: [present, ...futrue],
      };
    });
  }, []);
  const redo = useCallback(() => {
    if (!canRedo) return;

    setState((currentState) => {
      const { past, present, futrue } = currentState;
      const next = futrue[0];
      const newFutrue = futrue.slice(1);

      return {
        past: [...past, present],
        present: next,
        futrue: newFutrue,
      };
    });
  }, []);

  const set = useCallback((newPresent: T) => {
    setState((currentState) => {
      const { past, present } = currentState;
      if (newPresent === present) {
        return currentState;
      }
      return {
        past: [...past, present],
        present: newPresent,
        futrue: [],
      };
    });
  }, []);
  const reset = useCallback((newPresent: T) => {
    setState((currentState) => {
      return {
        past: [],
        present: newPresent,
        futrue: [],
      };
    });
  }, []);
  return [state, { set, reset, undo, redo, canRedo, canUndo }];
};
