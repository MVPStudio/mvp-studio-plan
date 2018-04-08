import { Howl } from 'howler';

export const grab = new Howl({
  src: [require('./assets/sounds/grab.wav')],
  volume: 0.2,
});

export const drop = new Howl({
  src: [require('./assets/sounds/drop.wav')],
  volume: 0.2,
});

export const fire = new Howl({
  src: [
    require('./assets/sounds/fire.m4a'),
    require('./assets/sounds/fire.wav'),
  ],
  volume: 0.2,
})
