import { EntityRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../entities/Appointment';

// repositorio específico para o typeorm

@EntityRepository(Appointment)
// SOLID LISKOV SUBSTITUTION PRINCIPLE - camadas que sao integrações com bibliotecas como db e tal
// devem ser possível ser substituidas com um conjunto de regras
// escopo de regra para o respositorio com o implements
class AppointmentsRepository
  extends Repository<Appointment>
  implements IAppointmentsRepository {
  // quando chama a função findBydate.then(reponse =>)
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment;
  }
}

export default AppointmentsRepository;
