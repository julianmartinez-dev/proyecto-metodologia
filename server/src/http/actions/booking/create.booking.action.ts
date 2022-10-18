import { Request, Response } from 'express';
import { CreateBookingCommand } from '../../../application/commands/booking/create.booking.command';
import createBookingHandler from '../../../application/handlers/booking/create.booking.handler';

class CreateBookingAction {
  async run(req: Request, res: Response) {
    const { id, owner, passengers, accomodation, from, to, status } = req.body;

    try {
      const command = new CreateBookingCommand(id, owner, passengers, accomodation, from, to, status);
      await createBookingHandler.execute(command);

      return res.status(201).json({ message: 'Booking created successfully' });
    } catch (error) {
      const { message } = error as Error;
      res.status(400).json({ message: message });
    }
  }
}

export default new CreateBookingAction();
