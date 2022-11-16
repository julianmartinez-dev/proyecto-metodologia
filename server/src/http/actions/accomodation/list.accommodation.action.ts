import { Request, Response } from 'express';
import findAccommodationHandler from '../../../application/handlers/accommodation/find.accommodation.handler';
import { findByNameAccommodationCommand } from '../../../application/commands/accommodation/findByName.accommodation.command';
class listAccommodationAction {
  async run(req: Request, res: Response) {
    const { name } = req.params;

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
