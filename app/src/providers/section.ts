export class Section {
  public id: string;
  public name: string;
  public leader_id: string;
  public members_id: Array<string>;
  public note: string;
  public children_sections: Array<Section> = [];
  
  public depth: string;
  public is_choose: boolean;

  constructor(json, depth) {
    this.depth = depth + 1;
    this.id = json['id'];
    this.name = json['name'];
    this.leader_id = json['leaderID'];
    this.members_id = json['membersID'];
    this.note = json['note'];
    let sections_array = json['childrenSections'];
    if(sections_array == null || sections_array == [])
      this.children_sections = [];
    else {
      for(let i = 0, n = sections_array.length; i < n; i++) {
        this.children_sections.push(new Section(sections_array[i], this.depth));
      }
    }
  }

  set checked(is_check: boolean) {
    // if(is_check === this.is_choose)
    //   return;
    this.is_choose = is_check;
    for(let i = 0, n = this.children_sections.length; i < n; i++)
      this.children_sections[i].checked = is_check;
  }

  get checked():boolean {
    return this.is_choose;
  }

  public add_section(array) {
    if(this.children_sections.length === 0)
      return;
    this.children_sections.forEach(
      (item) => {
        array.push(item);
        item.add_section(array);
      })
  }
}