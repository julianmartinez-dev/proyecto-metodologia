import { Request, Response } from 'express';
import { Passenger } from '../../../domain/entities/passenger.entity';
import passengerRepository from '../../../infrastructure/repositories/passenger.repository';

class ListPassengersAction {
  async run(req: Request, res: Response) {
    const { identityCard } = req.params;
    const passenger = await passengerRepository.findOneByIdentityCard(identityCard);

    if (!passenger) {
      return res.status(404).json({ message: 'Passenger not found' });
    }

    return res.status(200).json({
      ...passenger.toPrimitives(),
    });
  }
}

export default new ListPassengersAction();