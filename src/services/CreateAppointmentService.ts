/* eslint-disable camelcase */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * recebimento das informações
 * tratativa de erros/excessões
 * acesso ao repositório
 */

// request próprio / simula o request
interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    // possui todos os métodos de execução (find, create, etc)
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    // método criado por mim no repository
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    // se existe && erro
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment already booked', 400);
    }

    // create é um método ja presente no typeorm | não criado por mim
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    // salvando registro no db
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
