import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RestaurantesComponent } from './components/restaurantes/restaurantes.component';
import { RestauranteDetailComponent } from './components/restaurante-detail/restaurante-detail.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './components/admin/admin.component';

import { AuthService } from './services/auth.service';
import { RestauranteService } from './services/restaurante.service';
import { PlatoService } from './services/plato.service';
import { CarritoService } from './services/carrito.service';
import { PedidoService } from './services/pedido.service';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'restaurantes', component: RestaurantesComponent },
  { path: 'restaurante/:id', component: RestauranteDetailComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RestaurantesComponent,
    RestauranteDetailComponent,
    CarritoComponent,
    CheckoutComponent,
    PedidosComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    RestauranteService,
    PlatoService,
    CarritoService,
    PedidoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
