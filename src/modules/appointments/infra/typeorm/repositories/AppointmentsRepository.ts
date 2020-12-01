import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthProviderDTO';

import Appointment from '../entities/Appointment';

// repositorio específico para o typeorm

// SOLID LISKOV SUBSTITUTION PRINCIPLE - camadas que sao integrações com bibliotecas como db e tal
// devem ser possível ser substituidas com um conjunto de regras
// escopo de regra para o respositorio com o implements
class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    // get repository basicamente cria o repository
    this.ormRepository = getRepository(Appointment);
  }

  // quando chama a função findBydate.then(reponse =>)
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async findAllInMonthProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    // Se o mes estiver apenas 1 ele vai fazer 01
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY' ) = '${parsedMonth}-${year}'`,
        ),
      },
    });
    return appointments;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
