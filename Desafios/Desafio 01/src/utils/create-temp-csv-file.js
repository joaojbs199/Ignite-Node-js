import fs from 'node:fs'

export const createTempCSVFile = async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const streamContent = Buffer.concat(buffers).toString();

  const boundary = req.headers['content-type'].split('; ')[1].split('=')[1];
  const parts = streamContent.split(`--${boundary}`);

  for (let i = 1; i < parts.length - 1; i++) {
    const part = parts[i];
    const contentDisposition = part.split('\r\n')[1];
    const filenameMatch = contentDisposition.match(/filename="(.+)"/);

    if (filenameMatch) {
      const filename = filenameMatch[1];

      if (!filename.toLowerCase().endsWith('.csv')) {
        return {
          name: null,
          errorMessage: 'Apenas arquivos com extensão .csv são permitidos.'
        };
      }

      const fileData = part.split('\r\n\r\n')[1].trim();

      fs.writeFileSync(filename, fileData, { encoding: 'utf8' });

      return {
        name: filename,
        errorMessage: ''
      };
    } else {
      return {
        name: null,
        errorMessage: 'Erro ao no upload arquivo.'
      };
    }
  }
}