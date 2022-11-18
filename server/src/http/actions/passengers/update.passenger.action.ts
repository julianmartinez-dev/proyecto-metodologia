import { Request, Response } from 'express';
import updatePassengerHandler from '../../../application/handlers/passengers/update.passenger.handler';
import { UpdatePassengerCommand } from '../../../application/commands/passenger/update.passenger.command';
import Joi from 'joi';

class UpdatePassengerAction {
  async run(req: Request, res: Response) {
    const id = req.params.id;
    const { fullname, email, identityCard } = req.body;

    const control = Joi.object({
      id: Joi.string().guid().required(),
      fullname: Joi.string().min(3).max(50).required(),
      email: Joi.string().email().required(),
      identityCard: Joi.string().min(8).max(9).required(),
    });

    const { error } = control.validate({ id, fullname, email, identityCard });

    if (error) return res.status(400).json({ message: error.message });

    const command = new UpdatePassengerCommand(id, fullname, email, identityCard);

    try {
      await updatePassengerHandler.execute(command);
      return res.status(200).json({ message: 'Passenger updated successfully' });
    } catch (error) {
      const { message } = error as Error;
      return res.status(400).json({ message: message });
    }
  }
}

export default new UpdatePassengerAction();
