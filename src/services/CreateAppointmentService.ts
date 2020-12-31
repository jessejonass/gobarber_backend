import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * recebimento das informações
 * tratativa de erros/excessões
 * acesso ao repositório
 */

// request próprio / simula o request
interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    // possui todos os métodos de execução (find, create, etc)
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    // método criado por mim no repository
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    // se existe && erro
    if (findAppointmentInSameDate) {
      throw Error('This appointment already booked');
    }

    // create é um método ja presente no typeorm | não criado por mim
    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    // salvando registro no db
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
