import { Request, Response } from 'express';
import Joi from 'joi';
import { FindByIdentityCardCommand } from '../../../application/commands/passenger/findByIdentityCard.passenger.command';
import findPassengerHandler from '../../../application/handlers/passengers/find.passenger.handler';

class ListPassengersAction {
  async run(req: Request, res: Response) {
    const { identityCard } = req.params;

    const control = Joi.object({
      identityCard: Joi.string().min(8).max(9).required(),
    });

    const { error } = control.validate({ identityCard });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const command = new FindByIdentityCardCommand(identityCard);
    try {
      const passenger = await findPassengerHandler.execute(command);
      if (passenger) {
        return res.status(200).json({
          ...passenger,
        });
      } else {
        return res.status(404).json({ message: 'Passenger not found' });
      }
    } catch (error) {
      const { message } = error as Error;
      return res.status(500).json({ message: message });
    }
  }
}

export default new ListPassengersAction();
