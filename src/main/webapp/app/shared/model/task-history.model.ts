import { Moment } from 'moment';
import { ITask } from 'app/shared/model/task.model';
import { ISubTask } from 'app/shared/model/sub-task.model';
import { EventType } from 'app/shared/model/enumerations/event-type.model';

export interface ITaskHistory {
  id?: number;
  eventDate?: Moment;
  eventType?: EventType;
  eventTopic?: string;
  eventDetail?: string;
  redline?: string;
  parentTask?: ITask;
  parentSubTask?: ISubTask;
}

export const defaultValue: Readonly<ITaskHistory> = {};
