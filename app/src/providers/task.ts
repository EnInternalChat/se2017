export class TaskStage {
  public finishTime : string;
  public person : Array<string>;
  public content : string;
  public time_day : string;
  public time_hour : string;
  public person_str : string;

  public constructor(json: any) {
    this.finishTime = json["finishTime"];
    this.person = json["person"];
    this.content = json["content"];
    let times = this.finishTime.split(" ");
    if(times.length >= 2) {
      this.time_day = times[0];
      this.time_hour = times[1];
    }
    else {
      this.time_day = this.finishTime;
      this.time_hour = "";
    }
    if(this.person != undefined)
      this.person_str = this.person.join(",");
  } 

}

export class Task {
  public activityID : string;
  public content : string;
  public startPerson : string;
  public startTime : string;
  public updateTime : string;
  public stages : Array<TaskStage> = [];

  constructor(json: any) {
    this.activityID = json["activityID"];
    this.content = json["content"];
    this.startPerson = json["startPerson"];
    this.startTime = json["startTime"];
    this.updateTime = json["updateTime"];
    let stages_json = json["stages"];
    for(let i = 0, n = stages_json.length; i < n; i++)
      this.stages.push(new TaskStage(stages_json[i]));
  }

}

