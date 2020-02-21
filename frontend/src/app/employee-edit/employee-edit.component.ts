import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EmployeeServiceService } from '../employee-service.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  private employee: Employee = new Employee();
  employeeID: number;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeServiceService,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.employeeID = +params['id'];
        this.employeeService.findById(this.employeeID).subscribe(
          (response: Employee) => {
            this.employee = response;
          });
      });
  }

  updateEmployee(form: NgForm) {
    this.employee.firstName = form.value.firstName;
    this.employee.lastName = form.value.lastName;
    this.employee.email = form.value.email;
    this.employeeService.updateEmployee(this.employee).subscribe((response) => {
      return this.toastr.info("Successfully updated employee with id: " + response.id, "Successfully updated");
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(PopupComponent);
    dialogRef.afterClosed().subscribe(() => {
      if (this.employeeService.dialogResult) {
        this.deleteEmployee();
      }
    });
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.employeeID).subscribe();
    this.toastr.error("Successfully deleted employee from database!", "Employee Deleted");
    this.employeeService.dialogResult = false; // just to make sure that value is reset
    this.router.navigate(['/employee-form']);
  }
}
