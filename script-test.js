const { Portfolio, PhotoSession, Photo, Genre, Model } = require('./script.js');

const portfolio = new Portfolio('My Portfolio', '2023-01-01');
const model = new Model('Julia', '79879173661');
const genre = new Genre('Portrait', 'Capturing portraits');

const session1 = new PhotoSession('Session 1', model, genre);
const photo1_1 = new Photo(1, '/path/to/photo1.jpg');
const photo1_2 = new Photo(2, '/path/to/photo2.jpg');

const session2 = new PhotoSession('Session 2', model, genre);
const photo2_1 = new Photo(1, '/path/to/photo1.jpg');
const photo2_2 = new Photo(2, '/path/to/photo2.jpg');

portfolio.addSession(session1);
session1.addPhoto(photo1_1);
session1.addPhoto(photo1_2);
portfolio.addSession(session2);
session2.addPhoto(photo2_1);
session2.addPhoto(photo2_2);

console.log('Portfolio:', portfolio);

portfolio.removeSession(session2);
console.log('Portfolio after removing session:', portfolio);
