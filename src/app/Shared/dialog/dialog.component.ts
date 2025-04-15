import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent {
  @Input() id!: string;
  @Input() name!: string;
  @Input() class!: string;
  @Input() gender!: string;
  @Input() age!: number;
  @Input() result!: string;
  @Input() maths!: number;
  @Input() physics!: number;
  @Input() english!: number;
  @Input() email!: string;
  @Input() password!: string;

  @Output() close = new EventEmitter<void>();

  closeDialog() {
    this.close.emit();
  }
}
