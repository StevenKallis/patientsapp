import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../shared/patient.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { PatientNote } from '../shared/patient.model';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { switchMap } from 'rxjs';
import { PatientService } from '../services/patient-service/patient.service';

@Component({
  selector: 'app-patients-profile',
  imports: [CommonModule, FormsModule, NzTableModule, NzCardModule, NzIconModule],
  templateUrl: './patients-profile.html',
  styleUrl: './patients-profile.scss',
})
export class PatientsProfile implements OnInit {
  private readonly patientService = inject(PatientService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly id = this.route.snapshot.paramMap.get('id');
  private readonly notesToShow = 5;

  patientProfile!: Patient;
  patientNotes: PatientNote[] = [];
  displayedNotes: PatientNote[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.patientService
      .getPatientById(this.id!)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((patient: Patient) => {
          if (patient) {
            this.patientProfile = patient;
            return this.patientService.getNotesByPatientId(this.id!);
          }
          return [];
        })
      )
      .subscribe((notes) => {
        if (notes) {
          this.patientNotes = notes;
          this.displayedNotes = notes.slice(0, this.notesToShow);
        }
        this.isLoading = false;
      });
  }

  showMore(): void {
    const nextNotes = this.patientNotes.slice(
      this.displayedNotes.length,
      this.displayedNotes.length + this.notesToShow
    );
    this.displayedNotes = [...this.displayedNotes, ...nextNotes];
  }

  hasMore(): boolean {
    return this.displayedNotes.length < this.patientNotes.length;
  }

  goBack(): void {
    this.router.navigate(['/patients']);
  }
}
