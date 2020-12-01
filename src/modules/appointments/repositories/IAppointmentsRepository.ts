import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromPoviderDTO from '../dtos/IFindAllInMonthProviderDTO';

export default interface IAppointmentsAppointments {
  // recebe informações e retorna o appointment criado CRIA E SALVA demora um pouco então é uma promise
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthProvider(
    data: IFindAllInMonthFromPoviderDTO,
  ): Promise<Appointment[]>;
}
