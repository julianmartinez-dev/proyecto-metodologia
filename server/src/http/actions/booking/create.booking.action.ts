import { Request, Response } from 'express';
import { CreateBookingCommand } from '../../../application/commands/booking/create.booking.command';
import createBookingHandler from '../../../application/handlers/booking/create.booking.handler';
import Joi from 'joi';

class CreateBookingAction {
  async run(req: Request, res: Response) {
    const { owner, passengers, accomodation, from, to } = req.body;

    //Validations
    const schema = Joi.object({
      owner: Joi.string().guid({ version: 'uuidv4' }).required(),
      passengers: Joi.array()
        .items(Joi.string().guid({ version: 'uuidv4' }))
        .required(),
      accomodation: Joi.string().guid({ version: 'uuidv4' }).required(),
      from: Joi.date().required(),
      to: Joi.date().required(),
    });

    const { error } = schema.validate({
      owner,
      passengers,
      accomodation,
      from,
      to,
    });

    if (error) return res.status(400).json({ message: error.message });

    try {
      const command = new CreateBookingCommand(owner, passengers, accomodation, from, to);
      await createBookingHandler.execute(command);

      return res.status(201).json({ message: 'Booking created successfully' });
    } catch (error) {
      const { message, stack } = error as Error;
      res.status(400).json({ message: message, stack });
    }
  }
}

export default new CreateBookingAction();
