import { Request, Response } from 'express';
import updateBookingHandler from '../../../application/handlers/booking/update.booking.handler';
import { UpdateBookingCommand } from '../../../application/commands/booking/update.booking.command';

class UpdateBookingAction {
  async run(req: Request, res: Response) {
    try {
      const command = new UpdateBookingCommand(req.params.id, req.body.status);

      try {
        await updateBookingHandler.execute(command);
      } catch (error) {
        const { message } = error as Error;
        return res.status(400).json({ message: message });
      }

      return res.status(200).json({ message: 'Booking status updated successfully' });
    } catch (error) {
      const { message } = error as Error;
      res.status(400).json({ message: message });
    }
  }
}

export default new UpdateBookingAction();
