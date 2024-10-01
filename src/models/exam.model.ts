export interface Exam {
  id?: string;
  title?: string;
  description?: string;
  serviceType?: string;
  isMandatory?: boolean;
  numberOfQuestions?: number;
  passingGrade?: number;
  questions?: Question[];
  enabled?: boolean;
  archiveReason?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  deletedBy?: string;
}
export interface Question {
  id?: string;
  examId?: string;
  question?: string;
  choiceA?: string;
  choiceB?: string;
  choiceC?: string;
  choiceD?: string;
  answer?: string;
}
export interface ExamQuestion {
  examId?: string;
  questions?: Question[];
}
