import { Request, Response } from 'express';
import accommodationRepository from '../../../infrastructure/repositories/accommodation.repository';

class listAccommodationAction{
    async run(req: Request, res: Response) {
        const { name } = req.params;
        const accommodation = await accommodationRepository.findOneByName(name);
    
        if (!accommodation) {
          return res.status(404).json({ message: 'accommodation not found' });
        }
    
        return res.status(200).json({
          ...accommodation.toPrimitives(),
        });
      }
}
export default new listAccommodationAction();