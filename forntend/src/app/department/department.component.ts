import { Component, OnInit } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  constructor(private http:HttpClient){}

  departments:any=[];

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.http.get<any>('https://localhost:7043/api/' + 'department')
    .subscribe(data=>{
      this.departments = data;
    });
  }
}
