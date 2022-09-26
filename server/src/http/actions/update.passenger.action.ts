import { Request, Response } from 'express';
import { UpdatePassengerCommand } from "C:/Users/Usuario/Desktop/Repo Metodología/proyecto-metodologia/server/src/application/commands/update.passenger.command";
import updatePassengerHandler from "C:/Users/Usuario/Desktop/Repo Metodología/proyecto-metodologia/server/src/application/handlers/passengers/update.passenger.handler";

class UpdatePassengerAction {
  async run(req: Request, res: Response) {
    try {
      const command = new UpdatePassengerCommand(
        req.params.id,
        req.body.fullname,
        req.body.email,
        req.body.identityCard,
      );

      try {
        await updatePassengerHandler.execute(command);
      } catch (error) {
        const { message } = error as Error;
        return res.status(400).json({ message: message });
      }

      return res.status(200).json({ message: 'Passenger updated successfully' });
    } catch (error) {
      const { message } = error as Error;
      res.status(400).json({ message: message });
    }
  }
}

export default new UpdatePassengerAction();