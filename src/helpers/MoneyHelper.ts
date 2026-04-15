export const moneyFormat = (money: number, roundingMode = "halfExpand") => {
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    // @ts-expect-error
    roundingMode: roundingMode,
  });

  return formatter.format(money);
};
