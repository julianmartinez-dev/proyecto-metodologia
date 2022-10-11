

export class findByNameAccommodationCommand{
    private readonly name: string;
    constructor(name: string){
        if(!name){
            throw new Error('name is required');
          }
          this.name= name;


    }
    getName():string{
        return this.name;

    }

}