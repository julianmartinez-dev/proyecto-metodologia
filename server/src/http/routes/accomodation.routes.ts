import { Application } from 'express';
import createAccommodationAction from '../actions/accomodation/create.accommodation.action';
import updateAccommodationAction from '../actions/accomodation/update.accommodation.action';
import CommonRoutes from './common.routes';

class AccommodationRoutes extends CommonRoutes {
  constructor(app: Application) {
    super(app, 'Accomodation');
  }
  setUpRoutes(): Application {
    //TODO: Change console.log for the correct action

    this.app.post('/accommodation', createAccommodationAction.run);

    this.app.get('/accommodation/name', (req, res) => console.log('Not implemented yet'));

    this.app.put('/accommodation/:id', updateAccommodationAction.run);

    return this.app;
  }
}

export default AccommodationRoutes;
