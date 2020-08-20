// get a source
async function getAll() {
  return 'getAll';
}
// get all issues of one source
async function getAllOf() {
  return 'getAllOf';
}
// get one issue of a source
async function getOneOf() {
  return 'getOneOf';
}
// change a source
async function changeOne() {
  return 'changeOne';
}
// change an issue of a source
async function changeOneOf() {
  return 'changeOneOf';
}
// change location of an issue of a source
async function changeLocationOf() {
  return 'changeLocationOf';
}
// add an issue of a source
async function addIssueOf() {
  return 'addIssueOf';
}

const Source = {
  getAll,
  getAllOf,
  getOneOf,
  changeOne,
  changeOneOf,
  changeLocationOf,
  addIssueOf,
};

export default Source;
