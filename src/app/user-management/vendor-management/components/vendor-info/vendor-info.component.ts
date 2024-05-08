import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import icMail from "@iconify/icons-ic/twotone-mail";
import icAccessTime from "@iconify/icons-ic/twotone-access-time";
import icAdd from "@iconify/icons-ic/twotone-add";
import icWhatshot from "@iconify/icons-ic/twotone-whatshot";
import icWork from "@iconify/icons-ic/twotone-work";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icPersonAdd from "@iconify/icons-ic/twotone-person-add";
import icCheck from "@iconify/icons-ic/twotone-check";
import icStar from "@iconify/icons-ic/twotone-star";
import { FriendSuggestion } from "src/app/pages/apps/social/social.component";
import { friendSuggestions } from "src/static-data/friend-suggestions";
import { fadeInRight400ms } from "src/@vex/animations/fade-in-right.animation";
import { fadeInUp400ms } from "src/@vex/animations/fade-in-up.animation";
import { scaleIn400ms } from "src/@vex/animations/scale-in.animation";
import { stagger40ms } from "src/@vex/animations/stagger.animation";
import icStarBorder from "@iconify/icons-ic/twotone-star-border";
import { ActivatedRoute } from "@angular/router";
import { VendorModel } from "../../interfaces/vendor.model";
import { ReplaySubject, Observable } from "rxjs";
import { VendorService } from "../../services/vendor.service";
import { environment } from "src/environments/environment";
import { Contact } from "src/app/pages/apps/contacts/interfaces/contact.interface";
import icVisibility from "@iconify/icons-ic/twotone-visibility";
import icVisibilityOff from "@iconify/icons-ic/twotone-visibility-off";
import icSmartphone from "@iconify/icons-ic/twotone-smartphone";
import icPerson from "@iconify/icons-ic/twotone-person";
import icArrowDropDown from "@iconify/icons-ic/twotone-arrow-drop-down";
import icMenu from "@iconify/icons-ic/twotone-menu";
import icCamera from "@iconify/icons-ic/twotone-camera";
import icMoreVert from "@iconify/icons-ic/twotone-more-vert";
import Swal from "sweetalert2";
@Component({
  selector: "vex-vendor-info",
  templateUrl: "./vendor-info.component.html",
  styleUrls: ["./vendor-info.component.scss"],
  animations: [fadeInUp400ms, fadeInRight400ms, scaleIn400ms, stagger40ms],
})
export class VendorInfoComponent implements OnInit {
  server = environment.baseUrl;
  info: VendorModel;
  visible = false;
  suggestions = friendSuggestions;

  icWork = icWork;
  icPhone = icPhone;
  icPersonAdd = icPersonAdd;
  icCheck = icCheck;
  icMail = icMail;
  icAccessTime = icAccessTime;
  icAdd = icAdd;
  icWhatshot = icWhatshot;
  icStar = icStar;
  icStarBorder = icStarBorder;
  icCamera = icCamera;
  icMenu = icMenu;
  icArrowDropDown = icArrowDropDown;
  icSmartphone = icSmartphone;
  icPerson = icPerson;
  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;
  icMoreVert = icMoreVert;

  vendorId: string;
  @Output() toggleStar = new EventEmitter<Contact["id"]>();
  @Output() openContact = new EventEmitter<Contact["id"]>();
  selectedState: string = "VERIFIED"

  constructor(
    private vendorService: VendorService,
    private route: ActivatedRoute
  ) {
    this.vendorId = this.route.snapshot.paramMap.get("id");
    console.log(this.vendorId);
  }

  ngOnInit(): void {
    this.getData();
  }


  getData = () => {
    this.vendorService.getVendor(this.vendorId).subscribe((res) => {
      this.info = res;
      console.log(this.info);
    });
  };
  async updateStatus() {
    this.vendorService
      .updateStatus(this.vendorId, this.selectedState)
      .subscribe(() => {
        Swal.fire({
          showConfirmButton: false,
          showCancelButton: false,
          icon: 'info',
          title: 'تم تغيير حالة البائع بنجاح',
          timer: 1500
      });
        this.ngOnInit();
      });
  }

  addFriend(friend: FriendSuggestion) {
    friend.added = true;
  }

  removeFriend(friend: FriendSuggestion) {
    friend.added = false;
  }

  trackByName(index: number, friend: FriendSuggestion) {
    return friend.name;
  }
}
