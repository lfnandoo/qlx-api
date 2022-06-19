export default function splitArrayIntoChunksOfLen<T>(list: T[], length: number): T[][] {
  const chunks = [];
  let i = 0;
  const n = list.length;

  while (i < n) {
    chunks.push(list.slice(i, (i += length)));
  }

  return chunks;
}

export { splitArrayIntoChunksOfLen };
