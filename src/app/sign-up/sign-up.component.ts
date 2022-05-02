import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  PAT_NAME = "^[A-Za-z0-9][A-Za-z0-9]{5,20}$";
  PAT_PASSWORD = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
  PAT_LASTNAME = "/^[a-zA-Z\-]+$/";
  PAT_FIRSTNAME = "/^[a-zA-Z\-]+$/";

  profileForm = this.fb.group({
    username: ['', [Validators.required,Validators.pattern(this.PAT_NAME)]],
    lastName: ['', [Validators.required,Validators.pattern(this.PAT_LASTNAME)]],
    firstName: ['', [Validators.required,Validators.pattern(this.PAT_FIRSTNAME)]],
    password: ['', [Validators.required,Validators.pattern(this.PAT_PASSWORD)]],
    passwordAgain: ['', [Validators.required,Validators.pattern(this.PAT_PASSWORD)]],
    email: ['', [Validators.email]],
    dateBirth: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private http: HttpClient, private cookieService: CookieService, private route: ActivatedRoute,private router: Router) { }


  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.profileForm.value.username);
    console.log(this.profileForm.value.lastName);
    console.log(this.profileForm.value.firstName);
    console.log(this.profileForm.value.password);
    console.log(this.profileForm.value.passwordAgain);
    console.log(this.profileForm.value.email);
    console.log(this.profileForm.value.dateBirth);
    console.log(this.profileForm.controls['email'].errors)
  }

  getError() {
    return true;
  }

}
