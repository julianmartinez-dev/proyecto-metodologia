import { Application } from 'express';
import CommonRoutes from './common.routes';
import createBookingAction from '../actions/booking/create.booking.action';

class BookingRoutes extends CommonRoutes {
    constructor(app: Application) {
      super(app, 'Booking');
    }
    setUpRoutes(): Application {
  
      this.app.post('/booking', createBookingAction.run);
  
      return this.app;
    }
  }
  
  export default BookingRoutes;