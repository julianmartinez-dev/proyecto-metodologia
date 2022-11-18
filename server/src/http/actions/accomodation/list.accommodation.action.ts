import { Request, Response } from 'express';
import findAccommodationHandler from '../../../application/handlers/accommodation/find.accommodation.handler';
import { findByNameAccommodationCommand } from '../../../application/commands/accommodation/findByName.accommodation.command';
import Joi from 'joi';
class listAccommodationAction {
  async run(req: Request, res: Response) {
    const { name } = req.params;
    const control = Joi.object({
      name: Joi.string().min(3).max(50).required(),
    });

    const { error } = control.validate({ name });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const command = new findByNameAccommodationCommand(name);
    const accommodation = await findAccommodationHandler.execute(command);
    if (!accommodation) {
      return res.status(404).json({ message: 'accommodation not found' });
    }

    return res.status(200).json({
      ...accommodation,
    });
  }
}
export default new listAccommodationAction();
