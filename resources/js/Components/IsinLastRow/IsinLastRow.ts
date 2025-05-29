export default function isInLastRow(index: number, total: number, itemsPerRow: number): boolean {
  const totalRows = Math.ceil(total / itemsPerRow);
  const itemRow = Math.floor(index / itemsPerRow) + 1;
  return itemRow === totalRows;
}