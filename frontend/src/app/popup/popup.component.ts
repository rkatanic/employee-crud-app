import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(private employeeService: EmployeeServiceService) { }

  ngOnInit() { }

  confirmDeletion() {
    this.employeeService.dialogResult = true;
  }
}
