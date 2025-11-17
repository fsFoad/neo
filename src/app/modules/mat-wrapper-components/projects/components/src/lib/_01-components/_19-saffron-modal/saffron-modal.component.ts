import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { SaffronModalButton } from './models/saffron-modal-button';
import { SaffronButtonTypes } from '../_03-saffron-button/models/saffron-button-types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'saffron-modal',
  templateUrl: './saffron-modal.component.html',
  styleUrls: ['./saffron-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule],
})
export class SaffronModalComponent implements AfterViewInit, OnChanges {
  @Input() modalTemplate!: TemplateRef<any>;
  @Input() open = false;
  @Input() hasAccept = false;
  @Input() hasCancel = false;
  @Input() disableCancel = false;
  @Input() disableAccept = false;
  @Input() acceptTitle = 'تایید';
  @Input() cancelTitle = 'لغو';
  @Input() config?: MatDialogConfig = { disableClose: true, autoFocus: false };
  @Input() customButtons: SaffronModalButton[] = [];
  @Input() showHeaderBorder = false;
  @Input() showFooterBorder = false;

  @Output() acceptClicked = new EventEmitter<void>();
  @Output() cancelClicked = new EventEmitter<void>();

  @ViewChild('templateref') public templateref!: TemplateRef<any>;

  public SaffronButtonTypes = SaffronButtonTypes;
  private dialogRef!: MatDialogRef<any, any>;
  private isViewInited = false;

  private isOpenChangeCalled = false;

  constructor(public dialog: MatDialog, public chRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']) {
      this.onOpenChange();
    }
  }

  ngAfterViewInit(): void {
    this.isViewInited = true;
    if (this.isOpenChangeCalled) {
      this.onOpenChange();
    }

    this.chRef.detectChanges();
  }

  private onOpenChange() {
    if (!this.isViewInited) {
      this.isOpenChangeCalled = true;
      return;
    }

    if (this.open) {
      this.openDialog();
    } else {
      this.closeDialog();
    }
  }

  private openDialog() {
    this.dialogRef = this.dialog.open(this.templateref, this.config);
  }

  private closeDialog() {
    this.dialogRef?.close();
  }

  customButtonClick(button: SaffronModalButton) {
    if (button.action) {
      button.action();
    }
  }
}
