import { uuid } from 'uuidv4';
class Appointment {
  id: string;
  provider: string;
  date: Date;

  //Omit recebe os dois parametro e exclui uma propriedade
  constructor({provider, date}: Omit<Appointment, 'id'>)
  {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
