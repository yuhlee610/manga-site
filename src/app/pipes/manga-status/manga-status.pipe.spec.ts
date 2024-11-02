import { MangaStatusPipe } from './manga-status.pipe';

describe('MangaStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new MangaStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
