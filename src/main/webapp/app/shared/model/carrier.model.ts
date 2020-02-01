import { IProject } from 'app/shared/model/project.model';

export interface ICarrier {
  id?: number;
  name?: string;
  description?: string;
  projects?: IProject[];
}

export const defaultValue: Readonly<ICarrier> = {};
