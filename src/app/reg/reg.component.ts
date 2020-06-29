import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  submitted = false;
  list: Employee[];
  showDeletedMessage: boolean;
  name:any;
  email:any;
  status: boolean = false;
  constructor(private firestore: AngularFirestore, private s: DataService, private router: Router, private fb: FormBuilder) {
   }
  ngOnInit() {
      this.s.getEmployees().subscribe((res=>{
        this.list = res.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Employee;
        });
        //console.log("test", this.list);
      }));
  }

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    uname: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });



  get sf() { return this.form.controls; }

  sendFirebase() { 
    this.submitted = true;
    this.name = this.form.controls['uname'].value;
    this.email = this.form.controls['email'].value;
    let data = Object.assign({}, this.form.value);

    if (this.form.invalid) {
      return;
    }
    for(let i = 0; i < this.list.length; i++) {
              
                if (this.list[i].uname == this.name && this.list[i].email == this.email) {
                  this.status = true;
                  this.form.reset();
                  this.submitted = false;
                  this.showDeletedMessage = true;
                  setTimeout(() => this.showDeletedMessage = false, 3000);
                }
              }
      if(this.status == false) 
      {
      alert("Are you sure to enter data?"); 
      this.firestore.collection('employees').add(data);
      this.form.reset();
      this.submitted = false;
      this.router.navigate(['/login']);
    }

  } 
  }

