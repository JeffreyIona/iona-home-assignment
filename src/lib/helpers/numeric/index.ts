export default function numeric(value?: number | string | null, defaultValue?: number): number | undefined {
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
}
