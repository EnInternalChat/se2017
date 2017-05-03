export class TaskStage {
  constructor(
    public finishTime : string,
    public person : string,
    public content : string) {}
}

export class Task {

  constructor(
    public activityID : string, 
    public content : string,
    public startPerson : string,
    public startTime : string,
    public updateTime : string,
    public stages : Array<TaskStage>) {}
}

