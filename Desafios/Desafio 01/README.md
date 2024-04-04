# API de Gerenciamento de Tasks

Este projeto é uma API desenvolvida em Node.js para o gerenciamento de tasks. Permite a importação de tasks via arquivo CSV, além de operações como criação, listagem, atualização, conclusão e remoção de tasks.

## Funcionalidades

- **Importação de Tasks via CSV:** Permite importar tasks através do envio de um arquivo CSV.
- **Criação de Tasks:** Permite a criação de uma nova task.
- **Listagem de Tasks:** Permite listar as tasks, com opção de filtro por nome e/ou descrição.
- **Atualização de Tasks:** Permite atualizar informações de uma task (se ainda não tiver sido concluída).
- **Conclusão de Tasks:** Permite marcar uma task como concluída (se ainda não tiver sido concluída).
- **Remoção de Tasks:** Permite remover uma task do sistema.

## Rotas

- **POST** - `/tasks/upload`: Rota para importação via CSV. Retorna um array com os IDs de tasks inseridos no caso de sucesso ou mensagens especificando possíveis erros.
  
- **POST** - `/tasks`: Rota para criar uma task. Retorna o ID da task inserida.
  
- **GET** - `/tasks`: Rota para buscar as tasks (com filtro ou sem).
  
- **PUT** - `/tasks/:id`: Rota para atualizar a task (um ou mais parâmetros). Retorna uma mensagem de sucesso e o ID da task atualizada ou uma mensagem de erro se a task não houver sido encontrada ou já tiver sido concluída.
  
- **DELETE** - `/tasks/:id`: Rota para remover uma task. Retorna uma mensagem de sucesso e o ID da task removida ou uma mensagem de erro se a task não houver sido encontrada.
  
- **PATCH** - `/tasks/:id/complete`: Rota para completar uma task. Retorna uma mensagem de sucesso e o ID da task concluída ou uma mensagem de erro se a task não houver sido encontrada ou já tiver sido concluída.

## Outros Detalhes

- **Verificação de Arquivo CSV:** Caso seja enviado um arquivo que não esteja no formato CSV, a API retornará um erro.
- **Verificação de Informações:** Antes de criar ou atualizar uma task, a API verifica se todas as informações necessárias estão presentes e são válidas.

## Instalação e Uso

1. Clone este repositório.
2. Instale as dependências utilizando `npm install`.
3. Inicie o servidor com `npm start`.
4. Acesse as rotas conforme descrito acima para interagir com a API.