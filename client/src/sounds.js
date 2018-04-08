import { Howl } from 'howler';

export const grab = new Howl({
  src: [
    require('./assets/sounds/grab.wav'),
    require('./assets/sounds/grab.m4a'),
  ],
  volume: 0.2,
});

export const drop = new Howl({
  src: [
    require('./assets/sounds/drop.wav'),
    require('./assets/sounds/drop.m4a'),
  ],
  volume: 0.2,
});

export const fire = new Howl({
  src: [
    require('./assets/sounds/fire.wav'),
    require('./assets/sounds/fire.m4a'),
  ],
  volume: 0.2,
})

export const bite = new Howl({
  src: [
    require('./assets/sounds/bite.wav'),
    require('./assets/sounds/bite.m4a'),
  ],
  volume: 1,
});
