import { Company } from './company.model';

export interface Job {
  id?: number;
  title: string;
  description: string;
  minSalary: string;
  maxSalary: string;
  location: string;
  companyId: number;
}

export interface JobWithCompany {
  job: Job;
  company: Company;
} 