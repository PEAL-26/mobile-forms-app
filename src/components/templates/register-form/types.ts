export interface RegisterFormProps {
  form?: {
    id: number;
    name: string;
    description: string | null;
    totalFields?: number;
  } | null;
}
