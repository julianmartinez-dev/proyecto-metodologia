import { Request, Response } from 'express';
import { UpdateAccomodationCommand } from '../../../application/commands/accomodation/update.accomodation.command';
import updateAccomodationHandler from '../../../application/handlers/accomodation/update.accomodation.handler';

class UpdateAccomoationAction {
  async run(req: Request, res: Response) {
    try {
      const command = new UpdateAccomodationCommand(req.params.id, req.body.name, req.body.pricePerNight);

      try {
        await updateAccomodationHandler.execute(command);
      } catch (error) {
        const { message } = error as Error;
        return res.status(400).json({ message: message });
      }

      return res.status(200).json({ message: 'Accommodation updated successfully' });
    } catch (error) {
      const { message } = error as Error;
      res.status(400).json({ message: message });
    }
  }
}

export default new UpdateAccomoationAction();
