export interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  height: number | null;
  phone: string | null;
  email: string;
  gender: string;
  medical_record_number: string;
  is_active: boolean | string;
}
