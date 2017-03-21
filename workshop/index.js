import createMenu from 'simple-terminal-menu';
import {Checkout, Repository, Tag} from 'nodegit';

const checkoutTag = (repo, commit) => label => {
  console.log(`checking out ${label}`);

  return Checkout.tree(repo, commit, {checkoutStrategy: Checkout.STRATEGY.FORCE})
    .then(() => repo.setHeadDetached(commit.id()))
    .then(() => console.log('checkout complete'))
    .catch(console.log);
};

const populateTag = (repo, tag) =>
  repo.getReferenceCommit(tag)
    .then(commit => ({name: tag, commit}));

const buildTags = (repo, tags, prefix = '') => {
  return Promise.resolve(tags.filter(tag => tag.startsWith(prefix)))
    .then(tags => Promise.all(tags.map(tag => populateTag(repo, tag))))
    .then(tags => tags.map(tag => ({
      ...tag,
      prefix,
      label: tag.name.split('-').slice(1).join(' ').toUpperCase()
    })));
};

function mainMenu() {
  const tagPrefix = 'workshop';

  Repository.open('./')
    .then(repo => Promise.all([repo, Tag.list(repo)]))
    .then(([repo, tags]) => Promise.all([repo, buildTags(repo, tags, tagPrefix)]))
    .then(([repo, tags]) => Promise.all([repo, tags, repo.getHeadCommit()]))
    .then(([repo, tags, headCommit]) => {
      if (!tags.length) {
        return console.log(`There are no tags that starts with '${tagPrefix}'`);
      }

      const menu = createMenu({x: 2, y: 2});

      menu.writeLine('Material Workshop', 'current');
      menu.writeSeparator();
      tags.forEach(({label, commit}) => {
        menu.addItem({
          label,
          marker: headCommit.id().equal(commit.id()) ? 'here' : '',
          handler: checkoutTag(repo, commit)
        });
      });
      menu.writeSeparator();
      menu.writeLine('SELECTING ONE OF THE OPTIONS ABOVE WILL DELETE');
      menu.writeLine('ALL OF YOUR WORKING CHANGES');
      menu.writeSeparator();
      menu.add("Exit", menu.close);
    })
}

mainMenu();
