import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GainComponent } from './gain/gain.component';

const routes: Routes = [
  {
    path: '',
    component: GainComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GainRoutingModule { }
