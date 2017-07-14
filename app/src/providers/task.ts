export class TaskStage {
  public activity_id: string;
  public content : string;
  public title: string;
  public start_time: string;
  public finish_time : string;
  public person : string;
  public person_id : number;
  public exclusive_gateway: Array<{operationID: string, operationName: string}>;

  public status: number; // 0: pass, 1: doing, 2: end
  
  public constructor(json: any) {
    this.activity_id = json["activityID"];
    this.start_time = json["startTime"];
    this.finish_time = json["finishTime"];
    this.person = json["person"]["name"];
    this.person_id = json["person"]["ID"];
    this.content = json["content"];
    this.title = json["title"];
    this.exclusive_gateway = json["exclusiveGateway"]
    this.status = 0;
  } 

}

export class Task {
  public activity_id : number;
  public process_id: string;
  public content : string;
  public start_person : string;
  public start_person_id: number;
  public start_time : string;
  public update_time : string;
  public over: boolean;
  public operate_person_id: number;
  public stages : Array<TaskStage> = [];

  constructor(json: any) {
    this.activity_id = json["processDefID"];
    this.process_id = json["processID"];
    this.content = json["processName"];
    this.start_person = json["startPerson"]["name"];
    this.start_person_id = json["startPerson"]["ID"];
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
    this.operate_person_id = this.stages[this.stages.length - 1].person_id;
  }

}

