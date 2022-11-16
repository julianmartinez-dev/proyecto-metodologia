import { Request, Response } from 'express';
import { CreateAccommodationCommand } from '../../../application/commands/accommodation/create.accommodation.command';
import createAccommodationHandler from '../../../application/handlers/accommodation/create.accommodation.handler';
import Joi from 'joi';

class CreateAccommodationAction {
  async run(req: Request, res: Response) {
    const { name, pricePerNight } = req.body;

    const control = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      pricePerNight: Joi.number().min(1).required(),
    });

    const { error } = control.validate({ name, pricePerNight });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    try {
      const command = new CreateAccommodationCommand(name, pricePerNight);
      await createAccommodationHandler.execute(command);

      return res.status(201).json({ message: 'Accommodation created successfully' });
    } catch (error) {
      const { message } = error as Error;
      res.status(400).json({ message: message });
    }
  }
}

export default new CreateAccommodationAction();
