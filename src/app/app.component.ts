import { Component } from '@angular/core';

import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  name = 'Test User';
  myRoute = 'Fin Goods';
  displayRoute: any;

  constructor(private router: Router) { }

  onChange() {
    this.myRoute = 'Fin Goods';
  }
  onAnchorClick(myRoute) {
    if (myRoute === 'Fin Goods') {
      this.displayRoute = false;
    }else {
      this.displayRoute = true;
    }
    switch (myRoute) {
        case 'Global Search/Add':
          this.router.navigate(['/globalSearch']);
          break;
        case 'Location Maintenance':
          this.router.navigate(['/locationMaintenance']);
          break;
        default:
          this.displayRoute = false;
          break;
    }
  }

}
