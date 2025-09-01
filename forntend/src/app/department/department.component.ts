import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  departments: any[] = [];

  modalTitle = '';
  DepartmentId = 0;
  DepartmentName = '';

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    // Load from localStorage if available
    const storedDepartments = localStorage.getItem('departments');
    this.departments = storedDepartments
      ? JSON.parse(storedDepartments)
      : [
        { DepartmentId: 1, DepartmentName: 'HR' },
        { DepartmentId: 2, DepartmentName: 'Finance' },
        { DepartmentId: 3, DepartmentName: 'IT' },
      ];

    this.saveToLocalStorage();
    console.log('Departments loaded:', this.departments);
  }

  saveToLocalStorage() {
    localStorage.setItem('departments', JSON.stringify(this.departments));
  }

  addClick() {
    this.modalTitle = 'Add Department';
    this.DepartmentId = 0;
    this.DepartmentName = '';
  }

  editClick(dep: any) {
    this.modalTitle = 'Edit Department';
    this.DepartmentId = dep.DepartmentId;
    this.DepartmentName = dep.DepartmentName;
  }

  createClick() {
    const newId = this.departments.length
      ? Math.max(...this.departments.map((d) => d.DepartmentId)) + 1
      : 1;

    this.departments.push({
      DepartmentId: newId,
      DepartmentName: this.DepartmentName,
    });

    alert('Department created');
    this.saveToLocalStorage();
  }

  updateClick() {
    const index = this.departments.findIndex(
      (d) => d.DepartmentId === this.DepartmentId
    );
    if (index > -1) {
      this.departments[index].DepartmentName = this.DepartmentName;
    }

    alert('Department updated');
    this.saveToLocalStorage();
  }

  deleteClick(id: number) {
    if (!confirm('Are you sure?')) {
      return;
    }

    this.departments = this.departments.filter((d) => d.DepartmentId !== id);
    alert('Department deleted');
    this.saveToLocalStorage();
  }
}
