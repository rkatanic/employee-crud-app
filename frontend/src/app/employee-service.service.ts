import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeServiceService {
  private baseUrl: string;
  employees: Employee[];
  dialogResult: boolean = false;
  
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/api/employees';
  }

  public findAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }


  public deleteEmployee(id: number) {
    return this.http.delete<Employee>(this.baseUrl + '/' + id);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee);
  }

  public findById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.baseUrl + '/' + id);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.baseUrl, employee);
  }
}
