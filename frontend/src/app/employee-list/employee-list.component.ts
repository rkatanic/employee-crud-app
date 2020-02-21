import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeServiceService } from '../employee-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @Input() index: number;
  dataSource: Employee[];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];

  constructor(private employeeService: EmployeeServiceService, private router: Router) { }

  ngOnInit() {
    this.fetchData();
  }

  editEmployee(employee: Employee) {
    this.router.navigate([`/employee-edit/${employee.id}`]);
  }

  fetchData() {
    this.employeeService.findAll().subscribe((data): Employee[] => {
      this.dataSource = data;
      return this.employeeService.employees = data;
    },
      error => console.log(error));
  }
}
