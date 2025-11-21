import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    NgModule,
    NgZone, OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    Renderer2, SimpleChanges,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import {animate, AnimationEvent, state, style, transition, trigger} from '@angular/animations';
import { CommonModule, NgClass, NgForOf, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { ButtonDirective, ButtonModule } from 'primeng/button';
import {DomHandler} from 'primeng/dom';
import {PrimeTemplate, SharedModule} from 'primeng/api';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import moment, {Moment} from 'moment-jalaali';
import { InputText } from 'primeng/inputtext';

export const PERSIAN_CALENDAR_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PersianCalendarComponent),
    multi: true
};


interface LocaleSettings {
    firstDayOfWeek?: number;
    dayNames: string[];
    dayNamesShort: string[];
    dayNamesMin: string[];
    monthNames: string[];
    monthNamesShort: string[];
    today: string;
    now: string;
    clear: string;
    dateFormat?: string;
    weekHeader?: string;
}

@Component({
    selector: 'p-persian-calendar',
    template: `
        <span
            [ngClass]="{
                'ui-calendar': true,
                'ui-calendar-w-btn': showIcon,
                'ui-calendar-timeonly': timeOnly,
            }"
            [ngStyle]="style"
            [class]="styleClass"
            style="width: 100%;display: flex;"
        >
            <ng-template [ngIf]="!inline">
                <input
                    #inputfield
                    type="text"
                    style="width: 100%;display: flex;border-radius: 7px;"
                    [attr.id]="inputId"
                    [attr.name]="name"
                    [attr.required]="required"
                    [attr.aria-required]="required"
                    [value]="inputFieldValue"
                    (focus)="onInputFocus($event)"
                    (keydown)="onInputKeydown($event)"
                    (click)="onInputClick()"
                    (blur)="onInputBlur($event)"
                    [readonly]="readonlyInput"
                    (input)="onUserInput($event)"
                    [ngStyle]="inputStyle"
                    [class]="inputStyleClass"
                    [placeholder]="placeholder || ''"
                    [disabled]="disabled"
                    [attr.tabindex]="tabindex"
                    [ngClass]="''"
                    pInputText
                    autocomplete="off"
                    [attr.aria-labelledby]="ariaLabelledBy"
                /><button
                    type="button"
                    [icon]="icon"
                    pButton
                    *ngIf="showIcon"
                    (click)="onButtonClick($event, inputfield)"
                    class="p-button"
                    [ngClass]="{ 'ui-state-disabled': disabled }"
                    [disabled]="disabled"
                    tabindex="0"
                ></button>
            </ng-template>
            <div
                #contentWrapper
                [class]="panelStyleClass"
                [ngStyle]="panelStyle"
                [ngClass]="{
                    'ui-widget': !appendTo,
                    'ui-datepicker ui-widget-content ui-helper-clearfix ui-corner-all': true,
                    'ui-datepicker-inline': inline,
                    'ui-shadow': !inline,
                    'ui-state-disabled': disabled,
                    'ui-datepicker-timeonly': timeOnly,
                    'ui-datepicker-multiple-month': this.numberOfMonths > 1,
                    'ui-datepicker-monthpicker': view === 'month',
                    'ui-datepicker-touch-ui': touchUI,
                }"
                [@overlayAnimation]="
                    touchUI
                        ? {
                              value: 'visibleTouchUI',
                              params: {
                                  showTransitionParams: showTransitionOptions,
                                  hideTransitionParams: hideTransitionOptions,
                              },
                          }
                        : {
                              value: 'visible',
                              params: {
                                  showTransitionParams: showTransitionOptions,
                                  hideTransitionParams: hideTransitionOptions,
                              },
                          }
                "
                [@.disabled]="inline === true"
                (@overlayAnimation.start)="onOverlayAnimationStart($event)"
                (@overlayAnimation.done)="onOverlayAnimationDone($event)"
                *ngIf="inline || overlayVisible"
            >
                <ng-content select="p-header"></ng-content>
                <ng-container *ngIf="!timeOnly">
                    <div
                        class="ui-datepicker-group ui-widget-content"
                        *ngFor="let month of months; let i = index"
                    >
                         <div
                             class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all"
                         >

                               <a
                                   class="ui-datepicker-prev ui-corner-all"
                                   (click)="onPrevButtonClick($event)"
                                   (keydown.enter)="onPrevButtonClick($event)"
                                   *ngIf="i === 0"
                                   tabindex="0"
                                   (keydown)="onInputKeydown($event)"
                               >
                                <span class="ui-datepicker-prev-icon"> < </span>
                            </a>
                            <div class="ui-datepicker-title">
                                <span
                                    class="ui-datepicker-month"
                                    *ngIf="!monthNavigator && view !== 'month'"
                                >{{ locale.monthNames[month.month] }}</span
                                >
                                <select
                                    tabindex="0"
                                    class="ui-datepicker-month"
                                    *ngIf="
                                        monthNavigator &&
                                        view !== 'month' &&
                                        numberOfMonths === 1
                                    "
                                    (change)="
                                        onMonthDropdownChange(
                                            $event.target['value']
                                        )
                                    "
                                >
                                    <option
                                        [value]="i"
                                        *ngFor="
                                            let monthName of locale.monthNames;
                                            let i = index
                                        "
                                        [selected]="i === month.month"
                                    >
                                        {{ monthName }}
                                    </option>
                                </select>
                                <select
                                    tabindex="0" style="min-width: 50px;"
                                    class="ui-datepicker-year"
                                    *ngIf="
                                        yearNavigator && numberOfMonths === 1
                                    "
                                    (change)="
                                        onYearDropdownChange(
                                            $event.target['value']
                                        )
                                    "
                                >
                                    <option
                                        [value]="year"
                                        *ngFor="let year of yearOptions"
                                        [selected]="year === currentYear"
                                    >
                                        {{ year }}
                                    </option>
                                </select>
                                <span
                                    class="ui-datepicker-year"
                                    *ngIf="!yearNavigator"
                                >{{
                                        view === 'month'
                                            ? currentYear
                                            : month.year
                                    }}</span
                                >
                            </div>
                             <a
                                 class="ui-datepicker-next ui-corner-all"
                                 (click)="onNextButtonClick($event)"
                                 (keydown.enter)="onNextButtonClick($event)"
                                 *ngIf="
                                    numberOfMonths === 1
                                        ? true
                                        : i === numberOfMonths - 1
                                "
                                 tabindex="0"
                                 (keydown)="onInputKeydown($event)"
                             >
                                <span class="ui-datepicker-next-icon">>  </span>
                            </a>
                        </div>
                        <div
                            class="ui-datepicker-calendar-container"
                            *ngIf="view === 'date'"
                        >
                            <table class="ui-datepicker-calendar">
                                <thead>
                                    <tr>
                                        <th
                                            *ngIf="showWeek"
                                            class="ui-datepicker-weekheader"
                                        >
                                            <span>{{
                                                    locale['weekHeader']
                                                }}</span>
                                        </th>
                                        <th
                                            scope="col"
                                            *ngFor="
                                                let weekDay of weekDays;
                                                let begin = first;
                                                let end = last
                                            "
                                        >
                                            <span
                                                [class]="
                                                    end ? 'text-danger' : ''
                                                "
                                            >{{ weekDay }}</span
                                            >
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        *ngFor="
                                            let week of month.dates;
                                            let j = index
                                        "
                                    >
                                        <td
                                            *ngIf="showWeek"
                                            class="ui-datepicker-weeknumber ui-state-disabled"
                                        >
                                            <span>
                                                {{ month.weekNumbers[j] }}
                                            </span>
                                        </td>
                                        <td
                                            *ngFor="
                                                let date of week;
                                                let begin = first;
                                                let end = last
                                            "
                                            [ngClass]="{
                                                'ui-datepicker-other-month':
                                                    date.otherMonth,
                                                'ui-datepicker-current-day':
                                                    isSelected(date),
                                                'ui-datepicker-today':
                                                    date.today,
                                            }"
                                        >
                                            <ng-container
                                                *ngIf="
                                                    date.otherMonth
                                                        ? showOtherMonths
                                                        : true
                                                "
                                            >
                                                <a
                                                    class="ui-state-default"
                                                    *ngIf="date.selectable"
                                                    [ngClass]="{
                                                        'ui-state-active':
                                                            isSelected(date),
                                                        'ui-state-highlight':
                                                            date.today,
                                                    }"
                                                    (click)="
                                                        onDateSelect(
                                                            $event,
                                                            date
                                                        )
                                                    "
                                                    draggable="false"
                                                    (keydown)="
                                                        onDateCellKeydown(
                                                            $event,
                                                            date,
                                                            i
                                                        )
                                                    "
                                                >
                                                    <span
                                                        *ngIf="!dateTemplate"
                                                        [class]="
                                                            end
                                                                ? 'text-danger'
                                                                : ''
                                                        "
                                                    >
                                                        {{ date.day }}</span
                                                    >
                                                    <ng-container
                                                        *ngTemplateOutlet="
                                                            dateTemplate;
                                                            context: {
                                                                $implicit: date,
                                                            }
                                                        "
                                                    ></ng-container>
                                                </a>
                                                <span
                                                    class="ui-state-default ui-state-disabled"
                                                    [ngClass]="{
                                                        'ui-state-active':
                                                            isSelected(date),
                                                        'ui-state-highlight':
                                                            date.today,
                                                    }"
                                                    *ngIf="!date.selectable"
                                                >
                                                    <ng-container
                                                        *ngIf="
                                                            !disabledDateTemplate
                                                        "
                                                    >{{
                                                            date.day
                                                        }}</ng-container
                                                    >
                                                    <ng-container
                                                        *ngTemplateOutlet="
                                                            disabledDateTemplate;
                                                            context: {
                                                                $implicit: date,
                                                            }
                                                        "
                                                    ></ng-container>
                                                </span>
                                            </ng-container>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>


                    </div>
                    <div class="ui-monthpicker" *ngIf="view === 'month'">
                        <a
                            *ngFor="let m of monthPickerValues; let i = index"
                            (click)="onMonthSelect($event, i)"
                            (keydown)="onMonthCellKeydown($event, i)"
                            class="ui-monthpicker-month"
                            [ngClass]="{
                                'ui-state-active': isMonthSelected(i),
                                'ui-state-disabled': !isSelectable(
                                    1,
                                    i,
                                    this.currentYear,
                                    false
                                ),
                            }"
                        >
                            {{ m }}
                        </a>
                    </div>
                </ng-container>
                <div
                    class="ui-timepicker ui-widget-header ui-corner-all"
                    *ngIf="showTime || timeOnly"
                >
                    <div class="ui-hour-picker">
                        <a
                            tabindex="0"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="incrementHour($event)"
                            (mousedown)="
                                onTimePickerElementMouseDown($event, 0, 1)
                            "
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (mouseout)="onTimePickerElementMouseOut($event)"
                        >
                            <span class="pi pi-chevron-up"></span>
                        </a>
                        <span
                            [ngStyle]="{
                                display: currentHour < 10 ? 'inline' : 'none',
                            }"
                            >0</span
                        ><span>{{ currentHour }}</span>
                        <a
                            tabindex="0"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="decrementHour($event)"
                            (mousedown)="
                                onTimePickerElementMouseDown($event, 0, -1)
                            "
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (mouseout)="onTimePickerElementMouseOut($event)"
                        >
                            <span class="pi pi-chevron-down"></span>
                        </a>
                    </div>
                    <div class="ui-separator">
                        <a>
                            <span class="pi pi-chevron-up"></span>
                        </a>
                        <span>{{ timeSeparator }}</span>
                        <a>
                            <span class="pi pi-chevron-down"></span>
                        </a>
                    </div>
                    <div class="ui-minute-picker">
                        <a
                            tabindex="0"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="incrementMinute($event)"
                            (mousedown)="
                                onTimePickerElementMouseDown($event, 1, 1)
                            "
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (mouseout)="onTimePickerElementMouseOut($event)"
                        >
                            <span class="pi pi-chevron-up"></span>
                        </a>
                        <span
                            [ngStyle]="{
                                display: currentMinute < 10 ? 'inline' : 'none',
                            }"
                            >0</span
                        ><span>{{ currentMinute }}</span>
                        <a
                            tabindex="0"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="decrementMinute($event)"
                            (mousedown)="
                                onTimePickerElementMouseDown($event, 1, -1)
                            "
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (mouseout)="onTimePickerElementMouseOut($event)"
                        >
                            <span class="pi pi-chevron-down"></span>
                        </a>
                    </div>
                    <div class="ui-separator" *ngIf="showSeconds">
                        <a>
                            <span class="pi pi-chevron-up"></span>
                        </a>
                        <span>{{ timeSeparator }}</span>
                        <a>
                            <span class="pi pi-chevron-down"></span>
                        </a>
                    </div>
                    <div class="ui-second-picker" *ngIf="showSeconds">
                        <a
                            tabindex="0"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="incrementSecond($event)"
                            (mousedown)="
                                onTimePickerElementMouseDown($event, 2, 1)
                            "
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (mouseout)="onTimePickerElementMouseOut($event)"
                        >
                            <span class="pi pi-chevron-up"></span>
                        </a>
                        <span
                            [ngStyle]="{
                                display: currentSecond < 10 ? 'inline' : 'none',
                            }"
                            >0</span
                        ><span>{{ currentSecond }}</span>
                        <a
                            tabindex="0"
                            (keydown)="onContainerButtonKeydown($event)"
                            (keydown.enter)="decrementSecond($event)"
                            (mousedown)="
                                onTimePickerElementMouseDown($event, 2, -1)
                            "
                            (mouseup)="onTimePickerElementMouseUp($event)"
                            (mouseout)="onTimePickerElementMouseOut($event)"
                        >
                            <span class="pi pi-chevron-down"></span>
                        </a>
                    </div>
                    <div class="ui-ampm-picker" *ngIf="hourFormat == '12'">
                        <a
                            tabindex="0"
                            (keydown)="onContainerButtonKeydown($event)"
                            (click)="toggleAMPM($event)"
                            (keydown.enter)="toggleAMPM($event)"
                        >
                            <span class="pi pi-chevron-up"></span>
                        </a>
                        <span>{{ pm ? 'PM' : 'AM' }}</span>
                        <a
                            tabindex="0"
                            (keydown)="onContainerButtonKeydown($event)"
                            (click)="toggleAMPM($event)"
                            (keydown.enter)="toggleAMPM($event)"
                        >
                            <span class="pi pi-chevron-down"></span>
                        </a>
                    </div>
                </div>
                <div
                    class="ui-datepicker-buttonbar ui-widget-header"
                    *ngIf="showButtonBar" style="gap: 5px"
                >
                    <button
                        type="button"
                        tabindex="0" style="width: 50%"
                        [icon]="'pi pi-sun'"
                        [label]="timeOnly ? _locale.now : _locale.today"
                        (keydown)="onContainerButtonKeydown($event)"
                        (click)="onTodayButtonClick($event)"
                        pButton
                        [ngClass]="[todayButtonStyleClass]"
                    ></button>
                    <button
                        type="button"
                        tabindex="0" style="width: 50%"
                        [outlined]="true"
                        [icon]="'pi pi-trash'"
                        [label]="_locale.clear"
                        (keydown)="onContainerButtonKeydown($event)"
                        (click)="onClearButtonClick($event)"
                        pButton
                        [ngClass]="[clearButtonStyleClass]"
                    ></button>
                </div>
                <ng-content select="p-footer"></ng-content>
            </div>
        </span>
    `,
    animations: [
        trigger('overlayAnimation', [
            state(
                'visible',
                style({
                    transform: 'translateY(0)',
                    opacity: 1,
                })
            ),
            state(
                'visibleTouchUI',
                style({
                    transform: 'translate(-50%,-50%)',
                    opacity: 1,
                })
            ),
            transition('void => visible', [
                style({ transform: 'translateY(5%)', opacity: 0 }),
                animate('{{showTransitionParams}}'),
            ]),
            transition('visible => void', [
                animate(
                    '{{hideTransitionParams}}',
                    style({
                        opacity: 0,
                        transform: 'translateY(5%)',
                    })
                ),
            ]),
            transition('void => visibleTouchUI', [
                style({
                    opacity: 0,
                    transform: 'translate3d(-50%, -40%, 0) scale(0.9)',
                }),
                animate('{{showTransitionParams}}'),
            ]),
            transition('visibleTouchUI => void', [
                animate(
                    '{{hideTransitionParams}}',
                    style({
                        opacity: 0,
                        transform: 'translate3d(-50%, -40%, 0) scale(0.9)',
                    })
                ),
            ]),
        ]),
    ],
    styleUrls: ['./persian-calendar.scss'],
    host: {
        '[class.ui-inputwrapper-filled]': 'filled',
        '[class.ui-inputwrapper-focus]': 'focus',
    },
    providers: [PERSIAN_CALENDAR_VALUE_ACCESSOR],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Default,
    imports: [
        NgClass,
        NgStyle,
        NgIf,
        ButtonDirective,
        NgForOf,
        NgTemplateOutlet,
        InputText,
    ],
})
export class PersianCalendarComponent
    implements OnInit, OnDestroy, ControlValueAccessor, OnChanges
{
    @ViewChild('contentWrapper', { static: false }) set content(
        content: ElementRef
    ) {
        this.contentViewChild = content;

        if (this.contentViewChild) {
            if (this.isMonthNavigate) {
                Promise.resolve(null).then(() => this.updateFocus());
                this.isMonthNavigate = false;
            } else {
                this.initFocusableCell();
            }
        }
    }
    @Input() calendarType: 'jalali' | 'gregorian' = 'jalali';
    get isJ() { return this.calendarType === 'jalali'; }

    @Input() inputCalendar:  'auto' | 'jalali' | 'gregorian' = 'auto';
    @Input() outputCalendar: 'auto' | 'jalali' | 'gregorian' = 'auto';
    @Input() get minDate(): Moment | string {
        return this._minDate;
    }
    private resolveInputCal(): 'jalali' | 'gregorian' {
        // اگر inputCalendar تعیین نشده (auto)، از calendarType UI تبعیت می‌کند
        return (this.inputCalendar === 'auto' ? this.calendarType : this.inputCalendar) as any;
    }

    private resolveOutputCal(): 'jalali' | 'gregorian' {
        // اگر outputCalendar تعیین نشده (auto)، از رزولوشن ورودی تبعیت کند
        if (this.outputCalendar === 'auto') return this.resolveInputCal();
        return this.outputCalendar as any;
    }

    private isInputJ(): boolean  { return this.resolveInputCal()  === 'jalali'; }
    private isOutputJ(): boolean { return this.resolveOutputCal() === 'jalali'; }
   /* set minDate(date: Moment | string) {
        const _inputDate = date.toString().split('/');
        date = moment(date, 'jYYYY/jM/jD');
        this._minDate = date;

        if (
            this.currentMonth != undefined &&
            this.currentMonth != null &&
            this.currentYear
        ) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
*/
    set minDate(date: Moment | string) {
        const fmt = this.isInputJ() ? 'jYYYY/jM/jD' : 'YYYY/M/D';
        this._minDate = moment(date as any, fmt, true);
        if (this.currentMonth != null && this.currentYear != null) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    @Input() get maxDate(): Moment | string {
        return this._maxDate;
    }
/*    private isInputJ(): boolean {
        const cal = this.inputCalendar === 'auto' ? this.calendarType : this.inputCalendar;
        return cal === 'jalali';
    }
    private isOutputJ(): boolean {
        const cal = this.outputCalendar === 'auto' ? this.calendarType : this.outputCalendar;
        return cal === 'jalali';
    }*/

    private getInputDateFormat(): string {
        // اگر فرمت سفارشی دادی، همان را استفاده کن؛ وگرنه پیش‌فرض متناسب با تقویم ورودی
        const f = this.getDateFormat(); // همانی که تا الان داشتی، برای UI
        // برای پارس مدل ورودی بهتر است مستقل باشد:
        return this.isInputJ() ? 'jYYYY/jMM/jDD' : 'YYYY/MM/DD';
    }
    private getOutputDateFormat(): string {
        return this.isOutputJ() ? 'jYYYY/jMM/jDD' : 'YYYY/MM/DD';
    }
   /* set maxDate(date: Moment | string) {
        const _inputDate = date.toString().split('/');
        date = moment(date, 'jYYYY/jM/jD');
        this._maxDate = date;

        if (
            this.currentMonth != undefined &&
            this.currentMonth != null &&
            this.currentYear
        ) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
*/

    set maxDate(date: Moment | string) {
        const fmt = this.isInputJ() ? 'jYYYY/jM/jD' : 'YYYY/M/D';
        this._maxDate = moment(date as any, fmt, true);
        if (this.currentMonth != null && this.currentYear != null) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    @Input() get disabledDates(): Moment[] {
        return this._disabledDates;
    }

    set disabledDates(disabledDates: Moment[]) {
        this._disabledDates = disabledDates;
        if (
            this.currentMonth != undefined &&
            this.currentMonth != null &&
            this.currentYear
        ) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }

    @Input() get disabledDays(): number[] {
        return this._disabledDays;
    }

    set disabledDays(disabledDays: number[]) {
        this._disabledDays = disabledDays;

        if (
            this.currentMonth != undefined &&
            this.currentMonth != null &&
            this.currentYear
        ) {
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }

    @Input() get yearRange(): string {
        return this._yearRange;
    }

    set yearRange(yearRange: string) {
        this._yearRange = yearRange;

        if (yearRange) {
            const years = yearRange.split(':');
            const yearStart = parseInt(years[0]);
            const yearEnd = parseInt(years[1]);

            this.populateYearOptions(yearStart, yearEnd);
        }
    }

    @Input() get showTime(): boolean {
        return this._showTime;
    }

    set showTime(showTime: boolean) {
        this._showTime = showTime;

        if (this.currentHour === undefined) {
            this.initTime(this.value || moment());
        }
        this.updateInputfield();
    }

    get locale() {
        return this._locale;
    }

    @Input()
    set locale(newLocale: LocaleSettings) {
        this._locale = newLocale;

        if (this.view === 'date') {
            this.createWeekDays();
            this.createMonths(this.currentMonth, this.currentYear);
        } else if (this.view === 'month') {
            this.createMonthPickerValues();
        }
    }

    constructor(
        public el: ElementRef,
        public renderer: Renderer2,
        public cd: ChangeDetectorRef,
        private zone: NgZone
    ) {}
    @Input() useSlashFormat: boolean = false;

    @Input() defaultDate: Moment;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() inputStyle: any;

    @Input() inputId: string;

    @Input() name: string;

    @Input() inputStyleClass: string;

    @Input() placeholder: string;

    @Input() ariaLabelledBy: string;

    @Input() disabled: any;

    @Input() dateFormat = 'jYYYY/jMM/jDD';

    @Input() multipleSeparator = ',';

    @Input() rangeSeparator = '-';

    @Input() inline = false;

    @Input() showOtherMonths = true;

    @Input() selectOtherMonths: boolean;

    @Input() showIcon = true;

    @Input() icon = 'pi pi-calendar';

    @Input() appendTo: any;

    @Input() readonlyInput: boolean;

    @Input() shortYearCutoff: any = '+10';

    @Input() monthNavigator = true;

    @Input() yearNavigator = true;

    @Input() hourFormat = '24';

    @Input() timeOnly: boolean;

    @Input() stepHour = 1;

    @Input() stepMinute = 1;

    @Input() stepSecond = 1;

    @Input() showSeconds = false;

    @Input() showMilliSeconds = false;

    @Input() required: boolean;

    @Input() showOnFocus = true;

    @Input() showWeek = false;

    @Input() dataType = 'normaled';

    @Input() selectionMode = 'single';

    @Input() maxDateCount: number;

    @Input() showButtonBar = true;

    @Input() todayButtonStyleClass = 'ui-button-secondary';

    @Input() clearButtonStyleClass = 'ui-button-secondary';

    @Input() autoZIndex = true;

    @Input() baseZIndex = 0;

    @Input() panelStyleClass: string;

    @Input() panelStyle: any;

    @Input() keepInvalid = false;

    @Input() hideOnDateTimeSelect = true;

    @Input() numberOfMonths = 1;

    @Input() view = 'date';

    @Input() touchUI: boolean;

    @Input() timeSeparator = ':';

    @Input() showTransitionOptions = '225ms ease-out';

    @Input() hideTransitionOptions = '195ms ease-in';

    @Output() onFocus: EventEmitter<any> = new EventEmitter();

    @Output() onBlur: EventEmitter<any> = new EventEmitter();

    @Output() onClose: EventEmitter<any> = new EventEmitter();

    @Output() onSelect: EventEmitter<any> = new EventEmitter();

    @Output() onInput: EventEmitter<any> = new EventEmitter();

    @Output() onTodayClick: EventEmitter<any> = new EventEmitter();

    @Output() onClearClick: EventEmitter<any> = new EventEmitter();

    @Output() onMonthChange: EventEmitter<any> = new EventEmitter();

    @Output() onYearChange: EventEmitter<any> = new EventEmitter();

    @Output() onClickOutside: EventEmitter<any> = new EventEmitter();

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    _locale: LocaleSettings = {
        firstDayOfWeek: 6,
        dayNames: [
            'یک‌شنبه',
            'دوشنبه',
            'سه‌شنبه',
            'چهارشنبه',
            'پنج‌شنبه',
            'جمعه',
            'شنبه',
        ],
        dayNamesShort: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
        dayNamesMin: [
            'یک‌شنبه',
            'دوشنبه',
            'سه‌شنبه',
            'چهارشنبه',
            'پنج‌شنبه',
            'جمعه',
            'شنبه',
        ],
        monthNames: [
            'فروردین',
            'اردیبهشت',
            'خرداد',
            'تیر',
            'مرداد',
            'شهریور',
            'مهر',
            'آبان',
            'آذر',
            'دی',
            'بهمن',
            'اسفند',
        ],
        monthNamesShort: [
            'فرو',
            'ارد',
            'خرد',
            'تیر',
            'مرد',
            'شهر',
            'مهر',
            'آبا',
            'آذر',
            'دی',
            'بهم',
            'اسف',
        ],
        today: 'امروز',
        now: 'الان',
        clear: 'پاک کردن',
        dateFormat: 'yy/mm/dd',
    };
    gregorianLocale: LocaleSettings = {
        firstDayOfWeek: 0, // اگر خواستی شنبه باشد، 6 بگذار
        dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        dayNamesShort: ['Su','Mo','Tu','We','Th','Fr','Sa'],
        dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
        monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        monthNamesShort: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        today: 'Today', now: 'Now', clear: 'Clear',
        dateFormat: 'yyyy/mm/dd'
    };

    @Input() tabindex: number;

    @ViewChild('inputfield', { static: false }) inputfieldViewChild: ElementRef;

    contentViewChild: ElementRef;

    value: any;

    dates: any[];

    months: any[];

    monthPickerValues: any[];

    weekDays: string[];

    currentMonth: number;

    currentYear: number;

    currentHour: number;

    currentMinute: number;

    currentSecond: number;

    pm: boolean;

    mask: HTMLDivElement;

    maskClickListener: Function;

    overlay: HTMLDivElement;

    overlayVisible: boolean;

    calendarElement: any;

    timePickerTimer: any;

    documentClickListener: any;

    ticksTo1970: number;

    yearOptions: number[];

    focus: boolean;

    isKeydown: boolean;

    filled: boolean;

    inputFieldValue: string = null;

    _minDate: Moment;

    _maxDate: Moment;

    _showTime: boolean;

    _yearRange: string = '1300:1399';

    preventDocumentListener: boolean;

    dateTemplate: TemplateRef<any>;

    disabledDateTemplate: TemplateRef<any>;

    _disabledDates: Array<Moment>;

    _disabledDays: Array<number>;

    selectElement: any;

    todayElement: any;

    focusElement: any;

    documentResizeListener: any;

    navigationState: any = null;

    isMonthNavigate: boolean;

    getDateFormat() {
        if (this.dateFormat) return this.dateFormat;
        return this.isJ ? 'jYYYY/jMM/jDD' : 'YYYY/MM/DD';
    }

/*    updateModel(value) {
        this.value = value;
        if (this.showTime) {
            const t = this.showSeconds ? 'HHmmss' : 'HHmm';
            this.onModelChange(this.value?.format(t));
        } else if (this.dataType === 'normaled') {
            const fmt = this.isJ ? 'jYYYYjMMjDD' : 'YYYYMMDD';
            this.onModelChange(this.value?.format(fmt));
        } else if (this.dataType === 'date') {
            this.onModelChange(this.value);
        } else if (this.dataType === 'string') {
            this.onModelChange(this.formatDateTime(this.value));
        }
    }*/
    updateModel(value: moment.Moment | moment.Moment[] | null) {
        this.value = value;

        const outDate = (m: moment.Moment) => {
            if (!m) return null;
            return m.clone();
        };

        if (this.showTime) {
            const t = this.showSeconds ? 'HHmmss' : 'HHmm';
            this.onModelChange(this.value ? (this.value as moment.Moment).format(t) : null);
            return;
        }

        if (this.dataType === 'normaled') {
            // ✅ اگر useSlashFormat = true باشد، خروجی با / تولید می‌شود
            const fmtBase = this.isOutputJ() ? 'jYYYY' : 'YYYY';
            const fmt = this.useSlashFormat
                ? `${fmtBase}/MM/DD`.replace(/jYYYY/, 'jYYYY').replace(/MM/, this.isOutputJ() ? 'jMM' : 'MM').replace(/DD/, this.isOutputJ() ? 'jDD' : 'DD')
                : (this.isOutputJ() ? 'jYYYYjMMjDD' : 'YYYYMMDD');

            const out = Array.isArray(this.value)
                ? this.value.map(v => v ? outDate(v).format(fmt) : null)
                : this.value ? outDate(this.value as moment.Moment).format(fmt) : null;

            this.onModelChange(out);
        }
        else if (this.dataType === 'date') {
            const toJsDate = (m: moment.Moment) => m ? m.clone().toDate() : null;
            const out = Array.isArray(this.value)
                ? this.value.map(v => v ? toJsDate(v) : null)
                : this.value ? toJsDate(this.value as moment.Moment) : null;
            this.onModelChange(out);
        }
        else if (this.dataType === 'moment') {
            const out = Array.isArray(this.value)
                ? this.value.map(v => v ? v.clone() : null)
                : this.value ? (this.value as moment.Moment).clone() : null;
            this.onModelChange(out);
        }
        else if (this.dataType === 'string') {
            const fmt = this.getOutputDateFormat();
            const toStr = (m: moment.Moment) => {
                if (!m) return '';
                let s = outDate(m).format(fmt);
                if (this.showTime) s += ' ' + this.formatTime(m);
                return s;
            };
            const out = Array.isArray(this.value)
                ? this.value.map(v => toStr(v))
                : this.value ? toStr(this.value as moment.Moment) : '';
            this.onModelChange(out);
        }
        else {
            this.onModelChange(this.value);
        }
    }

    private normOut(d: moment.Moment) {
        if (!d) return d;
        if (this.showTime) {
            const t = this.showSeconds ? 'HHmmss' : 'HHmm';
            return d.format(t);
        }
        if (this.dataType === 'normaled') {
            const fmt = this.isJ ? 'jYYYYjMMjDD' : 'YYYYMMDD';
            return d.format(fmt);
        }
        if (this.dataType === 'string') {
            return this.formatDateTime(d);
        }
        // data
        return d;
    }

   /* writeValue(v: any): void {
        if (v && this.showTime) {
            this.value = moment(v, 'HHmm');
        } else if (v && this.dataType === 'normaled') {
            const fmt = this.isJ ? 'jYYYYjMMjDD' : 'YYYYMMDD';
            this.value = moment(v, fmt);
        } else if (typeof v === 'string') {
            this.value = this.parseValueFromString(v);
        } else {
            this.value = v;
        }
        this.updateInputfield();
        this.updateUI();
    }*/
    writeValue(v: any): void {
        if (v == null) {
            this.value = v;
        } else if (this.showTime) {
            // اگر فقط زمان می‌فرستی همان رو نگه‌دار
            this.value = moment(v, this.showSeconds ? 'HHmmss' : 'HHmm', true);
        } else if (this.dataType === 'normaled') {
            // مدل ورودی نرمالایز (YYYYMMDD یا jYYYYjMMjDD)
            const fmt = this.isInputJ() ? 'jYYYYjMMjDD' : 'YYYYMMDD';
            this.value = moment(v, fmt, true);
        } else if (typeof v === 'string') {
            // رشته‌ای: با فرمت ورودی پارس کن
            const fmtIn = this.getInputDateFormat();
            this.value = moment(v, fmtIn, true);
        } else {
            // فرض بر این‌که moment است یا تاریخ معتبر
            this.value = moment.isMoment(v) ? v : moment(v);
        }

        if (!this.value || !this.value.isValid()) {
            this.value = null; // ورودی نامعتبر
        }

        this.updateInputfield();
        this.updateUI();
    }
    getFirstDayOfMonthIndex(month: number, year: number) {
        const d = this.makeMoment(year, month, 1);
        const idx = d.day() + this.getSundayIndex();
        return idx >= 7 ? idx - 7 : idx;
    }

    getDaysCountInMonth(month: number, year: number) {
        const d32 = this.makeMoment(year, month, 32);
        const last = this.isJ ? d32.jDate() : d32.date();
        return 32 - last;
    }

   /* selectDate(meta) {
        let date = this.makeMoment(meta.year, meta.month, meta.day);
        // ادامه‌ی منطق قبلی…
    }*/
    selectDate(meta: {year:number; month:number; day:number}) {
        // ساخت تاریخ بر اساس نوع تقویم فعلی
        let date = this.makeMoment(meta.year, meta.month, meta.day);

        // ست‌کردن زمان در صورت نیاز
        if (this.showTime) {
            if (this.hourFormat === '12') {
                if (this.currentHour === 12) {
                    date.hour(this.pm ? 12 : 0);
                } else {
                    date.hour(this.pm ? this.currentHour + 12 : this.currentHour);
                }
            } else {
                date.hour(this.currentHour);
            }
            date.minute(this.currentMinute || 0);
            date.second(this.currentSecond || 0);
        }

        // کلَمپ به min/max
        if (this._minDate && date.isBefore(this._minDate)) {
            date = moment(this._minDate);
            this.setCurrentHourPM(date.hour());
            this.currentMinute = date.minute();
            this.currentSecond = date.second();
        }
        if (this._maxDate && date.isAfter(this._maxDate)) {
            date = moment(this._maxDate);
            this.setCurrentHourPM(date.hour());
            this.currentMinute = date.minute();
            this.currentSecond = date.second();
        }

        // اعمال در حالت‌های مختلف انتخاب
        if (this.isSingleSelection()) {
            this.updateModel(date);
        } else if (this.isMultipleSelection()) {
            this.updateModel(this.value ? [...this.value, date] : [date]);
        } else if (this.isRangeSelection()) {
            if (this.value && this.value.length) {
                let startDate = this.value[0];
                let endDate   = this.value[1];
                if (!endDate && date.valueOf() >= startDate.valueOf()) {
                    endDate = date;
                } else {
                    startDate = date;
                    endDate = null;
                }
                this.updateModel([startDate, endDate]);
            } else {
                this.updateModel([date, null]);
            }
        }

        this.onSelect.emit(date);
    }
    getYear(m: moment.Moment)  { return this.isJ ? m.jYear()  : m.year(); }
    getMonth(m: moment.Moment) { return this.isJ ? m.jMonth() : m.month(); } // 0-based
    getDate(m: moment.Moment)  { return this.isJ ? m.jDate()  : m.date(); }

    setYMD(m: moment.Moment, y: number, mon: number, d: number) {
        return this.isJ ? m.jYear(y).jMonth(mon).jDate(d) : m.year(y).month(mon).date(d);
    }

    makeMoment(y: number, mon: number, d: number) {
        const m = moment();
        return this.setYMD(m, y, mon, d);
    }
    onModelChange: Function = () => {};

    onModelTouched: Function = () => {};

    ngOnInit() {
        const date = this.defaultDate || moment();
        this.currentMonth = this.isJ ? date.jMonth() : date.month();
        this.currentYear  = this.isJ ? date.jYear()  : date.year();
        if (!this.isJ) this._locale = this.gregorianLocale;
        if (this.view === 'date') {
            this.createWeekDays();
            this.initTime(date);
            this.createMonths(this.currentMonth, this.currentYear);
            this.ticksTo1970 =
                ((1970 - 1) * 365 +
                    Math.floor(1970 / 4) -
                    Math.floor(1970 / 100) +
                    Math.floor(1970 / 400)) *
                24 *
                60 *
                60 *
                10000000;
        } else if (this.view === 'month') {
            this.createMonthPickerValues();
        }
        // بعد از تعیین currentMonth و currentYear
        if (!this.isJ) this._locale = this.gregorianLocale;

// رنج پیش‌فرض سال براساس نوع تقویم
        if (!this._yearRange || this._yearRange.trim() === '') {
            this._yearRange = this.isJ ? '1300:1499' : '1900:2100';
        }
        const [ys, ye] = this._yearRange.split(':').map(n => +n);
        this.populateYearOptions(ys, ye);

    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['calendarType']) {
            // locale و فرمت را ست کن
            this._locale = this.isJ ? this._locale : this.gregorianLocale;
            if (!this.dateFormat) {
                this.dateFormat = this.isJ ? 'jYYYY/jMM/jDD' : 'YYYY/MM/DD';
            }
            // سال‌ها را دوباره بساز
            const fallback = this.isJ ? '1300:1499' : '1900:2100';
            const range = (this._yearRange && this._yearRange.includes(':')) ? this._yearRange : fallback;
            const [ys, ye] = range.split(':').map(n => +n);
            this.populateYearOptions(ys, ye);

            // هم‌ترازکردن ماه/سال جاری با نوع تقویم
            const now = moment();
            this.currentMonth = this.isJ ? now.jMonth() : now.month();
            this.currentYear  = this.isJ ? now.jYear()  : now.year();
            this.createWeekDays();
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'date':
                    this.dateTemplate = item.template;
                    break;

                case 'disabledDate':
                    this.disabledDateTemplate = item.template;
                    break;

                default:
                    this.dateTemplate = item.template;
                    break;
            }
        });
    }

    populateYearOptions(start, end) {
        this.yearOptions = [];

        for (let i = start; i <= end; i++) {
            this.yearOptions.push(i);
        }
    }

    createWeekDays() {
        this.weekDays = [];
        let dayIndex = this.locale.firstDayOfWeek;
        for (let i = 0; i < 7; i++) {
            this.weekDays.push(this.locale.dayNamesMin[dayIndex]);
            dayIndex = dayIndex == 6 ? 0 : ++dayIndex;
        }
    }

    createMonthPickerValues() {
        this.monthPickerValues = [];
        for (let i = 0; i <= 11; i++) {
            this.monthPickerValues.push(this.locale.monthNamesShort[i]);
        }
    }

    createMonths(month: number, year: number) {
        this.months = this.months = [];
        for (let i = 0; i < this.numberOfMonths; i++) {
            let m = month + i;
            let y = year;
            if (m > 11) {
                m = (m % 11) - 1;
                y = year + 1;
            }

            this.months.push(this.createMonth(m, y));
        }
    }

  /*  getWeekNumber(date: Moment) {
        const checkDate = moment(date.valueOf());
        checkDate.date(checkDate.date() + 4 - (checkDate.day() || 7));
        const time = checkDate.valueOf();
        checkDate.jMonth(0);
        checkDate.jDate(1);
        return (
            Math.floor(
                Math.round((time - checkDate.valueOf()) / 86400000) / 7
            ) + 1
        );
    }*/
    getWeekNumber(date: moment.Moment) {
        return moment(date).isoWeek(); // ساده و بی‌دردسر
    }
    createMonth(month: number, year: number) {
        const dates = [];
        const firstDay = this.getFirstDayOfMonthIndex(month, year);
        const daysLength = this.getDaysCountInMonth(month, year);
        const prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
        let dayNo = 1;
        const today = moment();
        const weekNumbers = [];
        const monthRows = Math.ceil((daysLength + firstDay) / 7);
        for (let i = 0; i < monthRows; i++) {
            const week = [];

            if (i == 0) {
                for (
                    let j = prevMonthDaysLength - firstDay + 1;
                    j <= prevMonthDaysLength;
                    j++
                ) {
                    const prev = this.getPreviousMonthAndYear(month, year);
                    week.push({
                        day: j,
                        month: prev.month,
                        year: prev.year,
                        otherMonth: true,
                        today: this.isToday(today, j, prev.month, prev.year),
                        selectable: this.isSelectable(
                            j,
                            prev.month,
                            prev.year,
                            true
                        ),
                    });
                }

                const remainingDaysLength = 7 - week.length;
                for (let j = 0; j < remainingDaysLength; j++) {
                    week.push({
                        day: dayNo,
                        month,
                        year,
                        today: this.isToday(today, dayNo, month, year),
                        selectable: this.isSelectable(
                            dayNo,
                            month,
                            year,
                            false
                        ),
                    });
                    dayNo++;
                }
            } else {
                for (let j = 0; j < 7; j++) {
                    if (dayNo > daysLength) {
                        const next = this.getNextMonthAndYear(month, year);
                        week.push({
                            day: dayNo - daysLength,
                            month: next.month,
                            year: next.year,
                            otherMonth: true,
                            today: this.isToday(
                                today,
                                dayNo - daysLength,
                                next.month,
                                next.year
                            ),
                            selectable: this.isSelectable(
                                dayNo - daysLength,
                                next.month,
                                next.year,
                                true
                            ),
                        });
                    } else {
                        week.push({
                            day: dayNo,
                            month,
                            year,
                            today: this.isToday(today, dayNo, month, year),
                            selectable: this.isSelectable(
                                dayNo,
                                month,
                                year,
                                false
                            ),
                        });
                    }

                    dayNo++;
                }
            }

            if (this.showWeek) {
                weekNumbers.push(
                    this.getWeekNumber(
                        moment()
                            .jYear(week[0].year)
                            .jMonth(week[0].month)
                            .jDate(week[0].day)
                    )
                );
            }

            dates.push(week);
        }

        return {
            month,
            year,
            dates,
            weekNumbers,
        };
    }

    initTime(date: Moment) {
        this.pm = date.hour() > 11;

        if (this.showTime) {
            this.currentMinute = date.minute();
            this.currentSecond = date.second();
            this.setCurrentHourPM(date.hour());
        } else if (this.timeOnly) {
            this.currentMinute = 0;
            this.currentHour = 0;
            this.currentSecond = 0;
        }
    }

    navBackward(event) {
        event.stopPropagation();

        if (this.disabled) {
            event.preventDefault();
            return;
        }

        this.isMonthNavigate = true;

        if (this.view === 'month') {
            this.decrementYear();
            setTimeout(() => {
                this.updateFocus();
            }, 1);
        } else {
            if (this.currentMonth === 0) {
                this.currentMonth = 11;
                this.decrementYear();
            } else {
                this.currentMonth--;
            }

            this.onMonthChange.emit({
                month: this.currentMonth + 1,
                year: this.currentYear,
            });
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }

    navForward(event) {
        event.stopPropagation();

        if (this.disabled) {
            event.preventDefault();
            return;
        }

        this.isMonthNavigate = true;

        if (this.view === 'month') {
            this.incrementYear();
            setTimeout(() => {
                this.updateFocus();
            }, 1);
        } else {
            if (this.currentMonth === 11) {
                this.currentMonth = 0;
                this.incrementYear();
            } else {
                this.currentMonth++;
            }

            this.onMonthChange.emit({
                month: this.currentMonth + 1,
                year: this.currentYear,
            });
            this.createMonths(this.currentMonth, this.currentYear);
        }
    }

    decrementYear() {
        this.currentYear--;

        if (this.yearNavigator && this.currentYear < this.yearOptions[0]) {
            const difference =
                this.yearOptions[this.yearOptions.length - 1] -
                this.yearOptions[0];
            this.populateYearOptions(
                this.yearOptions[0] - difference,
                this.yearOptions[this.yearOptions.length - 1] - difference
            );
        }
    }

    incrementYear() {
        this.currentYear++;

        if (
            this.yearNavigator &&
            this.currentYear > this.yearOptions[this.yearOptions.length - 1]
        ) {
            const difference =
                this.yearOptions[this.yearOptions.length - 1] -
                this.yearOptions[0];
            this.populateYearOptions(
                this.yearOptions[0] + difference,
                this.yearOptions[this.yearOptions.length - 1] + difference
            );
        }
    }

    onDateSelect(event, dateMeta) {
        if (this.disabled || !dateMeta.selectable) {
            event.preventDefault();
            return;
        }

        if (this.isMultipleSelection() && this.isSelected(dateMeta)) {
            this.value = this.value.filter((date, i) => {
                return !this.isDateEquals(date, dateMeta);
            });
            if (this.value.length === 0) {
                this.value = null;
            }
            this.updateModel(this.value);
        } else {
            if (this.shouldSelectDate(dateMeta)) {
                this.selectDate(dateMeta);
            }
        }

        if (this.isSingleSelection() && this.hideOnDateTimeSelect) {
            setTimeout(() => {
                event.preventDefault();
                this.hideOverlay();

                if (this.mask) {
                    this.disableModality();
                }

                this.cd.markForCheck();
            }, 150);
        }

        this.updateInputfield();
        event.preventDefault();
    }

    shouldSelectDate(dateMeta) {
        if (this.isMultipleSelection()) {
            return this.maxDateCount != null
                ? this.maxDateCount > (this.value ? this.value.length : 0)
                : true;
        } else {
            return true;
        }
    }

    onMonthSelect(event, index) {
        if (!DomHandler.hasClass(event.target, 'ui-state-disabled')) {
            this.onDateSelect(event, {
                year: this.currentYear,
                month: index,
                day: 1,
                selectable: true,
            });
        }
    }

    updateInputfield() {
        let formattedValue = '';

        if (this.value) {
            if (this.isSingleSelection()) {
                formattedValue = this.formatDateTime(this.value);
            } else if (this.isMultipleSelection()) {
                for (let i = 0; i < this.value.length; i++) {
                    const dateAsString = this.formatDateTime(this.value[i]);
                    formattedValue += dateAsString;
                    if (i !== this.value.length - 1) {
                        formattedValue += this.multipleSeparator + ' ';
                    }
                }
            } else if (this.isRangeSelection()) {
                if (this.value && this.value.length) {
                    const startDate = this.value[0];
                    const endDate = this.value[1];

                    formattedValue = this.formatDateTime(startDate);
                    if (endDate) {
                        formattedValue +=
                            ' ' +
                            this.rangeSeparator +
                            ' ' +
                            this.formatDateTime(endDate);
                    }
                }
            }
        }

        this.inputFieldValue = formattedValue;
        this.updateFilledState();
        if (
            this.inputfieldViewChild &&
            this.inputfieldViewChild.nativeElement
        ) {
            this.inputfieldViewChild.nativeElement.value = this.inputFieldValue;
        }
    }

    formatDateTime(date) {
        let formattedValue = null;
        if (date) {
            if (this.timeOnly) {
                formattedValue = this.formatTime(date);
            } else {
                formattedValue = this.formatDate(date, this.getDateFormat());
                if (this.showTime) {
                    formattedValue += ' ' + this.formatTime(date);
                }
            }
        }

        return formattedValue;
    }

    setCurrentHourPM(hours: number) {
        if (this.hourFormat == '12') {
            this.pm = hours > 11;
            if (hours >= 12) {
                this.currentHour = hours == 12 ? 12 : hours - 12;
            } else {
                this.currentHour = hours == 0 ? 12 : hours;
            }
        } else {
            this.currentHour = hours;
        }
    }

 /*   selectDate(dateMeta) {
        let date = moment()
            .jYear(dateMeta.year)
            .jMonth(dateMeta.month)
            .jDate(dateMeta.day);

        if (this.showTime) {
            if (this.hourFormat == '12') {
                if (this.currentHour === 12) {
                    date.hour(this.pm ? 12 : 0);
                } else {
                    date.hour(
                        this.pm ? this.currentHour + 12 : this.currentHour
                    );
                }
            } else {
                date.hour(this.currentHour);
            }

            date.minute(this.currentMinute);
            date.second(this.currentSecond);
        }

        if (this.minDate && this.minDate > date) {
            date = this.minDate;
            this.setCurrentHourPM(date.hour());
            this.currentMinute = date.minute();
            this.currentSecond = date.second();
        }

        if (this.maxDate && this.maxDate < date) {
            date = this.maxDate;
            this.setCurrentHourPM(date.hour());
            this.currentMinute = date.minute();
            this.currentSecond = date.second();
        }

        if (this.isSingleSelection()) {
            this.updateModel(date);
        } else if (this.isMultipleSelection()) {
            this.updateModel(this.value ? [...this.value, date] : [date]);
        } else if (this.isRangeSelection()) {
            if (this.value && this.value.length) {
                let startDate = this.value[0];
                let endDate = this.value[1];

                if (!endDate && date.valueOf() >= startDate.valueOf()) {
                    endDate = date;
                } else {
                    startDate = date;
                    endDate = null;
                }

                this.updateModel([startDate, endDate]);
            } else {
                this.updateModel([date, null]);
            }
        }

        this.onSelect.emit(date);
    }*/

   /* updateModel(value) {
        this.value = value;
        if (this.showTime) {
            let outputTimeFormat = 'HHmm';
            if (this.showSeconds) {
                outputTimeFormat = outputTimeFormat + 'ss';
            }
            if (this.showMilliSeconds) {
                outputTimeFormat = outputTimeFormat + 'SSS';
            }

            this.onModelChange(this.value?.format(outputTimeFormat));
        } else if (this.dataType == 'normaled') {
            this.onModelChange(this.value?.format('jYYYYjMMjDD'));
        } else if (this.dataType == 'date') {
            this.onModelChange(this.value);
        } else if (this.dataType == 'string') {
            if (this.isSingleSelection()) {
                this.onModelChange(this.formatDateTime(this.value));
            } else {
                let stringArrValue = null;
                if (this.value) {
                    stringArrValue = this.value.map((date) =>
                        this.formatDateTime(date)
                    );
                }
                this.onModelChange(stringArrValue);
            }
        }
    }
*/
  /*  getFirstDayOfMonthIndex(month: number, year: number) {
        const day = moment();
        day.jDate(1);
        day.jMonth(month);
        day.jYear(year);
        const dayIndex = day.day() + this.getSundayIndex();
        return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
    }

    getDaysCountInMonth(month: number, year: number) {
        return (
            32 -
            this.daylightSavingAdjust(
                moment().jYear(year).jMonth(month).jDate(32)
            ).jDate()
        );
    }*/

    getDaysCountInPrevMonth(month: number, year: number) {
        const prev = this.getPreviousMonthAndYear(month, year);
        return this.getDaysCountInMonth(prev.month, prev.year);
    }

    getPreviousMonthAndYear(month: number, year: number) {
        let m, y;

        if (month === 0) {
            m = 11;
            y = year - 1;
        } else {
            m = month - 1;
            y = year;
        }

        return { month: m, year: y };
    }

    getNextMonthAndYear(month: number, year: number) {
        let m, y;

        if (month === 11) {
            m = 0;
            y = year + 1;
        } else {
            m = month + 1;
            y = year;
        }

        return { month: m, year: y };
    }

    getSundayIndex() {
        return this.locale.firstDayOfWeek > 0
            ? 7 - this.locale.firstDayOfWeek
            : 0;
    }

    isSelected(dateMeta): boolean {
        if (this.value) {
            if (this.isSingleSelection()) {
                return this.isDateEquals(this.value, dateMeta);
            } else if (this.isMultipleSelection()) {
                let selected = false;
                for (const date of this.value) {
                    selected = this.isDateEquals(date, dateMeta);
                    if (selected) {
                        break;
                    }
                }

                return selected;
            } else if (this.isRangeSelection()) {
                if (this.value[1]) {
                    return (
                        this.isDateEquals(this.value[0], dateMeta) ||
                        this.isDateEquals(this.value[1], dateMeta) ||
                        this.isDateBetween(
                            this.value[0],
                            this.value[1],
                            dateMeta
                        )
                    );
                } else {
                    return this.isDateEquals(this.value[0], dateMeta);
                }
            }
        } else {
            return false;
        }
    }

/*    isMonthSelected(month: number): boolean {
        const day = this.value
            ? Array.isArray(this.value)
                ? this.value[0].getDate()
                : this.value.getDate()
            : 1;
        return this.isSelected({
            year: this.currentYear,
            month,
            day,
            selectable: true,
        });
    }*/
    isMonthSelected(month: number): boolean {
        const day = this.value
            ? (Array.isArray(this.value) ? this.getDate(this.value[0]) : this.getDate(this.value))
            : 1;

        return this.isSelected({ year: this.currentYear, month, day, selectable: true });
    }

  /*  isDateEquals(value, dateMeta) {
        if (value) {
            return (
                value.jDate() === dateMeta.day &&
                value.jMonth() === dateMeta.month &&
                value.jYear() === dateMeta.year
            );
        } else {
            return false;
        }
    }*/
    isDateEquals(value: moment.Moment, dateMeta: any) {
        return !!value &&
            this.getDate(value)  === dateMeta.day &&
            this.getMonth(value) === dateMeta.month &&
            this.getYear(value)  === dateMeta.year;
    }
   /* isDateBetween(start, end, dateMeta) {
        const between = false;
        if (start && end) {
            const date: Moment = moment()
                .jYear(dateMeta.year)
                .jMonth(dateMeta.month)
                .jDate(dateMeta.day);
            return (
                start.valueOf() <= date.valueOf() &&
                end.valueOf() >= date.valueOf()
            );
        }

        return between;
    }*/
    isDateBetween(start: moment.Moment, end: moment.Moment, dateMeta: any) {
        if (!(start && end)) return false;
        const date = this.makeMoment(dateMeta.year, dateMeta.month, dateMeta.day);
        return start.valueOf() <= date.valueOf() && end.valueOf() >= date.valueOf();
    }
    isSingleSelection(): boolean {
        return this.selectionMode === 'single';
    }

    isRangeSelection(): boolean {
        return this.selectionMode === 'range';
    }

    isMultipleSelection(): boolean {
        return this.selectionMode === 'multiple';
    }

/*
    isToday(today, day, month, year): boolean {
        return (
            today.jDate() === day &&
            today.jMonth() === month &&
            today.jYear() === year
        );
    }
*/
    isToday(today: moment.Moment, day: number, month: number, year: number): boolean {
        return (
            this.getDate(today)  === day   &&
            this.getMonth(today) === month &&
            this.getYear(today)  === year
        );
    }
   /* isSelectable(day, month, year, otherMonth): boolean {
        let validMin = true;
        let validMax = true;
        let validDate = true;
        let validDay = true;

        if (otherMonth && !this.selectOtherMonths) {
            return false;
        }

        if (this.minDate) {
            if (this.minDate.jYear() > year) {
                validMin = false;
            } else if (this.minDate.jYear() === year) {
                if (this.minDate.jMonth() > month) {
                    validMin = false;
                } else if (this.minDate.jMonth() === month) {
                    if (this.minDate.jDate() > day) {
                        validMin = false;
                    }
                }
            }
        }

        if (this.maxDate) {
            if (this.maxDate.jYear() < year) {
                validMax = false;
            } else if (this.maxDate.jYear() === year) {
                if (this.maxDate.jMonth() < month) {
                    validMax = false;
                } else if (this.maxDate.jMonth() === month) {
                    if (this.maxDate.jDate() < day) {
                        validMax = false;
                    }
                }
            }
        }

        if (this.disabledDates) {
            validDate = !this.isDateDisabled(day, month, year);
        }

        if (this.disabledDays) {
            validDay = !this.isDayDisabled(day, month, year);
        }

        return validMin && validMax && validDate && validDay;
    }
*/
    isSelectable(day: number, month: number, year: number, otherMonth: boolean): boolean {
        if (otherMonth && !this.selectOtherMonths) return false;

        const m = this.makeMoment(year, month, day);

        // min/max
        if (this._minDate && m.isBefore(this._minDate, 'day')) return false;
        if (this._maxDate && m.isAfter(this._maxDate, 'day')) return false;

        // disabled dates
        if (this._disabledDates && this._disabledDates.length) {
            const hit = this._disabledDates.some(dd =>
                dd && dd.isSame(m, 'day')
            );
            if (hit) return false;
        }

        // disabled days (weekday)
        if (this._disabledDays && this._disabledDays.length) {
            const weekday = m.day(); // 0..6
            if (this._disabledDays.includes(weekday)) return false;
        }

        return true;
    }
   /* isDateDisabled(day: number, month: number, year: number): boolean {
        if (this.disabledDates && Array.isArray(this.disabledDates)) {
            for (const disabledDate of this.disabledDates) {
                if (
                    disabledDate.getFullYear() === year &&
                    disabledDate.getMonth() === month &&
                    disabledDate.getDate() === day
                ) {
                    return true;
                }
            }
        }

        return false;
    }*/
    isDateDisabled(day: number, month: number, year: number): boolean {
        if (!(this._disabledDates && this._disabledDates.length)) return false;
        const m = this.makeMoment(year, month, day);
        return this._disabledDates.some(dd => dd && dd.isSame(m, 'day'));
    }
    isDayDisabled(day: number, month: number, year: number): boolean {
        if (this.disabledDays) {
            const weekday = moment().jYear(year).jMonth(month).jDate(day);
            const weekdayNumber = weekday.day();
            return this.disabledDays.indexOf(weekdayNumber) !== -1;
        }
        return false;
    }

    onInputFocus(event: Event) {
        this.focus = true;
        if (this.showOnFocus) {
            this.showOverlay();
        }
        this.onFocus.emit(event);
    }

    onInputClick() {
        if (this.overlay && this.autoZIndex) {
            this.overlay.style.zIndex = String(
                this.baseZIndex + ++DomHandler.zindex
            );
        }

        if (this.showOnFocus && !this.overlayVisible) {
            this.showOverlay();
        }
    }

    onInputBlur(event: Event) {
        this.focus = false;
        this.onBlur.emit(event);
        if (!this.keepInvalid) {
            this.updateInputfield();
        }
        this.onModelTouched();
    }

    onButtonClick(event, inputfield) {
        if (!this.overlayVisible) {
            inputfield.focus();
            this.showOverlay();
        } else {
            this.hideOverlay();
        }
    }

    onPrevButtonClick(event) {
        this.navigationState = { backward: true, button: true };
        this.navBackward(event);
    }

    onNextButtonClick(event) {
        this.navigationState = { backward: false, button: true };
        this.navForward(event);
    }

    onContainerButtonKeydown(event) {
        switch (event.which) {
            // tab
            case 9:
                if (!this.inline) {
                    this.trapFocus(event);
                }
                break;

            // escape
            case 27:
                this.overlayVisible = false;
                event.preventDefault();
                break;

            default:
                // Noop
                break;
        }
    }

    onInputKeydown(event) {
        this.isKeydown = true;
        if (event.keyCode === 9 && this.contentViewChild) {
            this.trapFocus(event);
        } else if (event.keyCode === 27) {
            if (this.overlayVisible) {
                this.overlayVisible = false;
                event.preventDefault();
            }
        }
    }

    onDateCellKeydown(event, date, groupIndex) {
        const cellContent = event.currentTarget;
        const cell = cellContent.parentElement;

        switch (event.which) {
            // down arrow
            case 40: {
                cellContent.tabIndex = '-1';
                const cellIndex = DomHandler.index(cell);
                const nextRow = cell.parentElement.nextElementSibling;
                if (nextRow) {
                    const focusCell = nextRow.children[cellIndex].children[0];
                    if (DomHandler.hasClass(focusCell, 'ui-state-disabled')) {
                        this.navigationState = { backward: false };
                        this.navForward(event);
                    } else {
                        nextRow.children[cellIndex].children[0].tabIndex = '0';
                        nextRow.children[cellIndex].children[0].focus();
                    }
                } else {
                    this.navigationState = { backward: false };
                    this.navForward(event);
                }
                event.preventDefault();
                break;
            }

            // up arrow
            case 38: {
                cellContent.tabIndex = '-1';
                const cellIndex = DomHandler.index(cell);
                const prevRow = cell.parentElement.previousElementSibling;
                if (prevRow) {
                    const focusCell = prevRow.children[cellIndex].children[0];
                    if (DomHandler.hasClass(focusCell, 'ui-state-disabled')) {
                        this.navigationState = { backward: true };
                        this.navBackward(event);
                    } else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                } else {
                    this.navigationState = { backward: true };
                    this.navBackward(event);
                }
                event.preventDefault();
                break;
            }

            // left arrow
            case 37: {
                cellContent.tabIndex = '-1';
                const prevCell = cell.previousElementSibling;
                if (prevCell) {
                    const focusCell = prevCell.children[0];
                    if (
                        DomHandler.hasClass(focusCell, 'ui-state-disabled') ||
                        DomHandler.hasClass(
                            focusCell.parentElement,
                            'ui-datepicker-weeknumber'
                        )
                    ) {
                        this.navigateToMonth(true, groupIndex);
                    } else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                } else {
                    this.navigateToMonth(true, groupIndex);
                }
                event.preventDefault();
                break;
            }

            // right arrow
            case 39: {
                cellContent.tabIndex = '-1';
                const nextCell = cell.nextElementSibling;
                if (nextCell) {
                    const focusCell = nextCell.children[0];
                    if (DomHandler.hasClass(focusCell, 'ui-state-disabled')) {
                        this.navigateToMonth(false, groupIndex);
                    } else {
                        focusCell.tabIndex = '0';
                        focusCell.focus();
                    }
                } else {
                    this.navigateToMonth(false, groupIndex);
                }
                event.preventDefault();
                break;
            }

            // enter
            case 13: {
                this.onDateSelect(event, date);
                event.preventDefault();
                break;
            }

            // escape
            case 27: {
                this.overlayVisible = false;
                event.preventDefault();
                break;
            }

            // tab
            case 9: {
                if (!this.inline) {
                    this.trapFocus(event);
                }
                break;
            }

            default:
                // no op
                break;
        }
    }

    onMonthCellKeydown(event, index) {
        const cell = event.currentTarget;
        switch (event.which) {
            // arrows
            case 38:
            case 40: {
                cell.tabIndex = '-1';
                const cells = cell.parentElement.children;
                const cellIndex = DomHandler.index(cell);
                const nextCell =
                    cells[event.which === 40 ? cellIndex + 3 : cellIndex - 3];
                if (nextCell) {
                    nextCell.tabIndex = '0';
                    nextCell.focus();
                }
                event.preventDefault();
                break;
            }

            // left arrow
            case 37: {
                cell.tabIndex = '-1';
                const prevCell = cell.previousElementSibling;
                if (prevCell) {
                    prevCell.tabIndex = '0';
                    prevCell.focus();
                }
                event.preventDefault();
                break;
            }

            // right arrow
            case 39: {
                cell.tabIndex = '-1';
                const nextCell = cell.nextElementSibling;
                if (nextCell) {
                    nextCell.tabIndex = '0';
                    nextCell.focus();
                }
                event.preventDefault();
                break;
            }

            // enter
            case 13: {
                this.onMonthSelect(event, index);
                event.preventDefault();
                break;
            }

            // escape
            case 27: {
                this.overlayVisible = false;
                event.preventDefault();
                break;
            }

            // tab
            case 9: {
                if (!this.inline) {
                    this.trapFocus(event);
                }
                break;
            }

            default:
                // no op
                break;
        }
    }

    navigateToMonth(prev, groupIndex) {
        if (prev) {
            if (this.numberOfMonths === 1 || groupIndex === 0) {
                this.navigationState = { backward: true };
                this.navBackward(event);
            } else {
                const prevMonthContainer =
                    this.contentViewChild.nativeElement.children[
                        groupIndex - 1
                    ];
                const cells = DomHandler.find(
                    prevMonthContainer,
                    '.ui-datepicker-calendar td a'
                );
                const focusCell = cells[cells.length - 1];
                focusCell.tabIndex = '0';
                focusCell.focus();
            }
        } else {
            if (
                this.numberOfMonths === 1 ||
                groupIndex === this.numberOfMonths - 1
            ) {
                this.navigationState = { backward: false };
                this.navForward(event);
            } else {
                const nextMonthContainer =
                    this.contentViewChild.nativeElement.children[
                        groupIndex + 1
                    ];
                const focusCell = DomHandler.findSingle(
                    nextMonthContainer,
                    '.ui-datepicker-calendar td a'
                );
                focusCell.tabIndex = '0';
                focusCell.focus();
            }
        }
    }

    updateFocus() {
        let cell;
        if (this.navigationState) {
            if (this.navigationState.button) {
                this.initFocusableCell();

                if (this.navigationState.backward) {
                    DomHandler.findSingle(
                        this.contentViewChild.nativeElement,
                        '.ui-datepicker-prev'
                    ).focus();
                } else {
                    DomHandler.findSingle(
                        this.contentViewChild.nativeElement,
                        '.ui-datepicker-next'
                    ).focus();
                }
            } else {
                if (this.navigationState.backward) {
                    const cells = DomHandler.find(
                        this.contentViewChild.nativeElement,
                        '.ui-datepicker-calendar td a'
                    );
                    cell = cells[cells.length - 1];
                } else {
                    cell = DomHandler.findSingle(
                        this.contentViewChild.nativeElement,
                        '.ui-datepicker-calendar td a'
                    );
                }

                if (cell) {
                    cell.tabIndex = '0';
                    cell.focus();
                }
            }

            this.navigationState = null;
        } else {
            this.initFocusableCell();
        }
    }

    initFocusableCell() {
        let cell;
        if (this.view === 'month') {
            const cells = DomHandler.find(
                this.contentViewChild.nativeElement,
                '.ui-monthpicker .ui-monthpicker-month:not(.ui-state-disabled)'
            );
            const selectedCell = DomHandler.findSingle(
                this.contentViewChild.nativeElement,
                '.ui-monthpicker .ui-monthpicker-month.ui-state-highlight'
            );
            cells.forEach((cell) => (cell.tabIndex = -1));
            cell = selectedCell || cells[0];

            if (cells.length === 0) {
                const disabledCells = DomHandler.find(
                    this.contentViewChild.nativeElement,
                    '.ui-monthpicker .ui-monthpicker-month.ui-state-disabled[tabindex = "0"]'
                );
                disabledCells.forEach((cell) => (cell.tabIndex = -1));
            }
        } else {
            cell = DomHandler.findSingle(
                this.contentViewChild.nativeElement,
                'a.ui-state-active'
            );
            if (!cell) {
                const todayCell = DomHandler.findSingle(
                    this.contentViewChild.nativeElement,
                    'td.ui-datepicker-today a:not(.ui-state-disabled)'
                );
                if (todayCell) {
                    cell = todayCell;
                } else {
                    cell = DomHandler.findSingle(
                        this.contentViewChild.nativeElement,
                        '.ui-datepicker-calendar td a'
                    );
                }
            }
        }

        if (cell) {
            cell.tabIndex = '0';
        }
    }

    trapFocus(event) {
        event.preventDefault();
        const focusableElements = DomHandler.getFocusableElements(
            this.contentViewChild.nativeElement
        );

        if (focusableElements && focusableElements.length > 0) {
            if (!document.activeElement) {
                focusableElements[0].focus();
            } else {
                const focusedIndex = focusableElements.indexOf(
                    document.activeElement
                );

                if (event.shiftKey) {
                    if (focusedIndex == -1 || focusedIndex === 0) {
                        focusableElements[focusableElements.length - 1].focus();
                    } else {
                        focusableElements[focusedIndex - 1].focus();
                    }
                } else {
                    if (
                        focusedIndex == -1 ||
                        focusedIndex === focusableElements.length - 1
                    ) {
                        focusableElements[0].focus();
                    } else {
                        focusableElements[focusedIndex + 1].focus();
                    }
                }
            }
        }
    }

    onMonthDropdownChange(m: string) {
        this.currentMonth = parseInt(m);
        this.onMonthChange.emit({
            month: this.currentMonth + 1,
            year: this.currentYear,
        });
        this.createMonths(this.currentMonth, this.currentYear);
    }

    onYearDropdownChange(y: string) {
        this.currentYear = parseInt(y);
        this.onYearChange.emit({
            month: this.currentMonth + 1,
            year: this.currentYear,
        });
        this.createMonths(this.currentMonth, this.currentYear);
    }
    private normalizeDigits(s: string): string {
        if (!s) return s;
        const fa = '۰۱۲۳۴۵۶۷۸۹';
        const ar = '٠١٢٣٤٥٦٧٨٩';
        return s.replace(/[۰-۹]/g, d => String(fa.indexOf(d)))
            .replace(/[٠-٩]/g, d => String(ar.indexOf(d)));
    }
    private normalizeInput(s: string): string {
        if (!s) return s;
        s = this.normalizeDigits(s);
        // جداکننده‌های رایج را به / یکدست کن
        s = s.replace(/[.\-]/g, '/');
        // فاصله‌های اضافه
        return s.trim().replace(/\s+/g, ' ');
    }
    private normalizeAmPm(ap?: string|null): 'AM'|'PM'|null {
        if (!ap) return null;
        const t = ap.toLowerCase();
        if (t === 'am' || t === 'a') return 'AM';
        if (t === 'pm' || t === 'p') return 'PM';
        // نگاشت‌های فارسی رایج
        if (t.includes('ق')) return 'AM'; // ق.ظ
        if (t.includes('ب')) return 'PM'; // ب.ظ
        return null;
    }
    /*convertTo24Hour = function (hours: number, pm: boolean) {
        if (this.hourFormat == '12') {
            if (hours === 12) {
                return pm ? 12 : 0;
            } else {
                return pm ? hours + 12 : hours;
            }
        }
        return hours;
    };*/
    convertTo24Hour = (hours: number, pm: boolean) => {
        if (this.hourFormat === '12') return hours === 12 ? (pm ? 12 : 0) : (pm ? hours + 12 : hours);
        return hours;
    };

   /* validateTime(hour: number, minute: number, second: number, pm: boolean) {
        let value = this.value;
        const convertedHour = this.convertTo24Hour(hour, pm);
        if (this.isRangeSelection()) {
            value = this.value[1] || this.value[0];
        }
        if (this.isMultipleSelection()) {
            value = this.value[this.value.length - 1];
        }
        const valueDateString = value ? value.format('ll') : null;
        if (
            this.minDate &&
            valueDateString &&
            this.minDate.toDateString() === valueDateString
        ) {
            if (this.minDate.hour() > convertedHour) {
                return false;
            }
            if (this.minDate.hour() === convertedHour) {
                if (this.minDate.minute() > minute) {
                    return false;
                }
                if (this.minDate.minute() === minute) {
                    if (this.minDate.second() > second) {
                        return false;
                    }
                }
            }
        }

        if (
            this.maxDate &&
            valueDateString &&
            this.maxDate.toDateString() === valueDateString
        ) {
            if (this.maxDate.getHours() < convertedHour) {
                return false;
            }
            if (this.maxDate.getHours() === convertedHour) {
                if (this.maxDate.getMinutes() < minute) {
                    return false;
                }
                if (this.maxDate.getMinutes() === minute) {
                    if (this.maxDate.getSeconds() < second) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
*/
    validateTime(hour: number, minute: number, second: number, pm: boolean) {
        // آخرین تاریخ انتخابی (سینگل/رنج/مالتی)
        let ref = this.value;
        if (this.isRangeSelection()) ref = this.value?.[1] || this.value?.[0];
        if (this.isMultipleSelection()) ref = this.value?.[this.value.length - 1];

        const base = ref ? moment(ref.valueOf()) : moment();
        // به 24ساعته تبدیل
        const h24 = this.convertTo24Hour(hour, pm);
        const candidate = base.clone().hour(h24).minute(minute).second(second || 0);

        if (this._minDate && candidate.isBefore(this._minDate)) return false;
        if (this._maxDate && candidate.isAfter(this._maxDate)) return false;
        return true;
    }

    incrementHour(event) {
        const prevHour = this.currentHour;
        let newHour = this.currentHour + this.stepHour;
        let newPM = this.pm;

        if (this.hourFormat == '24') {
            newHour = newHour >= 24 ? newHour - 24 : newHour;
        } else if (this.hourFormat == '12') {
            // Before the AM/PM break, now after
            if (prevHour < 12 && newHour > 11) {
                newPM = !this.pm;
            }
            newHour = newHour >= 13 ? newHour - 12 : newHour;
        }

        if (
            this.validateTime(
                newHour,
                this.currentMinute,
                this.currentSecond,
                newPM
            )
        ) {
            this.currentHour = newHour;
            this.pm = newPM;
        }
        event.preventDefault();
    }

    onTimePickerElementMouseDown(
        event: Event,
        type: number,
        direction: number
    ) {
        if (!this.disabled) {
            this.repeat(event, null, type, direction);
            event.preventDefault();
        }
    }

    onTimePickerElementMouseUp(event: Event) {
        if (!this.disabled) {
            this.clearTimePickerTimer();
            this.updateTime();
        }
    }

    onTimePickerElementMouseOut(event: Event) {
        if (!this.disabled && this.timePickerTimer) {
            this.clearTimePickerTimer();
            this.updateTime();
        }
    }

    repeat(event: Event, interval: number, type: number, direction: number) {
        const i = interval || 500;

        this.clearTimePickerTimer();
        this.timePickerTimer = setTimeout(() => {
            this.repeat(event, 100, type, direction);
        }, i);

        switch (type) {
            case 0:
                if (direction === 1) {
                    this.incrementHour(event);
                } else {
                    this.decrementHour(event);
                }
                break;

            case 1:
                if (direction === 1) {
                    this.incrementMinute(event);
                } else {
                    this.decrementMinute(event);
                }
                break;

            case 2:
                if (direction === 1) {
                    this.incrementSecond(event);
                } else {
                    this.decrementSecond(event);
                }
                break;
        }

        this.updateInputfield();
    }

    clearTimePickerTimer() {
        if (this.timePickerTimer) {
            clearTimeout(this.timePickerTimer);
        }
    }

    decrementHour(event) {
        let newHour = this.currentHour - this.stepHour;
        let newPM = this.pm;

        if (this.hourFormat == '24') {
            newHour = newHour < 0 ? 24 + newHour : newHour;
        } else if (this.hourFormat == '12') {
            // If we were at noon/midnight, then switch
            if (this.currentHour === 12) {
                newPM = !this.pm;
            }
            newHour = newHour <= 0 ? 12 + newHour : newHour;
        }

        if (
            this.validateTime(
                newHour,
                this.currentMinute,
                this.currentSecond,
                newPM
            )
        ) {
            this.currentHour = newHour;
            this.pm = newPM;
        }

        event.preventDefault();
    }

    incrementMinute(event) {
        let newMinute = this.currentMinute + this.stepMinute;
        newMinute = newMinute > 59 ? newMinute - 60 : newMinute;
        if (
            this.validateTime(
                this.currentHour,
                newMinute,
                this.currentSecond,
                this.pm
            )
        ) {
            this.currentMinute = newMinute;
        }

        event.preventDefault();
    }

    decrementMinute(event) {
        let newMinute = this.currentMinute - this.stepMinute;
        newMinute = newMinute < 0 ? 60 + newMinute : newMinute;
        if (
            this.validateTime(
                this.currentHour,
                newMinute,
                this.currentSecond,
                this.pm
            )
        ) {
            this.currentMinute = newMinute;
        }

        event.preventDefault();
    }

    incrementSecond(event) {
        let newSecond = this.currentSecond + this.stepSecond;
        newSecond = newSecond > 59 ? newSecond - 60 : newSecond;
        if (
            this.validateTime(
                this.currentHour,
                this.currentMinute,
                newSecond,
                this.pm
            )
        ) {
            this.currentSecond = newSecond;
        }

        event.preventDefault();
    }

    decrementSecond(event) {
        let newSecond = this.currentSecond - this.stepSecond;
        newSecond = newSecond < 0 ? 60 + newSecond : newSecond;
        if (
            this.validateTime(
                this.currentHour,
                this.currentMinute,
                newSecond,
                this.pm
            )
        ) {
            this.currentSecond = newSecond;
        }

        event.preventDefault();
    }

    updateTime() {
        let value = this.value;
        if (this.isRangeSelection()) {
            value = this.value[1] || this.value[0];
        }
        if (this.isMultipleSelection()) {
            value = this.value[this.value.length - 1];
        }
        value = value ? moment(value.valueOf()) : moment();

        if (this.hourFormat == '12') {
            if (this.currentHour === 12) {
                value.hour(this.pm ? 12 : 0);
            } else {
                value.hour(this.pm ? this.currentHour + 12 : this.currentHour);
            }
        } else {
            value.hour(this.currentHour);
        }

        value.minute(this.currentMinute);
        value.second(this.currentSecond);

        if (this.isRangeSelection()) {
            if (this.value[1]) {
                value = [this.value[0], value];
            } else {
                value = [value, null];
            }
        }

        if (this.isMultipleSelection()) {
            value = [...this.value.slice(0, -1), value];
        }

        this.updateModel(value);
        this.onSelect.emit(value);
        this.updateInputfield();
    }

    toggleAMPM(event) {
        const newPM = !this.pm;
        if (
            this.validateTime(
                this.currentHour,
                this.currentMinute,
                this.currentSecond,
                newPM
            )
        ) {
            this.pm = newPM;
            this.updateTime();
        }
        event.preventDefault();
    }

    onUserInput(event) {
        // IE 11 Workaround for input placeholder : https://github.com/primefaces/primeng/issues/2026
        if (!this.isKeydown) {
            return;
        }
        this.isKeydown = false;

        const val = event.target.value;
        try {
            const value = this.parseValueFromString(val);
            if (this.isValidSelection(value)) {
                this.updateModel(value);
                this.updateUI();
            }
        } catch (err) {
            // invalid date
            this.updateModel(null);
        }

        this.filled = val != null && val.length;
        this.onInput.emit(event);
    }

   /* isValidSelection(value): boolean {
        let isValid = true;
        if (this.isSingleSelection()) {
            if (
                !this.isSelectable(
                    value.jDate(),
                    value.jMonths(),
                    value.jYear(),
                    false
                )
            ) {
                isValid = false;
            }
        } else if (
            value.every((v) =>
                this.isSelectable(v.jDate(), v.jMonths(), v.jYear(), false)
            )
        ) {
            if (this.isRangeSelection()) {
                isValid =
                    value.length > 1 && value[1] > value[0] ? true : false;
            }
        }
        return isValid;
    }*/
    isValidSelection(value: any): boolean {
        if (!value) return false;

        const ok = (m: moment.Moment) =>
            this.isSelectable(this.getDate(m), this.getMonth(m), this.getYear(m), false);

        if (this.isSingleSelection()) {
            return ok(value);
        }

        if (this.isMultipleSelection()) {
            return Array.isArray(value) && value.every(v => ok(v));
        }

        // range
        if (Array.isArray(value) && value.length) {
            const allOk = value.every(v => v ? ok(v) : true);
            if (!allOk) return false;
            return value.length > 1 && value[1] && value[1].valueOf() > value[0].valueOf();
        }

        return false;
    }
    parseValueFromString(text: string): Date | Date[] {
        if (!text || text.trim().length === 0) {
            return null;
        }

        let value: any;

        if (this.isSingleSelection()) {
            value = this.parseDateTime(text);
        } else if (this.isMultipleSelection()) {
            const tokens = text.split(this.multipleSeparator);
            value = [];
            for (const token of tokens) {
                value.push(this.parseDateTime(token.trim()));
            }
        } else if (this.isRangeSelection()) {
            const tokens = text.split(' ' + this.rangeSeparator + ' ');
            value = [];
            for (let i = 0; i < tokens.length; i++) {
                value[i] = this.parseDateTime(tokens[i].trim());
            }
        }

        return value;
    }

/*    parseDateTime(text): Date {
        let date: Date;
        const parts: string[] = text.split(' ');

        if (this.timeOnly) {
            date = new Date();
            this.populateTime(date, parts[0], parts[1]);
        } else {
            const dateFormat = this.getDateFormat();
            if (this.showTime) {
                const ampm = this.hourFormat == '12' ? parts.pop() : null;
                const timeString = parts.pop();

                date = this.parseDate(parts.join(' '), dateFormat);
                this.populateTime(date, timeString, ampm);
            } else {
                date = this.parseDate(text, dateFormat);
            }
        }

        return date;
    }*/
    private populateTimeMoment(value: moment.Moment, timeString: string, ampm: string | null) {
        if (this.hourFormat === '12' && !ampm) {
            throw new Error('Invalid Time');
        }
        this.pm = ampm === 'PM' || ampm === 'pm';

        const {hour, minute, second} = this.parseTime(timeString);
        // اگر 12ساعته است، به 24 تبدیل کن
        let h = hour;
        if (this.hourFormat === '12') {
            if (h !== 12 && this.pm) h += 12;
            else if (!this.pm && h === 12) h = 0;
        }
        value.hour(h).minute(minute).second(second || 0);
    }
    parseDateTime(text: string): moment.Moment {
        if (!text || !text.trim()) return null;

        const parts = text.split(' ');
        const fmtIn = this.getInputDateFormat(); // ← این

        if (this.timeOnly) {
            const m = moment();
            this.populateTimeMoment(m, parts[0], parts[1] || null);
            return m;
        }

        if (this.showTime) {
            const ampm = this.hourFormat === '12' ? parts.pop() : null;
            const timeString = parts.pop();
            let m = this.parseDate(parts.join(' '), fmtIn); // ← این
            this.populateTimeMoment(m, timeString, ampm);
            return m;
        }

        return this.parseDate(text, fmtIn); // ← این
    }
    /*  populateTime(value, timeString, ampm) {
          if (this.hourFormat == '12' && !ampm) {
              throw new Error('Invalid Time');
          }

          this.pm = ampm === 'PM' || ampm === 'pm';
          const time = this.parseTime(timeString);
          value.setHours(time.hour);
          value.setMinutes(time.minute);
          value.setSeconds(time.second);
      }*/

    /*updateUI() {
        let val = this.value || this.defaultDate || moment();
        if (Array.isArray(val)) {
            val = val[0];
        }

        this.currentMonth = val.jMonth();
        this.currentYear = val.jYear();
        this.createMonths(this.currentMonth, this.currentYear);

        if (this.showTime || this.timeOnly) {
            this.setCurrentHourPM(val.hour());
            this.currentMinute = val.minute();
            this.currentSecond = val.second();
        }
    }*/
    updateUI() {
        let val = this.value || this.defaultDate || moment();
        if (Array.isArray(val)) val = val[0];

        this.currentMonth = this.getMonth(val);
        this.currentYear  = this.getYear(val);
        this.createMonths(this.currentMonth, this.currentYear);

        if (this.showTime || this.timeOnly) {
            this.setCurrentHourPM(val.hour());
            this.currentMinute = val.minute();
            this.currentSecond = val.second();
        }
    }

    showOverlay() {
        if (!this.overlayVisible) {
            this.updateUI();
            this.overlayVisible = true;
        }
    }

    hideOverlay() {
        this.overlayVisible = false;
        this.clearTimePickerTimer();

        if (this.touchUI) {
            this.disableModality();
        }
    }

    toggle() {
        if (!this.inline) {
            if (!this.overlayVisible) {
                this.showOverlay();
                this.inputfieldViewChild.nativeElement.focus();
            } else {
                this.hideOverlay();
            }
        }
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
            case 'visibleTouchUI':
                if (!this.inline) {
                    this.overlay = event.element;
                    this.appendOverlay();
                    if (this.autoZIndex) {
                        this.overlay.style.zIndex = String(
                            this.baseZIndex + ++DomHandler.zindex
                        );
                    }
                    this.alignOverlay();
                    this.onShow.emit(event);
                }
                break;

            case 'void':
                this.onOverlayHide();
                this.onClose.emit(event);
                break;
        }
    }

    onOverlayAnimationDone(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
            case 'visibleTouchUI':
                if (!this.inline) {
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                }
                break;
        }
    }

    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body') {
                document.body.appendChild(this.overlay);
            } else {
                DomHandler.appendChild(this.overlay, this.appendTo);
            }
        }
    }

    restoreOverlayAppend() {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    }

    alignOverlay() {
        if (this.touchUI) {
            this.enableModality(this.overlay);
        } else {
            if (this.appendTo) {
                DomHandler.absolutePosition(
                    this.overlay,
                    this.inputfieldViewChild.nativeElement
                );
            } else {
                DomHandler.relativePosition(
                    this.overlay,
                    this.inputfieldViewChild.nativeElement
                );
            }
        }
    }

    enableModality(element) {
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(element.style.zIndex) - 1);
            const maskStyleClass =
                'ui-widget-overlay ui-datepicker-mask ui-datepicker-mask-scrollblocker';
            DomHandler.addMultipleClasses(this.mask, maskStyleClass);

            this.maskClickListener = this.renderer.listen(
                this.mask,
                'click',
                (event: any) => {
                    this.disableModality();
                }
            );
            document.body.appendChild(this.mask);
            DomHandler.addClass(document.body, 'ui-overflow-hidden');
        }
    }

    disableModality() {
        if (this.mask) {
            document.body.removeChild(this.mask);
            const bodyChildren = document.body.children;
            let hasBlockerMasks: boolean;
            for (let i = 0; i < bodyChildren.length; i++) {
                const bodyChild = bodyChildren[i];
                if (
                    DomHandler.hasClass(
                        bodyChild,
                        'ui-datepicker-mask-scrollblocker'
                    )
                ) {
                    hasBlockerMasks = true;
                    break;
                }
            }

            if (!hasBlockerMasks) {
                DomHandler.removeClass(document.body, 'ui-overflow-hidden');
            }

            this.unbindMaskClickListener();

            this.mask = null;
        }
    }

    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }

   /* writeValue(value: any): void {
        this.value = value;
        if (value && this.showTime) {
            this.value = moment(value, 'HHmm');
        } else if (value && this.dataType == 'normaled') {
            this.value = moment(value, 'jYYYYjMMjDD');
        } else if (this.value && typeof this.value === 'string') {
            this.value = this.parseValueFromString(this.value);
        }

        this.updateInputfield();
        this.updateUI();
    }
*/
    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled = val;
    }

 /*   getDateFormat() {
        return this.dateFormat || this.locale.dateFormat;
    }*/

    formatDate(date, format) {
        if (!date) {
            return '';
        }

        return date.format(format);
    }

    formatTime(date) {
        if (!date) {
            return '';
        }

        let output = '';
        let hours = date.hour();
        const minutes = date.minute();
        const seconds = date.second();
        const milliSeconds = date.millisecond();

        if (this.hourFormat == '12' && hours > 11 && hours != 12) {
            hours -= 12;
        }

        if (this.hourFormat == '12') {
            output += hours === 0 ? 12 : hours < 10 ? '0' + hours : hours;
        } else {
            output += hours < 10 ? '0' + hours : hours;
        }
        output += ':';
        output += minutes < 10 ? '0' + minutes : minutes;

        if (this.showSeconds) {
            output += ':';
            output += seconds < 10 ? '0' + seconds : seconds;
        }

        if (this.showMilliSeconds) {
            output += ':';
            output += milliSeconds < 10 ? '0' + milliSeconds : milliSeconds;
        }

        if (this.hourFormat == '12') {
            output += date.hour() > 11 ? ' PM' : ' AM';
        }

        return output;
    }

    parseTime(value) {
        const tokens: string[] = value.split(':');
        const validTokenLength = this.showSeconds ? 3 : 2;

        if (tokens.length !== validTokenLength) {
            throw new Error('Invalid time');
        }

        let h = parseInt(tokens[0]);
        const m = parseInt(tokens[1]);
        const s = this.showSeconds ? parseInt(tokens[2]) : null;

        if (
            isNaN(h) ||
            isNaN(m) ||
            h > 23 ||
            m > 59 ||
            (this.hourFormat == '12' && h > 12) ||
            (this.showSeconds && (isNaN(s) || s > 59))
        ) {
            throw new Error('Invalid time');
        } else {
            if (this.hourFormat == '12') {
                if (h !== 12 && this.pm) {
                    h += 12;
                } else if (!this.pm && h === 12) {
                    h -= 12;
                }
            }

            return { hour: h, minute: m, second: s };
        }
    }

    // Ported from jquery-ui datepicker parseDate
   /* parseDate(value, format) {
        if (format == null || value == null) {
            throw new Error('Invalid arguments');
        }

        value = typeof value === 'object' ? value.toString() : value + '';
        if (value === '') {
            return null;
        }

        let iFormat,
            dim,
            extra,
            iValue = 0,
            shortYearCutoff =
                typeof this.shortYearCutoff !== 'string'
                    ? this.shortYearCutoff
                    : (new Date().getFullYear() % 100) +
                      parseInt(this.shortYearCutoff, 10),
            year = -1,
            month = -1,
            day = -1,
            doy = -1,
            literal = false,
            date,
            lookAhead = (match) => {
                const matches =
                    iFormat + 1 < format.length &&
                    format.charAt(iFormat + 1) === match;
                if (matches) {
                    iFormat++;
                }
                return matches;
            },
            getNumber = (match) => {
                const isDoubled = lookAhead(match),
                    size =
                        match === '@'
                            ? 14
                            : match === '!'
                              ? 20
                              : match.toLowerCase() === 'y' && isDoubled
                                ? 4
                                : match === 'o'
                                  ? 3
                                  : 2,
                    minSize = match.toLowerCase() === 'y' ? size : 1,
                    digits = new RegExp('^\\d{' + minSize + ',' + size + '}'),
                    num = value
                        .replaceAll('/', '')
                        .substring(iValue)
                        .match(digits);
                if (!num) {
                    throw new Error('Missing number at position ' + iValue);
                }
                iValue += num[0].length;
                return parseInt(num[0], 10);
            },
            getName = (match, shortNames, longNames) => {
                let index = -1;
                const arr = lookAhead(match) ? longNames : shortNames;
                const names = [];

                for (let i = 0; i < arr.length; i++) {
                    names.push([i, arr[i]]);
                }
                names.sort((a, b) => {
                    return -(a[1].length - b[1].length);
                });

                for (let i = 0; i < names.length; i++) {
                    const name = names[i][1];
                    if (
                        value.substr(iValue, name.length).toLowerCase() ===
                        name.toLowerCase()
                    ) {
                        index = names[i][0];
                        iValue += name.length;
                        break;
                    }
                }

                if (index !== -1) {
                    return index + 1;
                } else {
                    throw new Error('Unknown name at position ' + iValue);
                }
            },
            checkLiteral = () => {
                if (value.charAt(iValue) !== format.charAt(iFormat)) {
                    throw new Error('Unexpected literal at position ' + iValue);
                }
                iValue++;
            };

        if (this.view === 'month') {
            day = 1;
        }

/!*
        format = 'yyyy/mm/dd'; //format.toString().replaceAll('j', '');
*!/
        format = (this.getDateFormat() || 'yyyy/mm/dd').toString();

        for (iFormat = 0; iFormat < format.length; iFormat++) {
            if (literal) {
                if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                    literal = false;
                } else {
                    checkLiteral();
                }
            } else {
                switch (format.charAt(iFormat)) {
                    case 'd':
                        day = getNumber('d');
                        iFormat += 2;
                        break;
                    case 'D':
                        getName(
                            'D',
                            this.locale.dayNamesShort,
                            this.locale.dayNames
                        );
                        iFormat += 2;
                        break;
                    case 'o':
                        doy = getNumber('o');
                        break;
                    case 'm':
                        month = getNumber('m');
                        iFormat += 2;
                        break;
                    case 'M':
                        month = getName(
                            'M',
                            this.locale.monthNamesShort,
                            this.locale.monthNames
                        );
                        iFormat += 2;
                        break;
                    case 'y':
                        year = getNumber('y');
                        iFormat += 3;
                        break;
                    case 'Y':
                        year = getNumber('Y');
                        iFormat += 3;
                        break;
                    case '@':
                        date = new Date(getNumber('@'));
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case '!':
                        date = new Date(
                            (getNumber('!') - this.ticksTo1970) / 10000
                        );
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "'":
                        if (lookAhead("'")) {
                            checkLiteral();
                        } else {
                            literal = true;
                        }
                        break;
                    default:
                        checkLiteral();
                }
            }
        }

        /!*     if (iValue < value.length) {
                 extra = value.substr(iValue);
                 if (!/^\s+/.test(extra)) {
                     throw new Error('Extra/unparsed characters found in date: ' + extra);
                 }
             }*!/

        if (year === -1) {
            year = new Date().getFullYear();
        } else if (year < 100) {
            year +=
                new Date().getFullYear() -
                (new Date().getFullYear() % 100) +
                (year <= shortYearCutoff ? 0 : -100);
        }

        if (doy > -1) {
            month = 1;
            day = doy;
            do {
                dim = this.getDaysCountInMonth(year, month - 1);
                if (day <= dim) {
                    break;
                }
                month++;
                day -= dim;
            } while (true);
        }

        // ساخت تاریخ بر اساس نوع تقویم فعلی (month ورودی 1-based است)
        let built = this.makeMoment(year, month - 1, day);

// اگر DST یا تنظیم مشابه لازم داری، می‌تونی نگهش داری؛ در غیر اینصورت خط بعدی را حذف کن
        built = this.daylightSavingAdjust(built);

// اعتبارسنجی با هِلپرهای جنریک (برای جلالی یا میلادی)
        if (this.getYear(built) !== year || this.getMonth(built) + 1 !== month || this.getDate(built) !== day) {
            throw new Error('Invalid date'); // مثلا 31/02
        }

        return built;
    }*/
    parseDate(value: string, format: string): moment.Moment {
        if (!value) return null;
        const v = this.normalizeInput(value);
        const fmt = format || this.getDateFormat();

        // سفت
        let m = moment(v, fmt, true);

        // شُل: بدون صفر پیشرو و با جداکننده‌ی یکنواخت‌شده
        if (!m.isValid()) {
            const loose = fmt
                .replace(/YYYY/g, 'YYYY')
                .replace(/MM/g,    'M')
                .replace(/DD/g,    'D')
                .replace(/jMM/g,  'jM')
                .replace(/jDD/g,  'jD');
            m = moment(v, loose, true);
        }

        if (!m.isValid()) throw new Error('Invalid date');
        return m;
    }

  /*  daylightSavingAdjust(date) {
        if (!date) {
            return null;
        }

        date.hour(date.hour() > 12 ? date.hour() + 2 : 0);

        return date;
    }*/
    daylightSavingAdjust(date: moment.Moment) { return date; }
    updateFilledState() {
        this.filled = this.inputFieldValue && this.inputFieldValue != '';
    }

  /*  onTodayButtonClick(event) {
        if (this.showTime && this.value) {
            this.initTime(moment());
        }
        const date: Moment = moment();
        const dateMeta = {
            day: date.jDate(),
            month: date.jMonth(),
            year: date.jYear(),
            otherMonth:
                date.jMonth() !== this.currentMonth ||
                date.jYear() !== this.currentYear,
            today: true,
            selectable: true,
        };

        this.onDateSelect(event, dateMeta);
        this.onTodayClick.emit(event);
    }*/
    onTodayButtonClick(event) {
        if (this.showTime && this.value) this.initTime(moment());

        const now = moment();
        const dateMeta = {
            day:  this.getDate(now),
            month:this.getMonth(now),
            year: this.getYear(now),
            otherMonth: this.getMonth(now) !== this.currentMonth || this.getYear(now) !== this.currentYear,
            today: true,
            selectable: true,
        };

        this.onDateSelect(event, dateMeta);
        this.onTodayClick.emit(event);
    }

    onClearButtonClick(event) {
        this.updateModel(null);
        this.updateInputfield();
        this.hideOverlay();
        this.onClearClick.emit(event);
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.zone.runOutsideAngular(() => {
                this.documentClickListener = this.renderer.listen(
                    'document',
                    'click',
                    (event) => {
                        if (
                            this.isOutsideClicked(event) &&
                            this.overlayVisible
                        ) {
                            this.zone.run(() => {
                                this.hideOverlay();
                                this.onClickOutside.emit(event);

                                this.cd.markForCheck();
                            });
                        }
                    }
                );
            });
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }

    bindDocumentResizeListener() {
        if (!this.documentResizeListener && !this.touchUI) {
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        }
    }

    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }

    isOutsideClicked(event: Event) {
        return !(
            this.el.nativeElement.isSameNode(event.target) ||
            this.isNavIconClicked(event) ||
            this.el.nativeElement.contains(event.target) ||
            (this.overlay && this.overlay.contains(event.target as Node))
        );
    }

    isNavIconClicked(event: Event) {
        return (
            DomHandler.hasClass(event.target, 'ui-datepicker-prev') ||
            DomHandler.hasClass(event.target, 'ui-datepicker-prev-icon') ||
            DomHandler.hasClass(event.target, 'ui-datepicker-next') ||
            DomHandler.hasClass(event.target, 'ui-datepicker-next-icon')
        );
    }

    onWindowResize() {
        if (this.overlayVisible && !DomHandler.isAndroid()) {
            this.hideOverlay();
        }
    }

    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindMaskClickListener();
        this.unbindDocumentResizeListener();
        this.overlay = null;
        this.disableModality();
    }

    ngOnDestroy() {
        this.clearTimePickerTimer();
        this.restoreOverlayAppend();
        this.onOverlayHide();
    }
}


/*مثال استفاده

الف) UI جلالی، خروجی میلادی (YYYYMMDD):

<p-persian-calendar
  [calendarType]="'jalali'"
  [inputCalendar]="'jalali'"
  [outputCalendar]="'gregorian'"
  [dataType]="'normaled'">
</p-persian-calendar>


کاربر همه‌چیز را جلالی می‌بیند/انتخاب می‌کند.

ولی مقدار onModelChange و ngModel برابر تاریخ میلادیِ نرمالایز مثل 20250321 می‌شود.

ب) UI جلالی، خروجی Date (JS Date میلادی):

<p-persian-calendar
  [calendarType]="'jalali'"
  [outputCalendar]="'gregorian'"
  [dataType]="'date'">
</p-persian-calendar>

اگر دولوپر هیچ‌کدام را ندهد → خروجی همان ورودی می‌شود (و ورودی هم از UI (calendarType) می‌آید).

اگر فقط inputCalendar را بدهد → خروجی هم به‌طور پیش‌فرض همان خواهد بود.

اگر دولوپر outputCalendar را صراحتاً ست کند → خروجی طبق همان عمل می‌کند.

*/
