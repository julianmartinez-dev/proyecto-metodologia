export class findBookingCommands{
    private readonly passenger: string;
    private readonly fromDate: Date;
    
    constructor(passenger: string, fromDate:Date){
        this.passenger= passenger;
        this.fromDate= fromDate;
    } 
}