import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Auth, Deploy, User } from '@ionic/cloud-angular';

import { TrackingService } from '../../services/tracking';
import { ApiService, Score } from '../../services/api';
import { TeamScorePage } from '../scores/team';
import { ScoresPage } from '../scores/scores';

interface UserData {
  team_name: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ ApiService, TrackingService ],
  styles: [`
    .circle {
      border-radius: 50%;
    }
  `],
})
export class HomePage {
  public scores: Score[] = [];

  constructor(public navCtrl: NavController, public api: ApiService, public deploy: Deploy, public authA: Auth,
              public userA: User, public plt: Platform, private tracking: TrackingService) {}

  ionViewDidLoad() {
    this.tracking.track("ViewHome");
    if (this.authA.isAuthenticated()) {
      let userData = this.userA.data.data as UserData;
      this.tracking.identify(this.userA.details.email, userData.team_name);
    }
    if (!this.isBrowser()) {
      this.checkForNewVersion();
    }
    this.api.fetchScores().subscribe((scores: Score[]) => {
      console.debug('Fetched scores: ', scores);
      this.scores = scores;
    });
  }

  public teamSelected(team: any) {
    this.tracking.track("SelectTeam", {team: team.team_name});
    this.navCtrl.push(TeamScorePage, {year: team.year, team_name: team.team_name});
  }

  public allScores() {
    this.tracking.track("ClickAllScores");
    this.navCtrl.push(ScoresPage, {year: this.scores[0].year, hour: this.scores[0].hour});
  }

  private checkForNewVersion() {
    console.debug('checking for new app version');
    if (this.authA.isAuthenticated()) {
      console.log("checking if we shoudl set channel", this.userA);
    }
    this.deploy.check().then((snapshotAvailable: boolean) => {
      if (snapshotAvailable) {
        console.info('new version available')
        this.deploy.download().then(() => {
          this.tracking.track("DownloadedNewVersion");
          return this.deploy.extract();
        });
      } else {
        console.debug('no new version');
      }
    });
  }

  private isBrowser() {
    if (this.plt.is('core') || this.plt.is('mobileweb')) {
      return true;
    }
    return false;
  }
}
