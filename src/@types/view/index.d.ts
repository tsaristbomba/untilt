type EditPanelTypes = {
  handleEdit: () => void;
  handleDelete: () => void;
  handleClose: () => void;
  disabled: boolean;
};
type BugCardProps = {
  name: string;
  priority: number;
  version: string;
  status: string;
  clicked: (name: string) => void;
};
type FilterTypes = {
  all?: boolean;
};
type BugViewPropTypes = {
  title: string;
  info: string | number;
};
type BugViewTypes = {
  loading?: boolean;
  bug: {
    name: string;
    details: string;
    steps: string;
    priority: number;
    assigned: string;
    version: string;
    time: string;
    id: string;
    status: string;
  };
  error?: string | null;
  success?: string | null;
  isFiltered?: boolean;
  clicked: (name: string, isDisplayed?: boolean) => void;
};
