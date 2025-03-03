import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component'; 

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `
    <div class="flex h-screen">
      <app-sidebar class="w-64"></app-sidebar>
      <div class="flex-1 p-4 overflow-auto">
        <router-outlet></router-outlet>
      </div>
    </div>  
  `,
})
export class LayoutComponent {}
