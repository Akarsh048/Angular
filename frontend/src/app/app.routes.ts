import { Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { WeatherPageComponent } from './pages/weather-page/weather-page.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'auth', component: AuthPageComponent },
  { path: 'products', component: ProductsPageComponent },
  { path: 'orders', component: OrdersPageComponent },
  { path: 'weather', component: WeatherPageComponent },
  { path: '**', redirectTo: 'products' }
];
