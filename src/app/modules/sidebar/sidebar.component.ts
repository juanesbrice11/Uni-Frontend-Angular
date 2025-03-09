import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, User, Calendar, Book, ClipboardList, Building, TrendingUp, ClipboardCheck, Users } from 'lucide-angular';

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
  icons = {
    users: Users,
    calendar: Calendar,
    book: Book,
    clipboardList: ClipboardList,
    building: Building,
    trendingUp: TrendingUp, 
    clipboardCheck: ClipboardCheck,
    user: User
  };
}
