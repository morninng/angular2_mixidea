export class Event {

    public id:string;
    public description: string;
    minDate :Date;
    event_date : Date;
    event_time : Date;

    constructor(
        public title = "",
        public duration = 1
    ){
        this.event_time = new Date(2000,1,1,1,0);
        this.minDate = new Date();
    }

}
