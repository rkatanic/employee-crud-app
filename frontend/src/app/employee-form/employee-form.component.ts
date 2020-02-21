import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeServiceService } from '../employee-service.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = new Employee();

  constructor(private employeeService: EmployeeServiceService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  addEmployee(form: NgForm) {
    this.employee.firstName = form.value.firstName;
    this.employee.lastName = form.value.lastName;
    this.employee.email = form.value.email;
    this.employeeService.addEmployee(this.employee).subscribe(() => {
      return this.toastr.success("Successfully created new Employee!", "Successfully Added!");
    });
    form.reset();
  }
}
