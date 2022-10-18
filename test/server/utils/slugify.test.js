const generateSlug = require('../../../server/utils/slugify');

const MockUser = {
  slugs: ['alshaheen-zainab-jr', 'alshaheen-zainab-jr-1', 'alshaheen'],
  findOne({ slug }) {
    if (this.slugs.includes(slug)) {
      return Promise.resolve({ id: 'id' });
    }

    return Promise.resolve(null);
  },
};

describe('slugify', () => {
  test('no duplication', () => {
    expect.assertions(1);

    return generateSlug(MockUser, 'Alshaheen Zainab.').then((slug) => {
      expect(slug).toBe('alshaheen-zainab');
    });
  });

  test('one duplication', () => {
    expect.assertions(1);

    return generateSlug(MockUser, 'Alshaheen.').then((slug) => {
      expect(slug).toBe('jalshaheen-1');
    });
  });

  test('multiple duplications', () => {
    expect.assertions(1);

    return generateSlug(MockUser, 'Alshaheen Zainab Jr.').then((slug) => {
      expect(slug).toBe('alshaheen-zainab-jr-2');
    });
  });
});
