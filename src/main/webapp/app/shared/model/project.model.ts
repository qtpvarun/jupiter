import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { ITask } from 'app/shared/model/task.model';
import { ICarrier } from 'app/shared/model/carrier.model';
import { ICompany } from 'app/shared/model/company.model';

export interface IProject {
  id?: number;
  name?: string;
  isSite360?: boolean;
  siteNumber?: number;
  internalDue?: Moment;
  towerType?: string;
  pONumber?: string;
  towerLatitude?: number;
  towerLongitude?: number;
  memo?: string;
  programManager?: IUser;
  projectManager?: IUser;
  tasks?: ITask[];
  carrier?: ICarrier;
  billingCompany?: ICompany;
  siteCompany?: ICompany;
}

export const defaultValue: Readonly<IProject> = {
  isSite360: false
};
