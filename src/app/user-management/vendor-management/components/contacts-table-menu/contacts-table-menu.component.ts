import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import icViewHeadline from '@iconify/icons-ic/twotone-view-headline';
import { Icon } from '@visurel/iconify-angular';
import icHistory from '@iconify/icons-ic/twotone-history';
import icStar from '@iconify/icons-ic/twotone-star';
import icLabel from '@iconify/icons-ic/twotone-label';
import icPersonAdd from '@iconify/icons-ic/twotone-person-add';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { Contact } from 'src/app/pages/apps/contacts/interfaces/contact.interface';
import { contactsData } from 'src/static-data/contacts';
import { VendorService } from '../../services/vendor.service';

export interface ContactsTableMenu {
  type: 'link' | 'subheading';
  id?: 'all' | 'active' | 'inactive';
  icon?: Icon;
  label: string;
  classes?: {
    icon?: string;
  };
}

@Component({
  selector: 'vex-contacts-table-menu',
  templateUrl: './contacts-table-menu.component.html',
  animations: [fadeInRight400ms, stagger40ms]
})
export class ContactsTableMenuComponent implements OnInit {

  @Input() items: ContactsTableMenu[] = [
    {
      type: 'link',
      id: 'all',
      icon: icViewHeadline,
      label: 'كل البائعين '
    },
    {
      type: 'link',
      id: 'active',
      icon: icStar,
      label: 'البائعين  النشطين'
    },
    {
      type: 'link',
      id: 'inactive',
      icon: icHistory,
      label: 'البائعين غير النشطين'
    },

  ];

  @Output() filterChange = new EventEmitter<any>();
  @Output() openAddNew = new EventEmitter<void>();

  activeCategory: ContactsTableMenu['id'] = 'all';
  icPersonAdd = icPersonAdd;
  tableData: any;

  constructor(private vendorService: VendorService) { }

  ngOnInit() {
   this.getAllVendors()

  }

 async  getAllVendors() {
    this.vendorService.getVendors().subscribe(res=>{
      this.tableData = res
      console.log(this.tableData)
    });
  }

 async  getAllVInactive(){
    this.vendorService.getAllVendorsInactive().subscribe(res=>{
      this.tableData=res
      console.log(this.tableData)
    })
  };

  async getAllVActive(){
    this.vendorService.getAllVendorsActive().subscribe(res=>{
      this.tableData=res
      console.log(this.tableData)
    })
  }

  async setFilter(category: ContactsTableMenu['id']) {
    this.activeCategory = category;

    if (category === 'active') {
   
      this.vendorService.getAllVendorsActive().subscribe(res=>{
        this.filterChange.emit([]);
        this.filterChange.emit({res, category});
      })
    }

    if (category === 'inactive') {
    
      this.vendorService.getAllVendorsInactive().subscribe(res=>{
        this.filterChange.emit([]);
        this.filterChange.emit({res, category});
      })
    }

    if (category === 'all') {
    
  

      this.vendorService.getVendors().subscribe(res=>{
        this.filterChange.emit([]);
        this.filterChange.emit({res, category});
      })
    }


  }

  isActive(category: ContactsTableMenu['id']) {
    return this.activeCategory === category;
  }
}
