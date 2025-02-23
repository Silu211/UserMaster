import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'UserMasterWeb';

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!this.isUserLoggedIn()) {
      this.router.navigateByUrl('login');
    }
  }

  isUserLoggedIn(): boolean {
    if (sessionStorage.length > 0) {
      return true;
    }
    return false;
  }
}
