import { Routes } from '@angular/router';
import { PlatosComponent } from './components/platos/platos.component';
import { PlatoDetalleComponent } from './components/plato-detalle/plato-detalle.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: PlatosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'plato/:id', component: PlatoDetalleComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cuenta', component: CuentaComponent },
  { path: '**', redirectTo: '' }
];
