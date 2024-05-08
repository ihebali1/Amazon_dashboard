import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BrandListComponent } from "./pages/brand-list/brand-list.component";

const routes: Routes = [
  {
    component: BrandListComponent,
    path: "",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandManagementRoutingModule {}
