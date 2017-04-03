import {Component} from '@angular/core';
import {MdIconRegistry, MdDialog} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

import {DialogComponent} from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  users = [
    {
      name: 'Lia Lugo',
      avatar: 'svg-11',
      details: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage ' +
      'cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta ' +
      'who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue ' +
      'castello caerphilly chalk and cheese. Lancashire.',
      isAdmin: true,
      isCool: false
    },
    {
      name: 'George Duke',
      avatar: 'svg-12',
      details: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata ' +
      'corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor ' +
      'dictum mauris.',
      isAdmin: false,
      isCool: true
    },
    {
      name: 'Gener Delosreyes',
      avatar: 'svg-13',
      details: 'Raw denim pour-over readymade Etsy Pitchfork. Four dollar toast pickled locavore bitters McSweeney\'s ' +
      'blog. Try-hard art party Shoreditch selfies. Odd Future butcher VHS, disrupt pop-up Thundercats ' +
      'chillwave vinyl jean shorts taxidermy master cleanse letterpress Wes Anderson mustache Helvetica. ' +
      'Schlitz bicycle rights chillwave irony lumberhungry Kickstarter next level sriracha typewriter ' +
      'Intelligentsia, migas kogi heirloom tousled. Disrupt 3 wolf moon lomo four loko. Pug mlkshk fanny pack ' +
      'literally hoodie bespoke, put a bird on it Marfa messenger bag kogi VHS.',
      isAdmin: true,
      isCool: true
    },
    {
      name: 'Lawrence Ray',
      avatar: 'svg-14',
      details: 'Scratch the furniture spit up on light gray carpet instead of adjacent linoleum so eat a plant, kill ' +
      'a hand pelt around the house and up and down stairs chasing phantoms run in circles, or claw drapes. ' +
      'Always hungry pelt around the house and up and down stairs chasing phantoms.',
      isAdmin: false,
      isCool: false
    },
    {
      name: 'Ernesto Urbina',
      avatar: 'svg-10',
      details: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku ' +
      'wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.',
      isAdmin: false,
      isCool: true
    },
    {
      name: 'Gani Ferrer',
      avatar: 'svg-16',
      details: 'Lebowski ipsum yeah? What do you think happens when you get rad? You turn in your library card? ' +
      'Get a new driver\'s license? Stop being awesome? Dolor sit amet, consectetur adipiscing elit praesent ' +
      'ac magna justo pellentesque ac lectus. You don\'t go out and make a living dressed like that in the ' +
      'middle of a weekday. Quis elit blandit fringilla a ut turpis praesent felis ligula, malesuada suscipit ' +
      'malesuada.',
      isAdmin: true,
      isCool: true
    }
  ];

  selectedUser = this.users[0];
  isDarkTheme = false;

  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer, private dialog: MdDialog) {
    // To avoid XSS attacks, the URL needs to be trusted from inside of your application.
    const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('./assets/avatars.svg');

    iconRegistry.addSvgIconSetInNamespace('avatars', avatarsSafeUrl);
  }

  private openAdminDialog() {
    this.dialog.open(DialogComponent).afterClosed()
      .filter(result => !!result)
      .subscribe(user => {
        this.users.push(user);
        this.selectedUser = user;
      });
  }

}
