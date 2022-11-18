import { Request, Response } from 'express';
import { UpdateAccommodationCommand } from '../../../application/commands/accommodation/update.accommodation.command';
import updateAccommodationHandler from '../../../application/handlers/accommodation/update.accommodation.handler';
import Joi from 'joi';

class UpdateAccommodationAction {
  async run(req: Request, res: Response) {
    const id = req.params.id;
    const { name, pricePerNight } = req.body;

    const control = Joi.object({
      id: Joi.string().guid().required(),
      name: Joi.string().min(3).max(50).required(),
      pricePerNight: Joi.number().min(1).required(),
    });

    const { error } = control.validate({ id, name, pricePerNight });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const command = new UpdateAccommodationCommand(id, name, Number(pricePerNight));

    try {
      await updateAccommodationHandler.execute(command);
      return res.status(200).json({ message: 'Accommodation updated successfully' });
    } catch (error) {
      const { message } = error as Error;
      return res.status(400).json({ message: message });
    }
  }
}

export default new UpdateAccommodationAction();
