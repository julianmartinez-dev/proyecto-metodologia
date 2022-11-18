import { Request, Response } from 'express';
import updateBookingHandler from '../../../application/handlers/booking/update.booking.handler';
import { UpdateBookingCommand } from '../../../application/commands/booking/update.booking.command';
import Joi from 'joi';
import { BookingStatus } from '../../../domain/entities/booking.entity';

class UpdateBookingAction {
  async run(req: Request, res: Response) {
    const { status } = req.body;
    const { id } = req.params;
    const schema = Joi.object({
      id: Joi.string().guid({ version: 'uuidv4' }).required(),
      status: Joi.string().equal('pending', 'accepted', 'rejected').required(),
    });

    const { error } = schema.validate({
      id,
      status,
    });

    if (error) return res.status(400).json({ message: error.message });

    const command = new UpdateBookingCommand(id, status as BookingStatus);

    try {
      await updateBookingHandler.execute(command);
      return res.status(200).json({ message: 'Booking status updated successfully' });
    } catch (error) {
      const { message } = error as Error;
      return res.status(400).json({ message: message });
    }
  }
}

export default new UpdateBookingAction();
