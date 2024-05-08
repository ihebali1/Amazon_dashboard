import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { Contact } from 'src/app/pages/apps/contacts/interfaces/contact.interface';
import { contactsData } from 'src/static-data/contacts';
import icContacts from '@iconify/icons-ic/twotone-contacts';
import icSearch from '@iconify/icons-ic/twotone-search';
import icStar from '@iconify/icons-ic/twotone-star';
import icMenu from '@iconify/icons-ic/twotone-menu';
import { CustomerService } from '../../services/customer.service';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from 'src/@vex/animations/scale-fade-in.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';

@Component({
  selector: 'vex-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  animations: [
    fadeInUp400ms,
    fadeInRight400ms,
    stagger40ms,
    scaleFadeIn400ms,
    scaleIn400ms
  ],
})
export class CustomerListComponent implements OnInit {

  searchCtrl = new FormControl();

  searchStr$ = this.searchCtrl.valueChanges.pipe(
    debounceTime(10)
  );

  menuOpen = false;

  activeCategory: 'frequently' | 'starred' | 'all' | 'family' | 'friends' | 'colleagues' | 'business' = 'all';
  tableData = [];
  tableColumns: TableColumn<any>[] = [

    {
      label: '',
      property: 'imageSrc',
      type: 'image',
      cssClasses: ['min-w-9']
    },
    {
      label: 'الاسم الكامل',
      property: 'name',
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
      label: 'رقم الهاتف',
      property: 'phone',
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

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomers()
  }
  
  getCustomers(){
    this.customerService.getCustomers().subscribe(
      (customers: any[])=>{
        customers.forEach(customer=>{
          customer.name = `${customer.firstName} ${customer.lastName}`
        })
        this.tableData = customers;
      }
    )
  }

  toggleStar(id: Contact['id']) {
    const contact = this.tableData.find(c => c.id === id);

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
