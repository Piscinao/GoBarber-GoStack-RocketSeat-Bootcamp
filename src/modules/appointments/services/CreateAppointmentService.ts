import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

// SOLID
// INVERSÃO DE DEPENDENCIA
// A classe que o carquivo q precisa utilizar o service q sao as rotas informe qual é o repositorio

interface IRequest {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  // private appointmentsRepository: IAppointmentsRepository;

  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  // Toda vez que tem uma função assincrona retorna uma promise
  // eslint-disable-next-line camelcase
  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    // Verify appointment
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });
    return appointment;
  }
}

export default CreateAppointmentService;
