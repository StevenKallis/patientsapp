import { Routes } from '@angular/router';
import { Patients } from './patients/patients';
import { PatientsProfile } from './patients-profile/patients-profile';

export const routes: Routes = [
  {
    path: 'patients',
    children: [
      {
        path: '',
        component: Patients,
      },
      {
        path: ':id',
        component: PatientsProfile,
      },
    ],
  },
  {
    path: '**',
    component: Patients,
  },
];
