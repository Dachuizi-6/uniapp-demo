export function hotNum(val) {
  if (val < 100) return;
  val += "";
  return val.substring(0, val.length - 2) + "b";
}
