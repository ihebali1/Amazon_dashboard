import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Transporter } from "../../../transporter-management/Models/Transporter";
import { Message } from "../../Model/Message";
import { ChatGroupService } from "../../Service/chat-group.service";
import { Report } from "../../Model/report";
import { environment } from "../../../../environments/environment";
import { DomSanitizer } from "@angular/platform-browser";
import Swal from "sweetalert2";

@Component({
  selector: "vex-chat-group",
  templateUrl: "./chat-group.component.html",
  styleUrls: ["./chat-group.component.scss"],
})
export class ChatGroupComponent implements OnInit {
  server: any;
  messages: Message[];
  adminMessage: any;
  messagesLoaded: any;
  santizer: DomSanitizer;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Report,
    private dialogRef: MatDialogRef<ChatGroupComponent>,
    private chatService: ChatGroupService,
    private sanitizer: DomSanitizer
  ) {
    this.server = this.stripTrailingSlash(environment.baseUrl);
  }

  ngOnInit(): void {
    this.messagesLoaded = false;
    this.loadData();
    const $myInput = document.getElementById("inputSendMessage");

    $myInput.onkeydown = (event) => {
      if (event.key === "Enter") {
        this.sendMessage();
      }
    };
  }
  loadData() {
    this.chatService
      .getMessagesOfReport(this.data.id)
      .subscribe((messages: Message[]) => {
        this.messagesLoaded = true;
        this.messages = messages;
        setTimeout(() => {
          this.scrollToBottom();
        }, 500);
      });
  }
  closeDiag() {
    this.dialogRef.close();
  }

  sendMessage() {
    this.chatService
      .senMessage(this.data.id, { message: this.adminMessage })
      .subscribe(
        (messages: Message[]) => {
          this.adminMessage = "";
          this.loadData();
        },
        (err) => {
          Swal.fire({
            showConfirmButton: false,
            showCancelButton: false,
            icon: "error",
            title: err.error.message,
            timer: 2500,
          });
        }
      );
  }
  scrollToBottom(): void {
    const element = document.getElementById("chatCard");
    element.scrollTop = element.scrollHeight;
  }
  stripTrailingSlash(str) {
    if (str.substr(-1) === "/") {
      return str.substr(0, str.length - 1);
    }
    return str;
  }
}
