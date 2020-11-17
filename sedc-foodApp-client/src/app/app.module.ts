import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminPanelService } from './services/admin-panel.service';
import { ConfigService } from './services/config.service';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { UserService } from './services/user.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { HomeComponent } from './components/home/home.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { AuthService } from './auth/auth.service';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { IsVegePipePipe } from './pipes/is-vege-pipe.pipe';
import { RestaurantService } from './services/restaurant.service';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { RestaurantMenuComponent } from './components/restaurant-menu/restaurant-menu.component';
import { RestaurantMenuItemComponent } from './components/restaurant-menu-item/restaurant-menu-item.component';
import { MapMealTypePipe } from './pipes/map-meal-type.pipe';
import { OrderComponent } from './component/order/order.component';
import { OrderServiceService } from './services/order-service.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AdminPanelComponent,
    RestaurantDetailsComponent,
    ForbiddenComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    RestaurantsComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LoaderComponent,
    IsVegePipePipe,
    MapMealTypePipe,
    RestaurantComponent,
    RestaurantMenuComponent,
    RestaurantMenuItemComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [
    AdminPanelService,
    ConfigService,
    RestaurantService,
    UserService,
    OrderServiceService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
