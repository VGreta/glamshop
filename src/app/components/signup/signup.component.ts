import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errorMessage: string = '';

  constructor(
    private aS: AuthenticationService,
    private uS: UserService,
    private router: Router
  ) { }

  public ngOnInit(): void {
  }

  public async signUp(f) {
    try {
      let data: User = f.value;
      let result = await this.aS.signUp(data.email, data.password);
      
      this.errorMessage = '';
      
      await this.uS.addUser(result.user.uid, data.name, data.mobile, data.address);
      
      this.router.navigate(['/']);

    } catch (error) {
      this.errorMessage = error.message;
    }
  }
}
