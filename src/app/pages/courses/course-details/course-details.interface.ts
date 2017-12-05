export interface ICourseDetails {
  courseDate: Date;
  description: string;
  type: 'Video' | 'Webinar';
  duration: number; /* in minutes */
  editCourse?: () => void;
  deleteCourse?: () => void;
}
