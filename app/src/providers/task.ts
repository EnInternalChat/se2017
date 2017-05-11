export class TaskStage {
  public activity_id: string;
  public content : string;
  public start_time: string;
  public finish_time : string;
  public person : Array<string>;
  public exclusive_gateway: Array<{operation_id: string, operation_name: string}>;

  public person_str : string;
  public status: number; // 0: pass, 1: doing, 2: end
  
  public constructor(json: any) {
    this.activity_id = json["activityID"];
    this.start_time = json["startTime"];
    this.finish_time = json["finishTime"];
    this.person = json["person"];
    this.content = json["content"];
    this.exclusive_gateway = json["exclusiveGateway"]
    this.status = 0;
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
  public over: boolean;
  public stages : Array<TaskStage> = [];

  constructor(json: any) {
    this.activity_id = json["taskID"];
    this.content = json["taskName"];
    this.start_person = json["startPerson"];
    this.over = json["over"];
    let stages_json = json["stages"];
    for(let i = 0, n = stages_json.length; i < n; i++)
      this.stages.push(new TaskStage(stages_json[i]));
    this.start_time = this.stages[0].start_time;
    this.update_time = this.stages[this.stages.length - 1].start_time;
    if(this.over)
      this.stages[this.stages.length - 1].status = 2;
    else
      this.stages[this.stages.length - 1].status = 1;
  }

}

