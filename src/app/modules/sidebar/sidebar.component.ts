import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, User, Calendar, Book, ClipboardList, Building, TrendingUp, ClipboardCheck, Users, LogOut } from 'lucide-angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(private router: Router) {} 

  icons = {
    users: Users,
    calendar: Calendar,
    book: Book,
    clipboardList: ClipboardList,
    building: Building,
    trendingUp: TrendingUp, 
    clipboardCheck: ClipboardCheck,
    user: User,
    logout: LogOut
  };

  logout() {
    localStorage.removeItem('token');  
    window.location.reload();
    this.router.navigate(['/login']);  
  }
}
