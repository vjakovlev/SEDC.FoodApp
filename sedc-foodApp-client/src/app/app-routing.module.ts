import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'home', pathMatch:'full', component:HomeComponent},
  {path:'admin', pathMatch:'full', component:AdminPanelComponent},
  {path:'restaurant-details/:id', component:RestaurantDetailsComponent},
  {path:'forbidden', component: ForbiddenComponent},
  {path:'adminpanel', component:AdminPanelComponent, canActivate:[AuthGuard],data :{permittedRoles:['ADMIN']}},
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: '**', redirectTo: ''}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

