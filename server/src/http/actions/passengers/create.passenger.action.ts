import { Request, Response } from 'express';
import { CreatePassengerCommand } from '../../../application/commands/passenger/create.passenger.command';
import createPassengerHandler from '../../../application/handlers/passengers/create.passenger.handler';
import Joi from 'joi';

class CreatePassengerAction {
  async run(req: Request, res: Response) {
    const { fullName, email, identityCard } = req.body;

    const control = Joi.object({
      fullName: Joi.string().min(3).max(50).required(),

      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),

      identityCard: Joi.number().min(7).max(8).required(),
    });

    try {
      const value = control.validate({ fullName: fullName, email: email, identityCard: identityCard });
    } catch (error: any) {
      res.status(400).json({ messge: error.message });
    }
    try {
      const command = new CreatePassengerCommand(fullName, email, identityCard);
      await createPassengerHandler.execute(command);

      return res.status(201).json({ message: 'Passenger created successfully' });
    } catch (error) {
      const { message } = error as Error;
      res.status(400).json({ message: message });
    }
  }
}

export default new CreatePassengerAction();
