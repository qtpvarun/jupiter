import { IProject } from 'app/shared/model/project.model';

export interface ICompany {
  id?: number;
  name?: string;
  description?: string;
  billedProjects?: IProject[];
  siteProjects?: IProject[];
}

export const defaultValue: Readonly<ICompany> = {};
