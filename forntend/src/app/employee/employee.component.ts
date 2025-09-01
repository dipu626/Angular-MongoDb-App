import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  departments: any[] = [
    { DepartmentId: 1, DepartmentName: 'HR' },
    { DepartmentId: 2, DepartmentName: 'Finance' },
    { DepartmentId: 3, DepartmentName: 'IT' },
  ];

  employees: any[] = [];

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

  refreshList() {
    const storedEmployees = localStorage.getItem('employees');
    this.employees = storedEmployees ? JSON.parse(storedEmployees) : [
      {
        EmployeeId: 1,
        EmployeeName: 'Alice',
        Department: 'HR',
        DateOfJoining: '2023-02-15',
        PhotoFileName: 'alice.jpg',
      },
      {
        EmployeeId: 2,
        EmployeeName: 'Bob',
        Department: 'Finance',
        DateOfJoining: '2022-11-10',
        PhotoFileName: 'bob.jpg',
      },
    ];

    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('employees', JSON.stringify(this.employees));
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
    this.Department = emp.Department;
    this.DateOfJoining = emp.DateOfJoining;
    this.PhotoFileName = emp.PhotoFileName || 'MyPhoto.jpg';
  }

  createClick() {
    const newId = this.employees.length
      ? Math.max(...this.employees.map((e) => e.EmployeeId)) + 1
      : 1;

    this.employees.push({
      EmployeeId: newId,
      EmployeeName: this.EmployeeName,
      Department: this.Department,
      DateOfJoining: this.DateOfJoining,
      PhotoFileName: this.PhotoFileName,
    });

    alert('Employee created');
    this.saveToLocalStorage();
  }

  updateClick() {
    const index = this.employees.findIndex((e) => e.EmployeeId === this.EmployeeId);
    if (index > -1) {
      this.employees[index] = {
        EmployeeId: this.EmployeeId,
        EmployeeName: this.EmployeeName,
        Department: this.Department,
        DateOfJoining: this.DateOfJoining,
        PhotoFileName: this.PhotoFileName,
      };
    }

    alert('Employee updated');
    this.saveToLocalStorage();
  }

  deleteClick(id: number) {
    if (!confirm('Are you sure?')) return;

    this.employees = this.employees.filter((e) => e.EmployeeId !== id);
    alert('Employee deleted');
    this.saveToLocalStorage();
  }
}
