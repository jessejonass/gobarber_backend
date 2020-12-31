import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
// extendendo metodos
class AppointmentsRepository extends Repository<Appointment> {
  // ? encontrar appointment : null
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date: date }, // eslint-disable-line
    });

    return findAppointment || null; // !findAppointment && null
  }
}

export default AppointmentsRepository;
