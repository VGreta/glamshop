import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { AProductComponent } from './components/admin/a-product/a-product.component';
import { AUserComponent } from './components/admin/a-user/a-user.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

import { AuthGuard } from './_helpers/auth.guard';
import { AdminGuard } from './_helpers/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
   { path: 'signin', component: SigninComponent},
   { path: 'signup', component: SignupComponent},
   { path: 'products', component: ProductComponent},
   { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
   { path: 'admin', component: AdminComponent, canActivate: [AdminGuard],
    children: [
         { path: 'products', component: AProductComponent },
         { path: 'users', component: AUserComponent }
       ]
   }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
