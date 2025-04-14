import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  appointment: any; 
  appointmentId: number = 0; 
  appointmentForm!: FormGroup;
  userRole: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('role') || '';
    this.appointmentId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAppointmentDetails();
  }

  setupForm(): void {
    this.appointmentForm = this.fb.group({
      appointmentId: [{ value: '', disabled: this.userRole === 'receptionist' }],
      patientName: ['', Validators.required],
      animalType: ['', Validators.required],
      ownerIdCardNumber: ['', Validators.required],
      ownerName: ['', Validators.required],
      ownerSurname: ['', Validators.required],
      ownerContactNumber: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      appointmentDuration: ['', Validators.required],
      reasonForAppointment: ['', Validators.required],
      vetNotes: [{ value: '', disabled: this.userRole === 'receptionist' }]
    });
  }

  loadAppointmentDetails(): void {
    this.setupForm(); 

    this.appointmentService.getAppointmentById(this.appointmentId).subscribe({
      next: (data) => {
        this.appointment = data;
        this.appointmentForm.patchValue(data); 
      },
      error: (err) => {
        console.error('Error fetching appointment details', err);
      }
    });
  }

  updateAppointment(): void {
    if (this.appointmentForm.valid) {
      const updatedAppointment = this.appointmentForm.getRawValue(); 
      console.log('Submitting updated appointment:', updatedAppointment);

      this.appointmentService.updateAppointment(this.appointmentId, updatedAppointment).subscribe({
        next: (data) => {
          console.log('Appointment updated successfully', data);
          this.router.navigate([`/appointment/${this.appointmentId}`]);
        },
        error: (err) => {
          console.error('Error updating appointment', err);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

  backToHome(): void {
    this.router.navigate(['/home']);  
  }
}
