export class Event {

    public id:string;
    public description: string;

    constructor(
        public title = "",
        public start_date_time = new Date(),
        public duration = 1
    ){}

}
