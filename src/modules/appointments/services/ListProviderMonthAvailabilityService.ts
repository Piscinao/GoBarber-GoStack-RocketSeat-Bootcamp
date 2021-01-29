import { injectable, inject } from 'tsyringe';
// isafter ou endofday
import { getDaysInMonth, getDate, isAfter } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

// interface com array
type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      },
    );

    // numero de dias no mês e ano
    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    // array [1, 2, 3, 4, 5, 6, 7, 8, 9] até o dia do mês
    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    // retorna todos os agendamentos de um dia específico
    const availability = eachDayArray.map(day => {
      // -1 no month por que o js começa a variavel no 0
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);

      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available:
          isAfter(compareDate, new Date()) && appointmentsInDay.length < 10,
      };
    });

    console.log(eachDayArray);
    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
