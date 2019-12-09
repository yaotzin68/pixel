import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AuthService} from './services/auth/auth.service';
import {RoutingService} from './services/routing/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Ordenes de trabajo',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Agregar orden de trabajo',
      url: '/order',
      icon: 'today'
    },
    {
      title: 'Clientes',
      url: '/clients',
      icon: 'people'
    },
    {
      title: 'Materiales',
      url: '/materials',
      icon: 'paper'
    },
    {
      title: 'Logout',
      url: '/logout',
      icon: 'log-out',
      function: true
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    private router: Router,
    private routingService: RoutingService,
  ) {
    this.initializeApp();
    routingService.loadRouting();
  }

  initializeApp() {
    this.platform.ready()
      .then(() =>
      {
        this.afAuth.user.subscribe(user =>
        {
          if(user)
          {
            this.router.navigate(['/home']);
          }
          else
          {
            this.router.navigate(['/login']);
          }
        }, err => {
          this.router.navigate(['/login']);
        },
        () =>
        {
          this.statusBar.styleDefault();
          this.splashScreen.hide();
        });
    });
  }

  callFunction(obj){
    console.log('OBJ ' , obj);
    if(obj.title === 'Logout')
    {
      this.authService.doLogout()
        .then(() => {
          console.log('logout');
          this.router.navigate(['/login']);
        })
        .catch(err => console.log('Error logout ', err));
    }
  }
}
