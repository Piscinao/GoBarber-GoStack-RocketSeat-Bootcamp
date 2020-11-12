import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsAppointments {
  // create(): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
