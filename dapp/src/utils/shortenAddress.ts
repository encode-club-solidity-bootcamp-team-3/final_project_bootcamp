export const shortenAddress = (
  address: `0x${string}`,
  startLength: number = 4,
  endLength: number = 4,
  bullets: number = 3
) =>
  `${address.slice(0, startLength)}${Array.from({ length: bullets })
    .map(() => "•")
    .join("")}${endLength ? address.slice(-endLength) : ""}`;
