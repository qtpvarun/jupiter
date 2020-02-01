import { Moment } from 'moment';
import { ISubTask } from 'app/shared/model/sub-task.model';
import { ITaskHistory } from 'app/shared/model/task-history.model';
import { IUser } from 'app/shared/model/user.model';
import { IProject } from 'app/shared/model/project.model';
import { TaskStatus } from 'app/shared/model/enumerations/task-status.model';
import { Priority } from 'app/shared/model/enumerations/priority.model';
import { Grade } from 'app/shared/model/enumerations/grade.model';

export interface ITask {
  id?: number;
  name?: string;
  description?: string;
  erpProjectID?: string;
  erpProjectSequence?: string;
  erpProjectType?: string;
  erpStatus?: string;
  status?: TaskStatus;
  assignedDate?: string;
  estimatedCompletionDate?: Moment;
  completedDate?: Moment;
  draftDueDate?: Moment;
  internalDueDate?: Moment;
  priority?: Priority;
  isOverdue?: boolean;
  inProgress?: boolean;
  grade?: Grade;
  subTasks?: ISubTask[];
  taskHistories?: ITaskHistory[];
  assignedTo?: IUser;
  assignedBy?: IUser;
  assignedQC?: IUser;
  parentProject?: IProject;
}

export const defaultValue: Readonly<ITask> = {
  isOverdue: false,
  inProgress: false
};
