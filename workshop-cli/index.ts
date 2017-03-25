const createMenu = require('simple-terminal-menu');
const git = require('simple-git/promise')();

const checkoutTag = tag => {
  return git.reset(['--hard', tag])
    .then(() => mainMenu())
    .catch(console.log);
};

const populateTag = tag =>
  getTagHash(tag)
    .then(commit => ({name: tag, commit}));

const checkChanges = () => git.diff(['--name-only']);

const buildTags = (tags, prefix = '') => {
  return Promise.resolve(tags.filter(tag => tag.startsWith(prefix)))
    .then(tags => tags.sort((a, b) => parseInt(a.split('-')[2]) - parseInt(b.split('-')[2])))
    .then(tags => Promise.all(tags.map(tag => populateTag(tag))))
    .then(tags => tags.map((tag: any) => ({
      ...tag,
      prefix,
      label: tag.name.split('-').slice(1).join(' ').toUpperCase()
    })));
};

const getTagList = () => git.tags().then(({all: tags}) => tags);

const getTagHash = tagName => git.raw(['show-ref', '-s', tagName]);

const confirmSelectionMenu = name => {
  const subMenu = createMenu({x: 2, y: 2});
  subMenu.writeLine('Material Workshop');
  subMenu.writeSeparator();
  subMenu.writeLine(`Are you sure you want to checkout ${name}`);
  subMenu.writeLine(`and lose all your working changes?`);
  subMenu.writeSeparator();
  subMenu.add('Yes', () => checkoutTag(name));
  subMenu.add('No', mainMenu)
};

const mainMenu = () => {
  const tagPrefix = 'workshop';

  return getTagList()
    .then(tags => buildTags(tags, tagPrefix))
    .then(tags => Promise.all([tags, git.revparse(['HEAD'])]))
    .then(([tags, headCommit]) => {
      if (!tags.length) {
        return console.log(`There are no tags that starts with '${tagPrefix}'`);
      }

      const menu = createMenu({x: 2, y: 2});

      menu.writeLine('Material Workshop', 'current');
      menu.writeSeparator();
      tags.forEach(({name, label, commit}) => {
        menu.addItem({
          label,
          marker: headCommit === commit ? 'here' : '',
          handler: () => checkChanges().then(changes => changes ? confirmSelectionMenu(name) : checkoutTag(name))
        });
      });
      menu.writeSeparator();
      menu.writeLine('SELECTING ONE OF THE OPTIONS ABOVE WILL DELETE');
      menu.writeLine('ALL OF YOUR WORKING CHANGES');
      menu.writeSeparator();
      menu.add("Exit", menu.close);
    })
};

mainMenu();
