import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

// Controllers astraem a lógica das rotas, recebe requisição repassa para outro arquivo resolver e recebe as respostas

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    // String to Date
    const parsedDate = parseISO(date);

    // toda a vez que for utilizar o service passa o repositorio como parâmetro
    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  }
}
