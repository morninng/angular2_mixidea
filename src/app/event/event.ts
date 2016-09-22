export class Event {

    id:string;
    description: string;
    title : string
    minDate :Date;
    event_date : Date;
    event_time : Date;
    duration : number;
    event_date_time : Date;
    event_date_time_start : number;
    event_date_time_finish : number;
    

    constructor(
    ){
        this.event_time = new Date(2000,1,1,1,0);
        this.minDate = new Date();
        this.duration = 1;
    }

    compute_date_time(){
        if(!this.event_date){
            return false;
        }
        const year = this.event_date.getFullYear();
        const month = this.event_date.getMonth();
        const day = this.event_date.getDate();
        const hour = this.event_time.getHours();
        const minutes = this.event_time.getMinutes();
        this.event_date_time = new Date(year, month, day, hour, minutes);
        this.event_date_time_start = this.event_date_time.getTime();
        this.event_date_time_finish =  this.event_date_time_start + this.duration * 1000 * 60 * 60;
    }

}
