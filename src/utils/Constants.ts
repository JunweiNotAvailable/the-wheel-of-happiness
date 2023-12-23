import { Score } from "./Interfaces";

export const initialScore: Score = { body: 0, mind: 0, soul: 0, family: 0, romance: 0, friends: 0, mission: 0, money: 0, growth: 0 };
export const names = ['body', 'mind', 'soul', 'family', 'romance', 'friends', 'mission', 'money', 'growth'];
export const wheelOfLifeName = 'wheel-of-life-name';
export const wheelOfLifeScore = 'wheel-of-life-score';
export const wheelOfLifePage = 'wheel-of-life-page';

export const animals = [
  { type: 'snail', score: [0, 0, 0], img: '' },
  { type: 'beaver', score: [0, 0, 1], img: '' },
  { type: 'firefly', score: [0, 1, 0], img: '' },
  { type: 'ant', score: [0, 1, 1], img: '' },
  { type: 'antelope', score: [1, 0, 0], img: '' },
  { type: 'eagle', score: [1, 0, 1], img: '' },
  { type: 'dolphin', score: [1, 1, 0], img: '' },
  { type: 'lion', score: [1, 1, 1], img: '' },
];