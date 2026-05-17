import type { Project, TimelineEvent } from '@/types';
// ✨ 1. 在文件最顶部引入图片大管家（如果你的 images.ts 是小写 i，这里改成小写 i）
import { AppImages } from '../assets/Images'; 

export const projects: Project[] = [
  {
    id: 'southern-zen-temple',
    name: '1:29 SOUTHERN ZEN TEMPLE WOOD-MODEL BUILD',
    category: 'structure',
    date: 'Aug. 2023 – Sep. 2023',
    location: 'Beijing, China',
    description: 'Built 1:29 Southern Zen Temple Wood-Model using Sketch Up, Autodesk CAD, CNC machines, and woodworking machines.',
    details: [
      'Built 1:29 Southern Zen Temple Wood-Model',
      'Used Sketch Up, Autodesk CAD, CNC machines, and woodworking machines to design and produce every single component of Tang Dynasty Southern Zen Temple locating in Shanxi, China.',
      'Assembled those components into a Southern Zen Temple model.',
      'Investigated cultural and historical background of Southern Zen Temple.',
    ],
    // ✨ 2. 核心修改：去掉引号，直接换成大管家的变量
    image: AppImages.project1,
    images: [AppImages.project1],
    files: [],
  },
  {
    id: 'steel-frame-design',
    name: 'Special Moment Resisting Frame Building Design',
    category: 'structure',
    date: 'Jan. 2025 – Mar. 2025',
    location: 'UC Davis, USA',
    description: 'Advanced steel structure design project for ECI 232 course, focusing on special moment resisting frames.',
    details: [
      'Designed a 5-story steel building with special moment resisting frames',
      'Performed seismic analysis and load calculations per ASCE 7 standards',
      'Designed beam-column connections and detailing',
      'Created comprehensive structural drawings and calculations',
    ],
    // ✨ 3. 核心修改：去掉引号，直接换成大管家的变量
    image: AppImages.project2,
    images: [AppImages.project2],
    files: [],
  },
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    date: '2023-08',
    title: 'Started Southern Zen Temple Project',
    description: 'Began the wood-model construction at Limoo Studio in Beijing',
    projectId: 'southern-zen-temple',
  },
  {
    id: '2',
    date: '2023-09',
    title: 'Completed Southern Zen Temple Model',
    description: 'Finished the 1:29 scale wood-model of the Tang Dynasty temple',
    projectId: 'southern-zen-temple',
  },
  {
    id: '3',
    date: '2025-01',
    title: 'Started Steel Design Course',
    description: 'Began ECI 232 Advanced Steel Design at UC Davis',
    projectId: 'steel-frame-design',
  },
  {
    id: '4',
    date: '2025-03',
    title: 'Completed Steel Frame Design',
    description: 'Finished the special moment resisting frame building design project',
    projectId: 'steel-frame-design',
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(p => p.id === id);
};

export const getProjectsByCategory = (category: 'structure' | 'art'): Project[] => {
  return projects.filter(p => p.category === category);
};
