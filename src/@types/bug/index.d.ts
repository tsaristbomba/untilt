type SelectedBugsTypes = {
  priority: number;
};
type SelectedBugsFormTypes = {
  name: string;
  isDisplayed: boolean;
};
type BugTypes = {
  name: string;
  details: string;
  steps: string;
  priority: number;
  assigned: string;
  version: string;
  date?: string;
  _id?: string;
  status: string;
};
type BugStateTypes = {
  loading: boolean;
  bugs: object;
  error: string | null;
  success: string | null;
  isFiltered: boolean;
  myBugs: object;
  filteredArray: object;
};
type BugsFormTypes = {
  name: string;
  isDisplayed: boolean;
};
type BugFormTypes = {
  title: string;
  edit?: boolean;
  close?: () => void;
  bug?: BugObjectTypes;
};
type BugObjectTypes = {
  name: string;
  details: string;
  steps: string;
  priority: number | string;
  status: string;
  version: string;
  assigned: string;
  time: string;
  id: string;
};
