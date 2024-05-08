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

export interface ContactsTableMenu {
  type: 'link' | 'subheading';
  id?: 'frequently' | 'starred' | 'all' | 'family' | 'friends' | 'colleagues' | 'business';
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


  @Output() filterChange = new EventEmitter<Contact[]>();
  @Output() openAddNew = new EventEmitter<void>();

  activeCategory: ContactsTableMenu['id'] = 'all';
  icPersonAdd = icPersonAdd;

  constructor() { }

  ngOnInit() {
  }

  setFilter(category: ContactsTableMenu['id']) {
    this.activeCategory = category;

    if (category === 'starred') {
      return this.filterChange.emit(contactsData.filter(c => c.starred));
    }

    if (category === 'all') {
      return this.filterChange.emit(contactsData);
    }

    if (category === 'frequently'
      || category === 'family'
      || category === 'friends'
      || category === 'colleagues'
      || category === 'business') {
      return this.filterChange.emit([]);
    }
  }

  isActive(category: ContactsTableMenu['id']) {
    return this.activeCategory === category;
  }
}
