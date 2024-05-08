import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { Contact } from "src/app/pages/apps/contacts/interfaces/contact.interface";

import icContacts from "@iconify/icons-ic/twotone-contacts";
import icSearch from "@iconify/icons-ic/twotone-search";
import icStar from "@iconify/icons-ic/twotone-star";
import icMenu from "@iconify/icons-ic/twotone-menu";
import { ProductService } from "src/app/product-management/services/product.service";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { scaleFadeIn400ms } from "src/@vex/animations/scale-fade-in.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";

@Component({
  selector: "vex-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    stagger40ms,
    scaleFadeIn400ms,
    scaleIn400ms
  ],
})
export class ProductListComponent implements OnInit {
  searchCtrl = new FormControl();

  searchStr$ = this.searchCtrl.valueChanges.pipe(debounceTime(10));

  menuOpen = false;

  activeCategory:
    | "frequently"
    | "starred"
    | "all"
    | "family"
    | "friends"
    | "colleagues"
    | "business" = "all";
  tableData = [];
  tableColumns: TableColumn<any>[] = [

    {
      label: "",
      property: "imageSrc",
      type: "image",
      cssClasses: ["min-w-9"],
    },
    {
      label: "اسم المنتج",
      property: "name",
      type: "text",
      cssClasses: ["font-medium"],
    },
    {
      label: " اسم البائع",
      property: "vendorName",
      type: "text",
      cssClasses: ["font-medium"],
    },
    {
      label: " الفئة الفرعية",
      property: "childCategoryName",
      type: "text",
      cssClasses: ["text-secondary"],
    },
    {
      label: " حالة المنتج",
      property: "status",
      type: "text",
      cssClasses: ["text-secondary"],
    },
  ];

  icStar = icStar;
  icSearch = icSearch;
  icContacts = icContacts;
  icMenu = icMenu;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts('PENDING');
  }

  onChange(value: string) {
    console.log(value)
    if (value == 'APPROVED') this.getProducts('APPROVED');
    if (value == 'REJECTED') this.getProducts('REJECTED');
    if (value == 'PENDING') this.getProducts('PENDING');
    if (value == '') this.getProducts();
  }

  getProducts(status=null) {

    this.productService.getProducts(status).subscribe((products: any) => {
      this.tableData = [];
      console.log(products);
      products.products.forEach((product) => {
        product.childCategoryName = product?.childCategory?.name;
        product.vendorName = `${product?.vendor?.firstName} ${product?.vendor?.lastName}`;
      });
      this.tableData = products.products;
    });
  }

  toggleStar(id: Contact["id"]) {
    const contact = this.tableData.find((c) => c.id === id);

    if (contact) {
      contact.starred = !contact.starred;
    }
  }

  setData(data: Contact[]) {
    this.tableData = data;
    this.menuOpen = false;
  }

  openMenu() {
    this.menuOpen = true;
  }
}
