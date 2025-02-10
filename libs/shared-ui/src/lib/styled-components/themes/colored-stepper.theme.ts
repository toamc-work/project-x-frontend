export type ColorTuple = [string, string, string];
export type VariantsKeys = 'default' | 'primary';

export const variants: Record<VariantsKeys, ColorTuple> = {
  default: ['rgb(242,113,33)', 'rgb(233,64,87)', 'rgb(138,35,135)'],
  primary: ['rgb(52,152,219)', 'rgb(41,128,185)', 'rgb(44,62,80)'],
} as const;
