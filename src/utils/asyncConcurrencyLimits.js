// utils/asyncConcurrencyLimits.js
export async function runWithConcurrencyLimit(items, concurrency, taskFn) {
  const results = [];
  let i = 0;

  const workers = new Array(concurrency).fill(null).map(async () => {
    while (i < items.length) {
      const index = i++;
      results[index] = await taskFn(items[index]);
    }
  });

  await Promise.all(workers);
  return results;
}
