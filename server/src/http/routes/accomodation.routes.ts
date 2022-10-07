import { Application } from 'express';
import updateAccomodationAction from '../actions/accomodation/update.accomodation.action';
import CommonRoutes from './common.routes';

class AccomodationRoutes extends CommonRoutes {
  constructor(app: Application) {
    super(app, 'Accomodation');
  }
  setUpRoutes(): Application {
    //TODO: Change console.log for the correct action

    this.app.post('/accomodation', (req, res) => console.log('Not implemented yet'));

    this.app.get('/accomodation/name', (req, res) => console.log('Not implemented yet'));

    this.app.put('/accomodation/:id', updateAccomodationAction.run);

    return this.app;
  }
}

export default AccomodationRoutes;
