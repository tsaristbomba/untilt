export default bug;

function bug(bug) {
  if (bug !== undefined) {
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
}
