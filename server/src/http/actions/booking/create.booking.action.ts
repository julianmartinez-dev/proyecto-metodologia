import { Request, Response } from 'express';
import { CreateBookingCommand } from '../../../application/commands/booking/create.booking.command';
import createBookingHandler from '../../../application/handlers/booking/create.booking.handler';
import Joi from 'joi';
import { Passenger } from '../../../domain/entities/passenger.entity';
import { log } from 'debug';

class CreateBookingAction {
  async run(req: Request, res: Response) {
    const { owner, passengers, accomodation, from, to, status } = req.body;

    //Validations
    const schema = Joi.object({
      owner: Joi.object({
        id: Joi.string().required(),
        fullname: Joi.string().min(3).max(50).required(),
        email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
          .required(),
        identityCard: Joi.string().min(7).max(8).required(),
      }),
      passengers: Joi.array()
        .items({
          id: Joi.string().optional(),
          fullname: Joi.string().min(3).max(50).required(),
          email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
          identityCard: Joi.string().min(7).max(8).required(),
        })
        .min(1)
        .required(),
      accomodation: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().min(3).max(50).required(),
        pricePerNight: Joi.number().min(1).required(),
      }),
      from: Joi.date().required(),
      to: Joi.date().required(),
      status: Joi.string().valid('pending', 'approved', 'rejected').required(),
    });

    const { error } = schema.validate({
      owner,
      passengers,
      accomodation,
      from,
      to,
      status
    })
    
    if (error) return res.status(400).json({ message: error.message});


    try {
      const command = new CreateBookingCommand(owner, passengers, accomodation, from, to, status);
      await createBookingHandler.execute(command);

      return res.status(201).json({ message: 'Booking created successfully' });
    } catch (error) {
      const { message, stack } = error as Error;
      res.status(400).json({ message: message, stack });
    }
  }
}

export default new CreateBookingAction();

//Example of date in js (in this case, 2021-01-01)