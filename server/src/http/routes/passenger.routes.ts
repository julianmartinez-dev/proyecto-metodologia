import { Application } from 'express';
import CommonRoutes from './common.routes';
import createPassengerAction from '../actions/passengers/create.passenger.action';
import updatePassengerAction from '../actions/passengers/update.passenger.action';
import listPassengerAction from '../actions/passengers/list.passenger.actions';

class PassengerRoutes extends CommonRoutes {
  constructor(app: Application) {
    super(app, 'Passenger');
  }
  setUpRoutes(): Application {
    this.app.get('/passenger/:identityCard', listPassengerAction.run);

    this.app.post('/passenger', createPassengerAction.run);

    this.app.put('/passenger/:id', updatePassengerAction.run);

    return this.app;
  }
}

export default PassengerRoutes;
