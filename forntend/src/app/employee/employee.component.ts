import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent {
  constructor(private http: HttpClient) {}

  departments: any = [];
  employees: any = [];

  modalTitle = '';
  EmployeeId = 0;
  EmployeeName = '';
  Department = '';
  DateOfJoining = '';
  PhotoFileName = 'MyPhoto.jpg';
  PhotoPath = 'http://localhost:4200/Images/';

  ngOnInit(): void {
    this.refreshList();
  }

  // formatDate(date: any) {
  //   return this.datePipe.transform(date, 'yyyy-MM-dd');
  // }

  refreshList() {
    this.http
      .get<any>('https://localhost:7043/api/' + 'department')
      .subscribe((data) => {
        this.departments = data;
      });

    this.http
      .get<any>('https://localhost:7043/api/' + 'employee')
      .subscribe((data) => {
        this.employees = data;
      });
  }

  addClick() {
    this.modalTitle = 'Add Employee';
    this.EmployeeId = 0;
    this.EmployeeName = '';
    this.Department = '';
    this.DateOfJoining = '';
    this.PhotoFileName = '';
  }

  editClick(emp: any) {
    this.modalTitle = 'Edit Employee';
    this.EmployeeId = emp.EmployeeId;
    this.EmployeeName = emp.EmployeeName;
    this.Department = emp.department;
    this.DateOfJoining = emp.DateOfJoining;
    this.PhotoFileName = 'MyPhoto.jpg';
  }

  createClick() {
    var val = {
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName,
    };

    this.http
      .post('https://localhost:7043/api/' + 'employee', val)
      .subscribe((res) => {
        alert(res.toString());
        this.refreshList();
      });
  }

  updateClick() {
    var val = {
      EmployeeId: this.EmployeeId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName,
    };

    this.http
      .put('https://localhost:7043/api/' + 'employee', val)
      .subscribe((res) => {
        alert(res.toString());
        this.refreshList();
      });
  }

  deleteClick(id: any) {
    if (!confirm('Are you sure?')) {
      return;
    }

    this.http
      .delete('https://localhost:7043/api/' + 'employee/' + id)
      .subscribe((res) => {
        alert(res.toString());
        this.refreshList();
      });
  }
}
