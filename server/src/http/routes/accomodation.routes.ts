import { Application } from 'express';
import createAccommodationAction from '../actions/accomodation/create.accommodation.action';
import updateAccomodationAction from '../actions/accomodation/update.accomodation.action';
import listAccommodationAction from '../actions/accomodation/list.accommodation.action';
import CommonRoutes from './common.routes';


class AccomodationRoutes extends CommonRoutes {
  constructor(app: Application) {
    super(app, 'Accomodation');
  }
  setUpRoutes(): Application {
    //TODO: Change console.log for the correct action

    this.app.post('/accomodation', createAccommodationAction.run);

    this.app.get('/accomodation/:name',listAccommodationAction.run);

    this.app.put('/accomodation/:id', updateAccomodationAction.run);

    return this.app;
  }
}

export default AccomodationRoutes;
