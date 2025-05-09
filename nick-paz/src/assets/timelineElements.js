import catpic from './angrycat.png';

const timelineElements = [
  {
    id: 1,
    title: "Graduated from University",
    description: "Completed my degree in Computer Science",
    date: "2014-2018",
    icon: "school",
    color: "blue",
    images: [catpic],
  },
  {
    id: 2,
    title: "Software Developer Internship",
    description: "Worked on web development projects",
    date: "2018-2019",
    icon: "work",
    color: "purple",
    images: ["JavaScript", "React", "Node.js", "SQL"],
  },
  {
    id: 3,
    title: "Front-end Developer Job",
    description: "Joined a tech company as a front-end developer",
    date: "2019-2021",
    icon: "work",
    color: "yellow",
    images: ["React", "HTML", "CSS", "JavaScript", "Angular"],
  },
  {
    id: 4,
    title: "Back-end Developer Job",
    description: "Transitioned to back-end development role",
    date: "2021-2023",
    icon: "work",
    color: "red",
    images: ["Node.js", "JavaScript", "SQL", "Python"],
  },
  {
    id: 5,
    title: "Started Freelancing",
    description: "Began working as a freelance developer",
    date: "2023-present",
    icon: "work",
    color: "orange",
    images: ["JavaScript", "React", "HTML", "CSS", "Python"],
  },
];

export default timelineElements.reverse();