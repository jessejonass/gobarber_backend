import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserservice {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersReporitory = getRepository(User);

    const checkUserExists = await usersReporitory.findOne({
      where: { email: email } // eslint-disable-line
    });

    if (checkUserExists) {
      throw new Error('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersReporitory.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersReporitory.save(user);

    return user;
  }
}

export default CreateUserservice;
