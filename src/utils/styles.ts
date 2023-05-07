import { SerializedStyles } from "@emotion/react";

export const applyOverride = (
  baseStyle: SerializedStyles,
  overrides: SerializedStyles | SerializedStyles[] | undefined,
  mustOverride: boolean
) => {
  if (mustOverride && overrides !== undefined) {
    const completeStyles = [baseStyle];

    if (Array.isArray(overrides)) {
      completeStyles.push(...overrides);
    } else {
      completeStyles.push(overrides);
    }

    return completeStyles;
  }

  return baseStyle;
};
