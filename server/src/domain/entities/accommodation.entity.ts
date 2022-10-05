import { v4 } from "uuid";


export class Accommodation{

    private id: string;
    private name: string;
    private pricePerNight: number ;

    constructor(
        id: string,
        name: string, 
        pricePerNight: number
    ) {
        this.id = id;;
        this.name = name;
        this.pricePerNight = pricePerNight;
    }

    public static create(name:string, pricePerNight: number){
        
        const id= v4();
        const accommodation = new Accommodation(id,name,pricePerNight);

        return accommodation;
    }


    static fromPrimities(primitives:any): Accommodation{
        const accommodation = new Accommodation(primitives.id, primitives.name, primitives.pricePerNight);
        return accommodation;


    }

    changeName(name:string): void{
        this.name = name;
    }

    changePricePerNight(pricePerNight:number): void{
        this.pricePerNight = pricePerNight;
    }

    getId(): string{
        return this.id;
    }

    getName(): string{
        return this.name;

    }

    getPricePerNight(): number {
        return this.pricePerNight;
    }


    toPrimitives(): any {
        return{
            id: this.id,
            name: this.name,
            pricePerNight: this.pricePerNight
        }
    } 
}
