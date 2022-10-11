import accommodationRepository from '../../../infrastructure/repositories/accommodation.repository'
import { findByNameAccommodationComand } from '../../commands/accomodation/findByName.accommodation.aommand'

class findAccommodationHandler{
    async execute(command: findByNameAccommodationComand){
        const accommodation= accommodationRepository.findOneByName(command.getName())
        if (!accommodation) {
            throw new Error('accommodation not found');
          }
          return accommodation;

    }

}
export default new findAccommodationHandler();