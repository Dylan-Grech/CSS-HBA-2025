import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service'; 
import { CommonModule } from '@angular/common'; 
import * as XLSX from 'xlsx';
import { AppointmentStatusPipe } from '../pipes/appointment-status.pipe';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AppointmentStatusPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  appointments: any[] = [];
  userRole: string = '';

  constructor(
    private router: Router,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
    this.userRole = sessionStorage.getItem('role') || '';
  }

  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data; 
      },
      error: (err) => {
        console.error('Error fetching appointments', err);
      }
    });
  }

  viewAppointment(id: number): void {
    this.router.navigate([`/view/${id}`]);  
  }

  updateAppointment(id: number): void {
    this.router.navigate([`/update/${id}`]);  
  }

  deleteAppointment(id: number): void {
    if (sessionStorage.getItem('role') !== 'ADMIN') {
      console.warn('Unauthorized delete attempt');
      alert('You do not have permission to delete this appointment.');
      return;
    }

    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.deleteAppointment(id).subscribe({
        next: () => {
          console.log('Appointment deleted');
          this.router.navigate(['/home']);  
        },
        error: (err) => {
          console.error('Error deleting appointment', err);
        }
      });
    }
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.appointments);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Appointments');
    XLSX.writeFile(workbook, 'appointments.xlsx');
  } 
  
}
