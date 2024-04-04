export function createValidator(fields, data) {
  const receivedFields = Object.keys(data);

  const missingFields = []

  fields.forEach((field) => {
    if (!receivedFields.includes(field)) {
      missingFields.push(field)
    }
  });

  if (!missingFields.length) return null;

  const plural = missingFields.length > 1;
    return `Campo${plural ? 's' : ''}: | ${missingFields.join(' | ')} | ${plural ? 'são obrigatórios.' : 'é obrigatório.'}`;
}

export function updateValidator(fields, data) {
  const receivedFields = Object.keys(data);

  const wrongFields = []

  receivedFields.forEach((field) => {
    if (!fields.includes(field)) {
      wrongFields.push(field)
    }
  });

  if (!wrongFields.length) return null;

  const plural = wrongFields.length > 1;
    return `Campo${plural ? 's' : ''}: | ${wrongFields.join(' | ')} | ${plural ? 'não existem na task.' : 'não existe na task.'}`;
}