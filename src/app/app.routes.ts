// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminGuard } from './guards/admin.guard'; // You'll need to create this
import { LandingComponent } from './components/landing/landing.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminCategoriesComponent } from './components/admin/admin-categories/admin-categories.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminAnalyticsComponent } from './components/admin/admin-analytics/admin-analytics.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'user-dashboard', component: UserDashboardComponent},
  { path: 'admin-products', component: AdminProductsComponent},
  { path: 'admin-categories', component: AdminCategoriesComponent},
  { path: 'admin-analytics', component: AdminAnalyticsComponent},
  { path: 'admin-orders', component: AdminOrdersComponent},

  { path: '**', redirectTo: '' }
];