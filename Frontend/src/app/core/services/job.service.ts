import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job, JobWithCompany } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private baseUrl = 'http://localhost:8082/jobs';

  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<JobWithCompany[]> {
    return this.http.get<JobWithCompany[]>(this.baseUrl);
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.baseUrl}/${id}`);
  }

  createJob(job: Job): Observable<string> {
    return this.http.post<string>(this.baseUrl, job);
  }

  updateJob(id: number, job: Job): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${id}`, job);
  }

  deleteJob(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }

}
