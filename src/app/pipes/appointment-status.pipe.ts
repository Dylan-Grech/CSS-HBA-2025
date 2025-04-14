import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appointmentStatus',
  standalone: true
})
export class AppointmentStatusPipe implements PipeTransform {
  transform(appointmentDate: string, appointmentTime: string): string {
    if (!appointmentDate || !appointmentTime) return 'Invalid';

    // Parse MM/DD/YYYY
    const [month, day, year] = appointmentDate.split('/').map(Number);
    const [hours, minutes] = appointmentTime.split(':').map(Number);

    const appointmentDateTime = new Date(year, month - 1, day, hours, minutes);
    const now = new Date();

    if (isNaN(appointmentDateTime.getTime())) {
      return 'Invalid date';
    }

    return appointmentDateTime > now ? 'Upcoming' : 'Past';
  }
}
