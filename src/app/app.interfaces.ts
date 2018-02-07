export interface ICourseDetails {
  id: number;
  date: string;
  description: string;
  type: 'Video' | 'Webinar';
  length: number; /* in minutes */
  editCourse?: () => void;
  deleteCourse?: () => void;
  isTopRated?: boolean;
  authors?: Author[];
  name: string;
}

export interface Author {
  id: number;
  firstName: string;
  lastName: string;
}
