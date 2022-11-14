export function transformTimestamp(
  ms: number,
  format: string | undefined = "R"
): `<t:${string}:${string}>` {
  const inSeconds = (ms / 1000).toFixed(0);
  return `<t:${inSeconds}:${format}>`;
}
