import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { ContactsEditComponent } from 'src/app/pages/apps/contacts/components/contacts-edit/contacts-edit.component';
import { Contact } from 'src/app/pages/apps/contacts/interfaces/contact.interface';
import { contactsData } from 'src/static-data/contacts';
import icContacts from '@iconify/icons-ic/twotone-contacts';
import icSearch from '@iconify/icons-ic/twotone-search';
import icStar from '@iconify/icons-ic/twotone-star';
import icMenu from '@iconify/icons-ic/twotone-menu';
import { VendorService } from '../../services/vendor.service';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from 'src/@vex/animations/scale-fade-in.animation';
import { stagger20ms, stagger40ms } from 'src/@vex/animations/stagger.animation';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';

@Component({
  selector: 'vex-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    stagger40ms,
    scaleFadeIn400ms,
    scaleIn400ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
  
})
export class VendorListComponent implements OnInit {

  
  searchCtrl = new FormControl();

  searchStr$ = this.searchCtrl.valueChanges.pipe(
    debounceTime(10)
  );

  menuOpen = false;

  activeCategory: 'inactive' | 'active' | 'all';
  tableData = [];
  tableColumns: TableColumn<Contact>[] = [
    {
      label: '',
      property: 'selected',
      type: 'checkbox',
      cssClasses: ['w-6']
    },
    {
      label: '',
      property: 'imageSrc',
      type: 'image',
      cssClasses: ['min-w-9']
    },
    {
      label: 'الاسم ',
      property: 'firstName',
      type: 'text',
      cssClasses: ['font-medium']
    },
    {
      label: 'اللقب',
      property: 'lastName',
      type: 'text',
      cssClasses: ['font-medium']
    },
    {
      label: 'البريد الإلكتروني',
      property: 'email',
      type: 'text',
      cssClasses: ['text-secondary']
    },
    {
      label: 'الحالة',
      property: 'vendorState',
      type: 'text',
      cssClasses: ['text-secondary']
    },
    {
      label: 'تاريخ التسجيل',
      property: 'createdAt',
      type: 'text',
      cssClasses: ['text-secondary']
    },
  ];

  icStar = icStar;
  icSearch = icSearch;
  icContacts = icContacts;
  icMenu = icMenu;
  category: any;

  constructor(private vendorService: VendorService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.vendorService.getVendors().subscribe(res=>{
      this.tableData = res
      this.category= 'all'
      console.log(this.tableData)
    });
  }

  async toggleStar(id) {
    console.log(this.category)
    if (this.category == 'active') {
      this.vendorService.getAllVendorsActive().subscribe(res=>{
        this.tableData=res
        console.log(this.tableData)
        this.cd.detectChanges();
      })
      console.log('rr')
    }
  
    if (this.category == 'all')
    this.vendorService.getVendors().subscribe(res=>{
      this.tableData=res
      console.log(this.tableData)
      this.cd.detectChanges();
    })
    if (this.category == 'inactive')
    this.vendorService.getAllVendorsInactive().subscribe(res=>{
      this.tableData=res
      console.log(this.tableData)
      this.cd.detectChanges();
    })
    
    this.cd.detectChanges();
  }


  setData(data: any) {
    console.log(data)
    this.category = data.category
    this.tableData=[];
    if(data.res) this.tableData = data.res;
    
    console.log(this.tableData)
    this.menuOpen = false;
    this.cd.detectChanges();
  }

  openMenu() {
    this.menuOpen = true;
  }

}
