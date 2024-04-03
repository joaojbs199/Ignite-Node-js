import { randomUUID } from 'node:crypto';
import { Database } from '../database/index.js';
import { createResponseObject } from '../utils/create-response-object.js'
import { buildRoutePath } from '../utils/build-route-path.js';

const routes = {
  tasks: '/tasks'
};

const tables = {
  tasks: 'tasks'
}

const database = new Database()

export const routeDefinition = [
  {
    method: 'GET',
    path: buildRoutePath(routes.tasks),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select(tables.tasks, search ? {
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
    path: buildRoutePath(routes.tasks),
    handler: (req, res) => {
      const { title, description } = req.body
      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const result = database.insert(tables.tasks, task);

      return res.writeHead(201).end(JSON.stringify(
        createResponseObject(result.insertedId, 'Task criada com sucesso!')
      ));
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath(`${routes.tasks}/:id`),
    handler: (req, res) => {
      const { id } = req.params;

      const result = database.delete(tables.tasks, id);

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
    path: buildRoutePath(`${routes.tasks}/:id`),
    handler: (req, res) => {
      const { id } = req.params;
      const updates = req.body

      const result = database.update(tables.tasks, id, updates);

      if (!result) {
        return res.writeHead(404).end(JSON.stringify(
          createResponseObject(null, 'Task não encontrada.')
        ));
      }

      res.writeHead(200).end(JSON.stringify(
        createResponseObject(result.updatedId, 'Task atualizada com sucesso!')
      ));
    }
  }
]