import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GainListComponent } from './pages/gain-list/gain-list.component';

const routes: Routes = [{
  path: 'list',
  component: GainListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformGainRoutingModule { }
