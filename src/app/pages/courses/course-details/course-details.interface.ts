export interface ICourseDetails {
  courseDate: string;
  description: string;
  type: 'Video' | 'Webinar';
  duration: number; /* in minutes */
  editCourse?: () => void;
  deleteCourse?: () => void;
  topRated?: boolean;
}
