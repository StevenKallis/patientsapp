import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Patients } from './patients/patients';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Patients],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('patientsapp');
}
