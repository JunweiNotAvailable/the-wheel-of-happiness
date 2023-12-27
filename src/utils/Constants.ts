import { Score } from "./Interfaces";

export const initialScore: Score = { body: 0, mind: 0, soul: 0, family: 0, romance: 0, friends: 0, mission: 0, money: 0, growth: 0 };
export const names = ['body', 'mind', 'soul', 'family', 'romance', 'friends', 'mission', 'money', 'growth'];
export const colors = ['#eed056', '#ec1c24', '#7be7ba', '#e0a21b', '#ed8fad', '#3c42f4', '#0ed145', '#00a8f3', '#afa7dc'];
export const wheelOfLifeName = 'wheel-of-life-name';
export const wheelOfLifeScore = 'wheel-of-life-score';
export const wheelOfLifePage = 'wheel-of-life-page';

export const animals = [
  { type: 'snail', score: [0, 0, 0], img: 'snail.png' },
  { type: 'beaver', score: [0, 0, 1], img: 'beaver.png' },
  { type: 'firefly', score: [0, 1, 0], img: 'firefly.png' },
  { type: 'ant', score: [0, 1, 1], img: 'ant.png' },
  { type: 'antelope', score: [1, 0, 0], img: 'antelope.png' },
  { type: 'eagle', score: [1, 0, 1], img: 'eagle.png' },
  { type: 'dolphin', score: [1, 1, 0], img: 'dolphin.png' },
  { type: 'orca', score: [1, 1, 1], img: 'orca.png' },
];