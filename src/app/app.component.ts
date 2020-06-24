import { Component } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firebasestore';
  isUser: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private aS: AuthenticationService,
    private uS: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.aS.user.subscribe(user => {
      if(user){
         this.isUser = true;
         this.aS.userId = user.uid
         this.uS.isAdminData().subscribe(data => {
           if (data['admin']){ 
             this.isAdmin = true;
           }
         })
      }   
      
      else {
       this.isUser = false;
       this.aS.userId = '';
      }
    })
  }

  public signOut() {
    this.aS.signOut();
    this.isAdmin = false;
    this.router.navigate(['/']);
  }
}
