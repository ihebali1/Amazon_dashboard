import { Component, OnInit } from '@angular/core';
import icAdd from "@iconify/icons-ic/twotone-add";
import icMoreHoriz from "@iconify/icons-ic/twotone-more-horiz";
import icEdit from "@iconify/icons-ic/twotone-edit";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icContacts from "@iconify/icons-ic/twotone-contacts";
import icSearch from "@iconify/icons-ic/twotone-search";
import icStar from "@iconify/icons-ic/twotone-star";
import icMenu from "@iconify/icons-ic/twotone-menu";
import { MatDialog } from '@angular/material/dialog';
import { CreateBannerComponent } from '../../components/create-banner/create-banner.component';
import { BannerService } from '../../services/banner.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'vex-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {
  menuOpen = false;
  icAdd = icAdd;
  icDelete = icDelete;
  icEdit = icEdit;
  icMoreHoriz = icMoreHoriz;

  icStar = icStar;
  icSearch = icSearch;
  icContacts = icContacts;
  icMenu = icMenu;
  banners: any;
  server: string;
  selectedType: string;

  constructor(public dialog: MatDialog, private bannerService: BannerService, private router: Router) {
    this.server = environment.baseUrl;
  }

  ngOnInit(): void {
    this.getBanners()
  }

  selectType($event: any) {
    console.log($event)
    this.selectedType = $event;
   this.getBanners(this.selectedType)
  }

  getBanners(type?: string) {
    this.bannerService.getBanners(type).subscribe(
      res => this.banners = res
    )
  }

  openBannerCreateDialog() {
    const dialogRef = this.dialog.open(CreateBannerComponent, {
      data: {
        animal: 'panda',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getBanners()
    });
  }

  removeBanner(id: string) {
    this.bannerService.removeBanner(id).subscribe(
      res => this.getBanners()
    )
  }

  updateBannerStatus(id: string) {
    this.bannerService.updateBannerStatus(id).subscribe(
      res => this.getBanners()
    )
  }

  redirect(banner) {
    if (banner.linkType == 'DEPARTMENT') this.router.navigate(['/content-management/department/details/', banner.department.id])
    if (banner.linkType == 'PRODUCT') this.router.navigate(['/product-management/list/details/', (banner.parentListing || banner.simpleProduct).id],
      {
        queryParams: { type: (banner.parentListing || banner.simpleProduct).type, id: (banner.parentListing || banner.simpleProduct).id },
        queryParamsHandling: 'merge'
      })
    if (banner.linkType == 'VENDOR') this.router.navigate(['/user-management/vendor/details/', banner.vendor.id],
    {
      queryParams: { id: banner.vendor.id },
      queryParamsHandling: 'merge'
    })
  }

  translateBannerType(type) {
    if (type == 'HOME_HEADER') return ' الصفحة الرئيسية'
    if (type == 'DEPARTMENT_HEADER') return ' صفحة القسم'

    if (type == 'DEPARTMENT_CARD') return ' بطاقات الأقسام'
    if (type == 'AD') return ' إعلانية'
  }

  translateLinkType(type) {
    if (type == 'PRODUCT') return 'منتج'
    if (type == 'DEPARTMENT') return 'قسم'

    if (type == 'VENDOR') return 'بائع'

  }

}
