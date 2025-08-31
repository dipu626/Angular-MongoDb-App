import { Component, OnInit } from '@angular/core';
// import { environment } from 'src/environments/environment'; // Not needed now
// import { HttpClient } from '@angular/common/http'; // Not needed now

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  // constructor(private http: HttpClient) {}
  constructor() {}

  departments: any[] = [
    { DepartmentId: 1, DepartmentName: 'HR' },
    { DepartmentId: 2, DepartmentName: 'Finance' },
    { DepartmentId: 3, DepartmentName: 'IT' },
  ];

  modalTitle = '';
  DepartmentId = 0;
  DepartmentName = '';

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    // Simulate API refresh
    // this.http.get<any>('https://localhost:7043/api/department').subscribe(data => {
    //   this.departments = data;
    // });
    console.log('Departments loaded (in-memory):', this.departments);
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
    // const val = { DepartmentName: this.DepartmentName };
    // this.http.post('https://localhost:7043/api/department', val).subscribe(res => {
    //   alert(res.toString());
    //   this.refreshList();
    // });

    const newId = this.departments.length
      ? Math.max(...this.departments.map((d) => d.DepartmentId)) + 1
      : 1;

    this.departments.push({
      DepartmentId: newId,
      DepartmentName: this.DepartmentName,
    });

    alert('Department created (in-memory)');
    this.refreshList();
  }

  updateClick() {
    // const val = { DepartmentId: this.DepartmentId, DepartmentName: this.DepartmentName };
    // this.http.put('https://localhost:7043/api/department', val).subscribe(res => {
    //   alert(res.toString());
    //   this.refreshList();
    // });

    const index = this.departments.findIndex(
      (d) => d.DepartmentId === this.DepartmentId
    );
    if (index > -1) {
      this.departments[index].DepartmentName = this.DepartmentName;
    }

    alert('Department updated (in-memory)');
    this.refreshList();
  }

  deleteClick(id: number) {
    if (!confirm('Are you sure?')) {
      return;
    }

    // this.http.delete('https://localhost:7043/api/department/' + id).subscribe(res => {
    //   alert(res.toString());
    //   this.refreshList();
    // });

    this.departments = this.departments.filter((d) => d.DepartmentId !== id);
    alert('Department deleted (in-memory)');
    this.refreshList();
  }
}
