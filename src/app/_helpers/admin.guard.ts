import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(private as: AuthenticationService, private router: Router, private us: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise(resolve => {
      this.as.user.subscribe(user => {
        if (user) {
          this.us.isAdminData().subscribe(data => {
            if (data['admin']) resolve(true);
            else {
              this.router.navigate(['/'])
              resolve(false)
            }
          })
        }
        else {
          this.router.navigate(['/'])
          resolve(false)
        }
      })
    })
  }
}