import { Request, Response } from 'express';
import { FindByIdentityCardCommand } from '../../../application/commands/passenger/findByIdentityCard.passenger.command';
import findPassengerHandler from '../../../application/handlers/passengers/find.passenger.handler';

class ListPassengersAction {
  async run(req: Request, res: Response) {
    const { identityCard } = req.params;

    console.log('identityCard', identityCard);

    if(identityCard === "") {
      res.status(400).send({ message: 'identityCard is required' });
      return;
    }

    const command = new FindByIdentityCardCommand(identityCard);
    try {
      const passenger = await findPassengerHandler.execute(command);
      if (!passenger) {
        return res.status(404).json({ message: 'Passenger not found' });
      }
      return res.status(200).json({
        ...passenger.toPrimitives(),
      });
    } catch (error) {
      const { message } = error as Error;
      return res.status(500).json({ message: message });
    }
  }
}

export default new ListPassengersAction();
