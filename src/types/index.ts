export interface Project {
  id: string;
  name: string;
  category: 'structure' | 'art';
  date: string;
  location: string;
  description: string;
  details: string[];
  image: string;
  images?: string[];
  files?: ProjectFile[];
}

export interface ProjectFile {
  name: string;
  url: string;
  type: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  projectId?: string;
}
