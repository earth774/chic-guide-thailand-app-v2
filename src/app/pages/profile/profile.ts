
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { User } from '../../services/user-service';
import { BasePage } from '../base-page/base-page';
import { ProfileEditPage } from '../profile-edit/profile-edit';
import { ChangePasswordPage } from '../change-password/change-password';
import { SignInPage } from '../sign-in/sign-in';
import { SettingsPage } from '../settings/settings';
import { AppConfigService } from 'src/app/services/app-config.service';
import { AlertController,IonContent } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class ProfilePage extends BasePage implements OnInit {

  @ViewChild(IonContent, { static: true }) container: IonContent;

  public user: User;

  public isReviewsEnabled: boolean;

  constructor(injector: Injector,
    private appConfigService: AppConfigService,
    private userService: User,
    private alertController: AlertController) {
    super(injector);
  }

  enableMenuSwipe() {
    return true;
  }

  ionViewWillEnter() {
    if (this.container) {
      this.container.scrollToTop();
    }
  }

  ngOnInit() {

    this.user = User.getCurrent();

    window.addEventListener("user:login", () => {
      this.user = User.getCurrent();
    });

    this.checkReviewSettings();
  }

  async ionViewDidEnter() {

    this.user = User.getCurrent();

    const title = await this.getTrans('PROFILE');
    this.setPageTitle(title);

    this.setMetaTags({
      title: title
    });
  }

  async checkReviewSettings() {
    try {
      const appConfig = await this.appConfigService.load();

      if (appConfig && appConfig.reviews) {
        this.isReviewsEnabled = !appConfig.reviews.disabled;
      }
    } catch (error) {

    }
  }

  goTo(page: string) {
    this.navigateToRelative('./' + page);
  }

  async onPresentEditModal() {

    await this.showLoadingView({ showOverlay: true });

    const modal = await this.modalCtrl.create({
      component: ProfileEditPage
    });

    await modal.present();

    await this.dismissLoadingView();
  }

  async onPresentChangePasswordModal() {

    await this.showLoadingView({ showOverlay: true });

    const modal = await this.modalCtrl.create({
      component: ChangePasswordPage
    });

    await modal.present();

    await this.dismissLoadingView();
  }

  async onPresentSettingsModal() {

    await this.showLoadingView({ showOverlay: true });

    const modal = await this.modalCtrl.create({
      component: SettingsPage,
    });

    await modal.present();

    await this.dismissLoadingView();
  }

  async openSignInModal() {

    await this.showLoadingView({ showOverlay: true });

    const modal = await this.modalCtrl.create({
      component: SignInPage,
    });

    await modal.present();

    await this.dismissLoadingView();
  }

  onLogout() {
    window.dispatchEvent(new CustomEvent("user:logout"));
  }

  async onAccountDelete() {

    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete your account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: async () => {
            // this.handlerMessage = 'Alert confirmed';
            let user = User.getCurrent();
            let loginData = {
              id: user.id
            }
            let data = await this.userService.deleteAccount(loginData)
            if (data) {
              this.onLogout()
            }

          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    // this.roleMessage = `Dismissed with role: ${role}`;
  }

}
