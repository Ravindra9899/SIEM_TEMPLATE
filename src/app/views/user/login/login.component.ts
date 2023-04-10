import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/user/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    // console.log('entered ', this.username, this.password)
    console.log('hashing password ',);

    this.authService.login(this.username, this.password).subscribe(
      {
        next: (response) => {
          console.log("response received");
          console.log(response);

          if (
            response?.message == 'success' &&
            response?.data != '' &&
            response?.data?.role != '' &&
            response?.data?.token != ''
          ) {
            let jwt = response['data']['token'];

            localStorage.setItem('jwt', jwt);

            const navigationExtras: NavigationExtras = {
              skipLocationChange: true
            };

            this.router.navigate(['/dashboard'], navigationExtras);
          } else {
            console.log('login failed')
          }
        },
        error: (error) => {
          this.errorMessage = error;
          console.log(this.errorMessage);
        },
        complete: () => {
          console.log('login request completed');
        },
      }
    );
  }

}
