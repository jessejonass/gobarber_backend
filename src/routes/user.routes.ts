import { Router } from 'express';

import CreateUserservice from '../services/CreateUserservice';

const usersRouter = Router();

/**
 * repositories
 * services
 */

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body; // passar como interface para o service

    const createUser = new CreateUserservice();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
