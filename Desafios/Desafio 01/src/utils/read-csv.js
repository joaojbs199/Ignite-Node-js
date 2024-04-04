import { parse } from 'csv-parse';
import fs from 'node:fs'

const csvPath = new URL('../../tasks.csv', import.meta.url);

(async () => {
  const parser = fs.createReadStream(csvPath).pipe(
    parse({ fromLine: 2 })
  );

  let count = 0;

  for await (const record of parser) {
    const task = {
      title: record[0],
      description: record[1],
    }

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
  }
})();
