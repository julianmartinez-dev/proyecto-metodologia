import { Request, Response } from 'express';
import Joi from 'joi';
import { findBookingCommands } from '../../../application/commands/booking/find.booking.command';
import findBookingHandler from '../../../application/handlers/booking/find.booking.handler';

class FindBookingAction {
  async run(req: Request, res: Response) {
    const name: string = req?.query?.name as string;
    const from: string = req?.query?.date as string;

    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      from: Joi.date().required(),
    });

    const { error } = schema.validate({
      name,
      from,
    });

    if (error) return res.status(400).json({ message: error.message });

    const date: Date = new Date(from);
    const command = new findBookingCommands(name, date);
    try {
      const booking = await findBookingHandler.execute(command);

      if (!booking) {
        return res.status(404).json({ message: 'booking not found' });
      }
      return res.status(200).json({
        ...booking,
      });
    } catch (error) {
      const { message } = error as Error;
      return res.status(500).json({ message: message });
    }
  }
}
export default new FindBookingAction();
