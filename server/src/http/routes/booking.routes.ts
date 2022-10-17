import { Application } from 'express';
import CommonRoutes from './common.routes';
import createBookingAction from '../actions/booking/create.booking.action';
import updateBookingAction from '../actions/booking/update.booking.action';

class BookingRoutes extends CommonRoutes {
  constructor(app: Application) {
    super(app, 'Booking');
  }
  setUpRoutes(): Application {
    this.app.post('/booking', createBookingAction.run);

    this.app.put('/booking/:id', updateBookingAction.run);

    return this.app;
  }
}

export default BookingRoutes;
