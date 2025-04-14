import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  appointmentForm!: FormGroup;
  userRole: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private fb: FormBuilder
  ) {}

  fields = [
    { name: 'patientName', label: 'Patient Name', type: 'text', minlength: 2 },
    { name: 'animalType', label: 'Animal Type', type: 'text', minlength: 2 },
    { name: 'ownerIdCardNumber', label: 'Owner ID Card Number', type: 'text', pattern: '^[0-9]{6}[A-Za-z]$' },
    { name: 'ownerName', label: 'Owner Name', type: 'text', minlength: 2 },
    { name: 'ownerSurname', label: 'Owner Surname', type: 'text', minlength: 2 },
    { name: 'ownerContactNumber', label: 'Owner Contact Number', type: 'text', minlength: 8, pattern: '^[0-9]*$' },
    { name: 'appointmentDate', label: 'Appointment Date', type: 'text' },
    { name: 'appointmentTime', label: 'Appointment Time', type: 'text' },
    { name: 'appointmentDuration', label: 'Appointment Duration', type: 'number' }, 
    { name: 'reasonForAppointment', label: 'Reason for Appointment', type: 'text' },
    { name: 'vetNotes', label: 'Vet Notes', type: 'text' },
  ];

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('role') || '';
    this.setupForm(); 
  }

  idCardValidator(control: AbstractControl): ValidationErrors | null {
    const pattern = /^\d{6}[A-Za-z]{1}$/; 
    if (control.value && !pattern.test(control.value)) {
      return { invalidIdCard: 'ID Card Number must consist of 6 digits followed by a letter.' };
    }
    return null;
  }
  
  mobileNumberValidator(control: AbstractControl): ValidationErrors | null {
    const pattern = /^[0-9]{8,}$/; 
    if (control.value && !pattern.test(control.value)) {
      return { invalidMobileNumber: 'Mobile number must be numeric and at least 8 digits long.' };
    }
    return null;
  }
  
  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const appointmentDate = new Date(control.value);
    if (control.value && appointmentDate <= new Date()) {
      return { invalidDate: 'Appointment date must be in the future.' };
    }
    return null;
  }
  
  setupForm(): void {
    this.appointmentForm = this.fb.group({
      patientName: ['', Validators.required],
      animalType: ['', Validators.required],
      ownerIdCardNumber: ['', [Validators.required, this.idCardValidator]],
      ownerName: ['', Validators.required],
      ownerSurname: ['', Validators.required],
      ownerContactNumber: ['', [Validators.required, this.mobileNumberValidator]],
      appointmentDate: ['', [Validators.required]],
      appointmentTime: ['', Validators.required],
      appointmentDuration: ['', Validators.required],
      reasonForAppointment: ['', Validators.required],
      vetNotes: [''] 
    });
  }

  addAppointment(): void {
    if (this.userRole === "VET") {
      alert("Cannot add appointment as a Vet");
      console.error("Cannot add appointment as a Vet");
      return;
    }
  
    if (this.appointmentForm.valid) {
      const addedAppointment = this.appointmentForm.getRawValue();
  
      this.appointmentService.addAppointment(addedAppointment).subscribe({
        next: () => {
          console.log('Appointment added');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error adding appointment', err);
        }
      });
    } else {
      console.error('Form is invalid');
      this.appointmentForm.markAllAsTouched();  
    }
  }
  
}
