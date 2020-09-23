import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

import { SigninComponent } from './signin/signin.component';
import { AuthGuardService } from './Services/AuthGuard/auth-guard.service';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule),
        canActivate: [AuthGuardService]
      }
    ]
  },
  {
    path: 'login', component: SigninComponent
  },
  // {
  //   path: '**',
  //   redirectTo: '/dashboard',
  //   canActivate: [AuthGuardService]
  // }
];
