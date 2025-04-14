import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'; 
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { UpdateComponent } from './update/update.component';
import { AddComponent } from './add/add.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent},
    { path: 'view/:id', component: ViewComponent},
    { path: 'update/:id', component: UpdateComponent},
    { path: 'add', component: AddComponent},
    
    { path: '', redirectTo: '/login', pathMatch: 'full' } 
  ];

