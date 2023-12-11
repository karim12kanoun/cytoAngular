import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { VarifyEmailComponent } from './component/varify-email/varify-email.component';
import { AuthGuardService } from './shared/auth.guard.service';
import { AccueilComponent } from './component/accueil/accueil.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { DemandeComponent } from './demande/demande.component';
import { AdminGuard } from './shared/adminguard.service';

const routes: Routes = [
   {path: '', redirectTo:'/login', pathMatch:'full'},
  { path: 'login', component: LoginComponent,  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
  {path: 'register', component : RegisterComponent},
  {path: 'varify-email', component : VarifyEmailComponent},
  {path: 'forgot-password', component : ForgotPasswordComponent},
  { path: 'accueil', component: AccueilComponent, canActivate: [AuthGuardService] },
  { path: 'formulaire', component: FormulaireComponent, canActivate: [AuthGuardService] },
  { path: 'demande', component: DemandeComponent, canActivate: [AuthGuardService] },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
