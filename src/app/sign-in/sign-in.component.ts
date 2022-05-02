import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit { 

  error: boolean = false;

  PAT_NAME = "^[A-Za-z0-9][A-Za-z0-9]{5,20}$";
  PAT_PASSWORD = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"

  profileForm = this.fb.group({
    username: ['', [Validators.required,Validators.pattern(this.PAT_NAME)]],
    password: ['', [Validators.required,Validators.pattern(this.PAT_PASSWORD)]],
  });

  constructor(private fb: FormBuilder, private http: HttpClient, private cookieService: CookieService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if(this.profileForm.controls['password'].errors == null && this.profileForm.controls['username'].errors == null){
      this.error = false;
      this.http.post<any>('https://www.mutrecy.fr/api/signIn', {body: JSON.stringify({username:this.profileForm.value.username,password:this.profileForm.value.password})}).subscribe(data => {
        if(data.token.length > 0){
          this.cookieService.set("token",data.token)
        }else{
          this.error = true;
        }
      });
    }else{
      this.error = true;
    }
  }

  getError(){
    return this.error;
  }

}
