// 1. 集中在这里引入所有图片
import avatar from './Images/My_Profile.png';
import project1 from './Images/project1.jpg';
import project2 from './Images/project2.jpg';
// import newPic from './Images/new-pic.png'; // 👈 未来新加图片，直接在这加一行

// 2. 集中导出这张“对照表”
export const AppImages = {
  avatar,
  project1,
  project2,
  // newPic, // 👈 未来新加图片，在这里注册一个名字
};
