export interface Word {
  id: number;
  english: string;
  vietnamese: string;
  example?: string;
  status: 'not checked' | 'passed' | 'failed';
  unableDelete?: boolean;
  imageUrls?: string[];
  checked?: boolean;
  options?: string[];
}
