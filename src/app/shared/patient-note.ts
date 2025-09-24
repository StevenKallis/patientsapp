export interface PatientNote {
  note_id: number;
  patient_id: number;
  note_type: string;
  author: string;
  created_at: string;
  content: string;
  encounter_id: string;
}
