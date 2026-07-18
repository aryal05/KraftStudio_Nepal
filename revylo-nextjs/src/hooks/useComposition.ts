import * as React from "react";

/**
 * Hook to handle Input Method Editor (IME) composition events
 * Used for CJK (Chinese, Japanese, Korean) language input
 */
export function useComposition() {
  const [isComposing, setIsComposing] = React.useState(false);

  const onCompositionStart = React.useCallback(() => {
    setIsComposing(true);
  }, []);

  const onCompositionEnd = React.useCallback(() => {
    setIsComposing(false);
  }, []);

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      // Prevent Enter key from submitting while composing
      if (isComposing && event.key === "Enter") {
        event.preventDefault();
      }
    },
    [isComposing]
  );

  return {
    isComposing,
    onCompositionStart,
    onCompositionEnd,
    onKeyDown,
  };
}
