import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAddAnnouncementComponent } from './components/admin-add-announcement/admin-add-announcement.component';
import { AdminViewAnnouncementComponent } from './components/admin-view-announcement/admin-view-announcement.component';
import { AdminViewBlogComponent } from './components/admin-view-blog/admin-view-blog.component';
import { AdminViewFeedbackComponent } from './components/admin-view-feedback/admin-view-feedback.component';
import { AuthGuard } from './components/authguard/auth.guard';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserAddBlogComponent } from './components/user-add-blog/user-add-blog.component';
import { UserAddFeedbackComponent } from './components/user-add-feedback/user-add-feedback.component';
import { UserViewAnnouncementComponent } from './components/user-view-announcement/user-view-announcement.component';
import { UserViewBlogComponent } from './components/user-view-blog/user-view-blog.component';
import { UserViewFeedbackComponent } from './components/user-view-feedback/user-view-feedback.component';
import { UserGuard } from './components/userguard/user.guard';
import { AdminGuard } from './components/adminguard/admin.guard';
import { ViewUserblogComponent } from './components/view-userblog/view-userblog.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'admin/view/blog', component: AdminViewBlogComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/view/announcement', component: AdminViewAnnouncementComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/view/feedback', component: AdminViewFeedbackComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/add/announcement', component: AdminAddAnnouncementComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/add/announcement/:id', component: AdminAddAnnouncementComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'user/add/blog', component: UserAddBlogComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'user/add/blog/:id', component: UserAddBlogComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'user/add/feedback', component: UserAddFeedbackComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'user/add/feedback/:id', component: UserAddFeedbackComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'user/view/announcement', component: UserViewAnnouncementComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'user/view/blog/:id', component: UserViewBlogComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'user/view/feedback', component: UserViewFeedbackComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'user/view/feedback/:id', component: UserViewFeedbackComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'app-view-userblog/:id', component: ViewUserblogComponent, canActivate: [AuthGuard,UserGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
