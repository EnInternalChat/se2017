export class TaskStage {
  public finish_time : string;
  public person : Array<string>;
  public content : string;
  // public time_day : string;
  // public time_hour : string;
  public person_str : string;

  public is_pass : boolean = true;

  public constructor(json: any) {
    this.finish_time = json["finishTime"];
    this.person = json["person"];
    this.content = json["content"];
    // let times = this.finish_time.split(" ");
    // if(times.length >= 2) {
    //   this.time_day = times[0];
    //   this.time_hour = times[1];
    // }
    // else {
    //   this.time_day = this.finish_time;
    //   this.time_hour = "";
    // }
    if(this.person != undefined)
      this.person_str = this.person.join(",");
    else
      this.person_str = " ";
  } 

}

export class Task {
  public activity_id : string;
  public content : string;
  public start_person : string;
  public start_time : string;
  public update_time : string;
  public stages : Array<TaskStage> = [];

  constructor(json: any) {
    this.activity_id = json["activityID"];
    this.content = json["content"];
    this.start_person = json["startPerson"];
    this.start_time = json["startTime"];
    this.update_time = json["updateTime"];
    let stages_json = json["stages"];
    for(let i = 0, n = stages_json.length; i < n; i++)
      this.stages.push(new TaskStage(stages_json[i]));
    this.stages[this.stages.length - 1].is_pass = false;
  }

}

