import { randomUUID } from 'node:crypto';
import { Database } from '../database/index.js';
import { createResponseObject } from '../utils/create-response-object.js'
import { buildRoutePath } from '../utils/build-route-path.js';
import { createValidator, updateValidator } from '../utils/validators.js';
import { createTempCSVFile } from '../utils/create-temp-file.js';
import { parse } from 'csv-parse';
import fs from 'node:fs'

const database = new Database()

export const routeDefinition = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search,
      } : null);

      if (!tasks.length) {
        return res.writeHead(204).end();
      }

      return res.writeHead(200).end(JSON.stringify(tasks));
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      const validationResult = createValidator(
        ['title', 'description'],
        req.body
      );

      if (validationResult) {
        return res.writeHead(400).end(JSON.stringify(
          createResponseObject(null, validationResult)
        ));
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const result = database.insert('tasks', task);

      return res.writeHead(201).end(JSON.stringify(
        createResponseObject(result.insertedId, 'Task criada com sucesso!')
      ));
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      const result = database.delete('tasks', id);

      if (!result) {
        return res.writeHead(404).end(JSON.stringify(
          createResponseObject(null, 'Task não encontrada.')
        ));
      }

      res.writeHead(200).end(JSON.stringify(
        createResponseObject(result.deletedId, 'Task removida com sucesso!')
      ));
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      const updates = req.body;

      const validationResult = updateValidator(
        ['title', 'description'],
        req.body
      );

      if (validationResult) {
        return res.writeHead(400).end(JSON.stringify(
          createResponseObject(null, validationResult)
        ));
      }

      const [task] = database.select('tasks', { id });

      if (!task) {
        return res.writeHead(404).end(JSON.stringify(
          createResponseObject(null, 'Task não encontrada.')
        ));
      }

      if (task.completed_at) {
        return res.writeHead(409).end(JSON.stringify(
          createResponseObject(null, 'Task já foi concluída.')
        ));
      }

      const result = database.update('tasks', id, updates);

      res.writeHead(200).end(JSON.stringify(
        createResponseObject(result.updatedId, 'Task atualizada com sucesso!')
      ));
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params;
      const updates = { completed_at: new Date().toISOString() }

      const [task] = database.select('tasks', { id });

      if (!task) {
        return res.writeHead(404).end(JSON.stringify(
          createResponseObject(null, 'Task não encontrada.')
        ));
      }

      if (task.completed_at) {
        return res.writeHead(409).end(JSON.stringify(
          createResponseObject(null, 'Task já foi concluída.')
        ));
      }

      const result = database.update('tasks', id, updates);

      res.writeHead(200).end(JSON.stringify(
        createResponseObject(result.updatedId, 'Task concluída com sucesso!')
      ));
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks/upload'),
    handler: async (req, res) => {
      const file = await createTempCSVFile(req, res)

      if (!file.name) {
        return res.writeHead(500).end(JSON.stringify(
          createResponseObject(null, file.errorMessage)
        ))
      }

      const parser = fs.createReadStream(file.name).pipe(
        parse({ fromLine: 2 })
      );

      const insertedIds = [];
    
      for await (const record of parser) {
        const data = {
          title: record[0],
          description: record[1],
        }
    
        const validationResult = createValidator(
          ['title', 'description'],
          data
        );
  
        if (validationResult) {
          return res.writeHead(400).end(JSON.stringify(
            createResponseObject(null, validationResult)
          ));
        }
  
        const task = {
          id: randomUUID(),
          title: data.title,
          description: data.description,
          completed_at: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
  
        const result = database.insert('tasks', task);
        insertedIds.push(result.insertedId);
      }

      fs.unlinkSync(file.name);

      return res.writeHead(201).end(JSON.stringify(
        createResponseObject(insertedIds, 'Tasks importadas com sucesso!')
      ));
    }
  },
]