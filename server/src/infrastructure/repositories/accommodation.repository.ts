import { Accommodation } from "../../domain/entities/accommodation.entity";

class Repository{
    private accommodations: Accommodation[];
    constructor(){
        this.accommodations=[];

    }
    
   async  save(accommodation:Accommodation): Promise<void> {
    const saveAccommodation = this.accommodations.find(a => a.getId() === accommodation.getId())

    if (saveAccommodation) {
      this.accommodations.splice(this.accommodations.indexOf(saveAccommodation), 1)
    }
    this.accommodations.push(accommodation);
   }

  async findOneById(id:string):Promise<Accommodation| null> {
    const accommodation = this.accommodations.find(a => a.getId() === id);
    return (accommodation)? accommodation :null;
  }

  async findOneByName(name:string):Promise<Accommodation| null> {
    const accommodation = this.accommodations.find(a => a.getName() === name);
    return (accommodation)? accommodation :null;
  }
}

export default new Repository();