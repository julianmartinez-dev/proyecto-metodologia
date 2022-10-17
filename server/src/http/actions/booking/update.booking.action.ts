import { Request, Response } from 'express';
import updatePassengerHandler from '../../../application/handlers/passengers/update.passenger.handler';
import { UpdatePassengerCommand } from '../../../application/commands/passenger/update.passenger.command';

class UpdateBookingAction {
  async run(req: Request, res: Response) {
    try {
      const command = new UpdateBookingCommand(req.params.id, req.body.fullName, req.body.email, req.body.identityCard);

      try {
        await updatePassengerHandler.execute(command);
      } catch (error) {
        const { message } = error as Error;
        return res.status(400).json({ message: message });
      }

      return res.status(200).json({ message: 'Booking state updated successfully' });
    } catch (error) {
      const { message } = error as Error;
      res.status(400).json({ message: message });
    }
  }
}

export default new UpdateBookingAction();
