import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/services/user/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  password: string = '';
  username: string = '';
  confirmPassword: string = '';

  constructor(private signUpService: SignupService) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.signUpService.signUp(this.username, this.password, this.confirmPassword);
  }

}
