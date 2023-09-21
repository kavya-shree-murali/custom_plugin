import { Component, OnInit } from '@angular/core';
import { MessageService } from './message-service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { TwitterService } from 'ng2-twitter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  result: any;

  constructor(private authService: SocialAuthService,
    private twitter: TwitterService) {
  }
  title = 'custom_plugin';
  message;

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    // this.messagingService.requestPermission()
    // this.messagingService.receiveMessage()
    // this.message = this.messagingService.currentMessage
  }

  user: SocialUser;
  loggedIn: boolean;

  getHomeTimeline() {
    this.twitter.get(
      'jIEnYTkv9A0N9qqbpHEExUiF8',
      {
        count: 5
      },
      {
        consumerKey: 'LXlIUXZra282VS1uSnFpbDlMQ246MTpjaQ',
        consumerSecret: 'Bod_EyRpTBxkMCay5Lg-AdW8UYDNKUdy1IloTu6VaaEipG3uF0'
      },
      {
        token: '1694275045722599424-bWihkcyFD3CqVbSgujjcCA4pQeuHDp',
        tokenSecret: 'qZQomxWc9PFuqSBxEaWplEBEHp3fSHzxLSE3eQzR5m99V'
      }
    ).subscribe((res) => {
      this.result = res.json().map(tweet => tweet.text);
    });
  }



}



