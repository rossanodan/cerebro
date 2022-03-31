import { getImage } from './utils';

import { imageWithPathAndExtension } from './utils.mocks';

describe('Resolvers Utils', () => {
  describe('getImage', () => {
    it('should return an object with multiple formats of the same image if path and extention exist', () => {
      const dummyImage = getImage('dummyimage', 'jpg');
      expect(dummyImage).toStrictEqual(imageWithPathAndExtension);
    });

    it('should return null if path or extension do not exist or are empty', () => {
      expect(getImage('dummyimage', undefined)).toBe(null);
      expect(getImage(undefined, 'dummyextension')).toBe(null);
      expect(getImage(undefined, undefined)).toBe(null);
      expect(getImage('dummyimage', '')).toBe(null);
      expect(getImage('', 'dummyextension')).toBe(null);
      expect(getImage('', '')).toBe(null);
      expect(getImage('dummyimage', null)).toBe(null);
      expect(getImage(null, 'dummyextension')).toBe(null);
      expect(getImage(null, null)).toBe(null);
    });
  });
});
