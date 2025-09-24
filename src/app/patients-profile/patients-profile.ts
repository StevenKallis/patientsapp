import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { PatientService } from '../services/patient-service/patient-service';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../shared/patient';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { PatientNote } from '../shared/patient-note';

@Component({
  selector: 'app-patients-profile',
  imports: [CommonModule, FormsModule, NzTableModule, NzCardModule],
  templateUrl: './patients-profile.html',
  styleUrl: './patients-profile.scss',
})
export class PatientsProfile implements OnInit {
  private readonly patientService = inject(PatientService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly id = this.route.snapshot.paramMap.get('id');

  patientProfile!: Patient;
  patientNotes: PatientNote[] = [];

  ngOnInit(): void {
    this.patientService
      .getPatientById(this.id!)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: Patient) => {
        if (data) {
          this.patientProfile = data;
        }
      });

    this.patientService
      .getNotesByPatientId(this.id!)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        if (data) {
          console.log(data);
          this.patientNotes = data;
        }
      });
  }
}
