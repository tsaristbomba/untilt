// export default bug;

// type BugTypes = {
//   name: string;
//   details: string;
//   steps: string;
//   priority: string;
//   assigned: string;
//   version: string;
//   time: string;
//   id: string;
//   status: string;
// };

// function bug(this: BugTypes, bug: BugTypes): void {
//   if (bug !== undefined) {
//     this.name = bug.name;
//     this.details = bug.details;
//     this.steps = bug.steps;
//     this.priority = bug.priority;
//     this.assigned = bug.assigned;
//     this.version = bug.version;
//     this.time = bug.time;
//     this.id = bug.id;
//     this.status = bug.status;
//   }
// }

const bugModel = class BugTypes {
  name: string;
  details: string;
  steps: string;
  priority: number;
  assigned: string;
  version: string;
  time: string;
  id: string;
  status: string;

  constructor(bug: BugTypes) {
    this.name = bug.name;
    this.details = bug.details;
    this.steps = bug.steps;
    this.priority = bug.priority;
    this.assigned = bug.assigned;
    this.version = bug.version;
    this.time = bug.time;
    this.id = bug.id;
    this.status = bug.status;
  }
};

export default bugModel;
