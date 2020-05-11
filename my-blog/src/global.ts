export interface Qlist {
  id: number;
  name: string;
  path: string;
}

export interface Qtag {
  value: string;
  label: string;
  disabled?: boolean;
} 

export const INFORMATION_LIST: Qlist[] = [
  { id: 0, name: "today", path: "/article?articleId=18u4gt2bddvk00" },
  { id: 1, name: "week", path: "/excellent" },
  { id: 2, name: "recommend", path: "/share" },
]

export const NAV_LIST: Qlist[]  = [
  { id: 0, name: "首页", path: "/" },
  { id: 1, name: "等你来答", path: "/questions" },
  // { id: 2, name: '阅读', path: '/hot' },
  { id: 3, name: "发现", path: "/share" },
]

export const TAG_LIST: Qtag[] = [
  { value: "全部", label: "0" },
  { value: "Vue", label: "1" },
  { value: "React", label: "2" },
  { value: "JavaScript", label: "3" },
  { value: "CSS", label: "4" },
  { value: "Node", label: "5" },
  { value: "Flutter", label: "6" },
  { value: "Webpack", label: "7" },
  { value: "TypeScript", label: "8" },
  { value: "Http", label: "9" },
  { value: "Docker", label: "10" },
  { value: "性能优化", label: "11" },
  { value: "小程序", label: "12" },
];

export const TAG_QUESTION: Qtag[] = [
  { value: "全部", label: "0" },
  { value: "已回答", label: "1" },
  { value: "已解决", label: "2" },
];

export const TAG_SHARE: Qtag[] = [
  { value: "视频推荐", label: "0" },
  { value: "必读书单", label: "1" },
  { value: "内推招聘", label: "2" },
];