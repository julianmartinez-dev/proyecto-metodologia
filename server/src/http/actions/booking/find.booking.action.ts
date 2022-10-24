import { Request, Response } from 'express';
import { findBookingCommands } from '../../../application/commands/booking/find.booking.command';
import findBookingHandler from '../../../application/handlers/booking/find.booking.handler';

class FindBookingAction{
    async run(req: Request, res: Response){

        const name: string= (req?.query?.name) as string;
        const from: string= (req?.query?.date) as string;

        const date: Date= new Date(from)

        const command= new findBookingCommands(name, date)
        const booking =await findBookingHandler.execute(command)
        if (!booking) {
            return res.status(404).json({ message: 'booking not found' });
          }
      
          return res.status(200).json({
            ...booking.toPrimitives(),
          });
        
    }
}
export default new FindBookingAction();