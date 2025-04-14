import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  title = 'vetsys-DylanGrech';
  showNavbar: boolean = true;
  userRole: string = '';

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('role') || '';
  }

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showNavbar = !event.urlAfterRedirects.includes('/login');
      });
  }

  signOut(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  viewAppointments():void {
    this.router.navigate(["/home"])
  }

  addAppointment():void {
    if(this.userRole == "VET") {
      alert("Cannot add appointments as a Vet")
      return
    }
    this.router.navigate(["/add"])
  }

}
