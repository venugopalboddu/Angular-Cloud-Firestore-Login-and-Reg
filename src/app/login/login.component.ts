import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../employee.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loindetatils:any;
  list: Employee[];
  name:any;
  password:any;
  showDeletedMessage: boolean;
  constructor(private s: DataService, private fb: FormBuilder, private router: Router, private http: HttpClient) { }

  form = this.fb.group({
    id: [],
    uname: ['', Validators.required],
    password: ['', Validators.required]
  });
  ngOnInit() {
   
  }
  get f() { return this.form.controls; }

  onSubmit() {
  
    this.submitted = true;
    this.name = this.form.controls['uname'].value;
    this.password = this.form.controls['password'].value;
    let loginDetails = {
      uname: this.form.controls['uname'].value,
      password: this.form.controls['password'].value
    }
    
    if (this.form.invalid) {
      return;
    }
  
    this.s.getEmployees().subscribe((res=>{
      this.list = res.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Employee;
      });
      //console.log("test", this.list);
      for(let i = 0; i < this.list.length; i++) {
      if (this.list[i].uname == loginDetails.uname && this.list[i].password == loginDetails.password) {
        this.s.sendToken(this.form.value.uname);
        this.router.navigate(['/dash']);
      }else{
        this.form.reset();
        this.submitted = false;
        this.showDeletedMessage = true;
        setTimeout(() => this.showDeletedMessage = false, 3000);
      }
    }
    }));
  }
}
