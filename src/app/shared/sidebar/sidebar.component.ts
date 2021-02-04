import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  nombre: string = "";
  userSubs : Subscription;

  constructor( private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubs = this.store.select( 'user' ).pipe(
      filter( ({user}) => user != null)
    ).subscribe( ({user}) => this.nombre = user.nombre );
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }


  logout() {
    this.authService.logout().then( () => {
      this.router.navigate(['/login']);
    })

  }
}
