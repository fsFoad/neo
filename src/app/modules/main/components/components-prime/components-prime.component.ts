import { Component } from '@angular/core';
import { TreeNode,MenuItem, MessageService, ConfirmationService, FilterService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// ---------- Form ----------
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CheckboxModule } from 'primeng/checkbox';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DatePickerModule } from 'primeng/datepicker';
import { EditorModule } from 'primeng/editor';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputOtpModule } from 'primeng/inputotp';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { KnobModule } from 'primeng/knob';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { TextareaModule } from 'primeng/textarea';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TreeSelectModule } from 'primeng/treeselect';

// ---------- Button ----------
import { ButtonModule } from 'primeng/button';
import { SpeedDialModule } from 'primeng/speeddial';
import { SplitButtonModule } from 'primeng/splitbutton';

// ---------- Data ----------
import { DataViewModule } from 'primeng/dataview';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { PaginatorModule } from 'primeng/paginator';
import { PickListModule } from 'primeng/picklist';
import { TableModule } from 'primeng/table';
import { TimelineModule } from 'primeng/timeline';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
// ---------- Panel ----------
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SplitterModule } from 'primeng/splitter';
import { StepperModule } from 'primeng/stepper';
import { ToolbarModule } from 'primeng/toolbar';

// ---------- Overlay ----------

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DrawerModule } from 'primeng/drawer';
import { PopoverModule } from 'primeng/popover';
import { TooltipModule } from 'primeng/tooltip';
// ---------- File ----------
import { FileUploadModule } from 'primeng/fileupload';

// ---------- Menu ----------
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DockModule } from 'primeng/dock';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { StepsModule } from 'primeng/steps';
import { TieredMenuModule } from 'primeng/tieredmenu';

// ---------- Chart ----------
import { ChartModule } from 'primeng/chart';

// ---------- Messages ----------
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

// ---------- Media ----------
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { ImageCompareModule } from 'primeng/imagecompare';
import { TabView, TabPanel } from 'primeng/tabview';
// ---------- Misc ----------
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { AutoFocusModule } from 'primeng/autofocus';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { BlockUIModule } from 'primeng/blockui';
import { ChipModule } from 'primeng/chip';
import { FocusTrapModule } from 'primeng/focustrap';
import { FluidModule } from 'primeng/fluid';
import { InplaceModule } from 'primeng/inplace';
import { MeterGroupModule } from 'primeng/metergroup';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { TagModule } from 'primeng/tag';
import { TerminalModule, TerminalService } from 'primeng/terminal';
import { DropdownModule } from 'primeng/dropdown';
import { PersianCalendarComponent } from '../../../shared/components/persian-calendar/persian-calendar.module';
import { TranslocoPipe } from '@ngneat/transloco';
@Component({
    selector: 'app-components-prime',
    imports: [
        Toast,

        AutoCompleteModule,
        CascadeSelectModule,
        CheckboxModule,
        ColorPickerModule,
        DatePickerModule,
        EditorModule,
        FloatLabelModule,
        IconFieldModule,
        InputIconModule,
        IftaLabelModule,
        InputGroupModule,
        InputMaskModule,
        InputNumberModule,
        InputOtpModule,
        InputTextModule,
        KeyFilterModule,
        KnobModule,
        ListboxModule,
        TabPanel,
        MultiSelectModule,
        PasswordModule,
        RadioButtonModule,
        RatingModule,
        SelectModule,
        SelectButtonModule,
        SliderModule,
        TextareaModule,
        ToggleButtonModule,
        ToggleSwitchModule,
        TreeSelectModule,

        // Button
        ButtonModule,
        SpeedDialModule,
        SplitButtonModule,

        // Data
        DataViewModule,
        OrderListModule,
        OrganizationChartModule,
        PaginatorModule,
        PickListModule,
        TableModule,
        TimelineModule,
        TreeModule,
        TreeTableModule,
        InputGroupAddonModule,
        // Panel
        AccordionModule,
        CardModule,
        DividerModule,
        FieldsetModule,
        PanelModule,
        ScrollPanelModule,
        SplitterModule,
        StepperModule,
        ToolbarModule,

        // Overlay
        ConfirmDialogModule,
        ConfirmPopupModule,
        DialogModule,
        DrawerModule,
        PopoverModule,
        TooltipModule,

        // File
        FileUploadModule,

        // Menu
        BreadcrumbModule,
        ContextMenuModule,
        DockModule,
        MenuModule,
        MenubarModule,
        MegaMenuModule,
        PanelMenuModule,
        StepsModule,
        TieredMenuModule,

        // Chart
        ChartModule,

        // Messages
        MessageModule,
        ToastModule,

        // Media
        CarouselModule,
        GalleriaModule,
        ImageModule,
        ImageCompareModule,

        // Misc
        AnimateOnScrollModule,
        AutoFocusModule,
        AvatarModule,
        BadgeModule,
        BlockUIModule,
        ChipModule,
        FocusTrapModule,
        FluidModule,
        InplaceModule,
        MeterGroupModule,
        ScrollTopModule,
        SkeletonModule,
        ProgressBarModule,
        ProgressSpinnerModule,
        RippleModule,
        StyleClassModule,
        TagModule,
        TerminalModule,
        FormsModule,
        TabView,
        DropdownModule,
        ReactiveFormsModule,
        PersianCalendarComponent,
        TranslocoPipe,
    ],
    providers: [MessageService, TerminalService, ConfirmationService],

    templateUrl: './components-prime.component.html',
    styleUrl: './components-prime.component.scss',
})
export class ComponentsPrimeComponent {
    autoCompleteValue: string[] = [];
    autoCompleteSuggestions: string[] = [];

    cascadeOptions: any[] = [];
    selectedCascade: any;

    checkboxValue = true;
    colorValue = '#2196F3';
    dateValue: Date | null = new Date();
    editorValue = '<p>متن تستی PrimeNG</p>';

    floatLabelValue = '';
    iconFieldValue = '';
    iftaLabelValue = '';

    maskValue = '';
    numberValue = 12345;
    otpValue = '';

    inputTextValue = '';
    keyFilterValue = '';
    knobValue = 40;

    listboxOptions = [
        { label: 'گزینه ۱', value: 1 },
        { label: 'گزینه ۲', value: 2 },
        { label: 'گزینه ۳', value: 3 },
    ];
    listboxValue = 1;

    multiSelectOptions = [
        { label: 'تهران', value: 'teh' },
        { label: 'اصفهان', value: 'esf' },
        { label: 'شیراز', value: 'shz' },
        { label: 'تبریز', value: 'tbz' },
    ];
    multiSelectValue: string[] = ['teh'];

    passwordValue = '';
    radioValue = 'A';
    ratingValue = 3;

    selectOptions = [
        { name: 'ایران', code: 'IR' },
        { name: 'آلمان', code: 'DE' },
        { name: 'آمریکا', code: 'US' },
    ];
    selectValue = this.selectOptions[0];

    selectButtonOptions = [
        { label: 'Create', value: 'create' },
        { label: 'Update', value: 'update' },
        { label: 'Delete', value: 'delete' },
    ];
    selectButtonValue = 'create';

    sliderValue = 25;
    textareaValue = 'متن تستی...';
    toggleButtonValue = true;
    toggleSwitchValue = false;

    treeSelectNodes: any[] = [];
    treeSelectValue: any;

    // ---------- Button ----------
    buttonLoading = false;
    speedDialItems: MenuItem[] = [];
    splitButtonItems: MenuItem[] = [];

    // ---------- Data ----------
    dataViewItems: any[] = [];
    orderListItems: string[] = [];
    orgChartValue: any[] = [];
    paginatorFirst = 0;
    paginatorRows = 5;

    pickListSource: any[] = [];
    pickListTarget: any[] = [];

    tableCustomers: any[] = [];
    selectedCustomers: any[] = [];

    timelineEvents: any[] = [];
    treeNodes: any[] = [];
    selectedTreeNode: any;
    treeTableNodes: any[] = [];
    virtualItems: string[] = [];

    // ---------- Panel ----------
    activeAccordionIndex = 0;
    stepperIndex = 0;
    activeTabIndex = 0;

    // ---------- Overlay ----------
    dialogVisible = false;
    drawerVisible = false;

    // ---------- Menu ----------
    breadcrumbItems: MenuItem[] = [];
    breadcrumbHome!: MenuItem;

    menuItems: MenuItem[] = [];
    contextMenuItems: MenuItem[] = [];
    dockItems: MenuItem[] = [];
    panelMenuItems: MenuItem[] = [];
    tieredMenuItems: MenuItem[] = [];
    stepsItems: MenuItem[] = [];

    // ---------- Chart ----------
    chartData: any;
    chartOptions: any;

    // ---------- Messages ----------
    messageValue = 'پیام تکی';
    toastSummary = 'انجام شد';
    toastDetail = 'عملیات نمونه با موفقیت انجام شد.';

    // ---------- Media ----------
    carouselItems: any[] = [];
    galleriaImages: any[] = [];

    // ---------- Misc ----------
    avatarText = 'FS';
    badgeValue = 5;
    blockTarget = false;
    chipValues: string[] = ['Angular', 'PrimeNG', 'RxJS'];
    inplaceActive = false;
    meterGroupValue: any[] = [];
    progressBarValue = 40;
    progressSpinnerValue = 70;

    // ---------- Utilities ----------
    filterServiceResult: boolean | null = null;

    constructor(
        private filterService: FilterService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        this.initFormData();
        this.initData();
        this.initMenus();
        this.initChart();
        this.initMediaAndMisc();
    }

    // ---------- Init helpers ----------
    private initFormData() {
        this.cascadeOptions = [
            {
                name: 'ایران',
                code: 'IR',
                provinces: [
                    {
                        name: 'تهران',
                        cities: [
                            { name: 'تهران', code: 'THR' },
                            { name: 'ری', code: 'REY' },
                        ],
                    },
                    {
                        name: 'اصفهان',
                        cities: [
                            { cname: 'اصفهان', code: 'ESF' },
                            { cname: 'نجف‌آباد', code: 'NAJ' },
                        ],
                    },
                ],
            },
        ];

        this.treeSelectNodes = [
            {
                key: '0',
                label: 'Root',
                children: [
                    { key: '0-0', label: 'Node 1' },
                    { key: '0-1', label: 'Node 2' },
                ],
            },
        ];
    }

    private initData() {
        this.dataViewItems = [
            { name: 'محصول ۱', price: 100 },
            { name: 'محصول ۲', price: 200 },
            { name: 'محصول ۳', price: 300 },
        ];

        this.orderListItems = ['Angular', 'React', 'Vue', 'Svelte'];

        this.orgChartValue = [
            {
                label: 'مدیرعامل',
                type: 'person',
                expanded: true,
                children: [
                    { label: 'فروش', type: 'department' },
                    { label: 'فنی', type: 'department' },
                ],
            },
        ];

        this.pickListSource = [
            { name: 'تهران' },
            { name: 'اصفهان' },
            { name: 'شیراز' },
            { name: 'تبریز' },
        ];
        this.pickListTarget = [];

        this.tableCustomers = [
            { id: 1, name: 'علی', country: 'ایران', status: 'فعال' },
            { id: 2, name: 'سارا', country: 'آلمان', status: 'غیرفعال' },
            { id: 3, name: 'رضا', country: 'آمریکا', status: 'فعال' },
        ];

        this.timelineEvents = [
            { status: 'ثبت سفارش', date: '2025-01-01' },
            { status: 'پردازش سفارش', date: '2025-01-03' },
            { status: 'ارسال شده', date: '2025-01-05' },
        ];

        this.treeNodes = [
            {
                key: '0',
                label: 'Documents',
                children: [
                    { key: '0-0', label: 'Work' },
                    { key: '0-1', label: 'Home' },
                ],
            },
            {
                key: '1',
                label: 'Pictures',
                children: [
                    { key: '1-0', label: 'barca.png' },
                    { key: '1-1', label: 'iran.jpg' },
                ],
            },
        ];

        this.treeTableNodes = [
            {
                key: '0',
                data: { name: 'Folder 1', size: '10kb', type: 'Folder' },
                children: [
                    {
                        key: '0-0',
                        data: { name: 'File 1', size: '4kb', type: 'File' },
                    },
                ],
            },
        ];

        this.virtualItems = Array.from({ length: 500 }).map(
            (_, i) => `آیتم ${i + 1}`
        );
    }

    private initMenus() {
        this.breadcrumbHome = { icon: 'pi pi-home', routerLink: '/' };
        this.breadcrumbItems = [{ label: 'نمونه‌ها' }, { label: 'PrimeNG' }];

        this.menuItems = [
            { label: 'New', icon: 'pi pi-plus' },
            { label: 'Open', icon: 'pi pi-folder-open' },
            { separator: true },
            { label: 'Quit', icon: 'pi pi-times' },
        ];

        this.contextMenuItems = [
            { label: 'Edit', icon: 'pi pi-pencil' },
            { label: 'Delete', icon: 'pi pi-trash' },
        ];

        this.dockItems = [
            { label: 'Home', icon: 'pi pi-home' },
            { label: 'Settings', icon: 'pi pi-cog' },
            { label: 'Messages', icon: 'pi pi-comments' },
        ];

        this.panelMenuItems = [
            {
                label: 'File',
                icon: 'pi pi-file',
                items: [
                    { label: 'New', icon: 'pi pi-plus' },
                    { label: 'Open', icon: 'pi pi-folder-open' },
                ],
            },
            {
                label: 'Edit',
                icon: 'pi pi-pencil',
                items: [
                    { label: 'Cut', icon: 'pi pi-cut' },
                    { label: 'Copy', icon: 'pi pi-copy' },
                    { label: 'Paste', icon: 'pi pi-clipboard' },
                ],
            },
        ];

        this.tieredMenuItems = [
            {
                label: 'User',
                icon: 'pi pi-user',
                items: [
                    { label: 'Profile', icon: 'pi pi-id-card' },
                    { label: 'Logout', icon: 'pi pi-sign-out' },
                ],
            },
        ];

        this.stepsItems = [
            { label: 'اطلاعات پایه' },
            { label: 'جزئیات' },
            { label: 'تأیید' },
        ];

        this.speedDialItems = [
            { icon: 'pi pi-pencil' },
            { icon: 'pi pi-share-alt' },
            { icon: 'pi pi-print' },
        ];

        this.splitButtonItems = [
            { label: 'آپدیت', icon: 'pi pi-refresh' },
            { label: 'حذف', icon: 'pi pi-times' },
        ];
    }

    private initChart() {
        this.chartData = {
            labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر'],
            datasets: [
                {
                    label: 'فروش',
                    data: [65, 59, 80, 81],
                    fill: false,
                    tension: 0.4,
                },
            ],
        };

        this.chartOptions = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
            },
        };
    }

    private initMediaAndMisc() {
        this.carouselItems = [
            { title: 'اسلاید ۱', text: 'متن تستی ۱' },
            { title: 'اسلاید ۲', text: 'متن تستی ۲' },
        ];

        this.galleriaImages = [
            {
                itemImageSrc:
                    'https://primefaces.org/cdn/primeng/images/demo/product/bamboo-watch.jpg',
                thumbnailImageSrc:
                    'https://primefaces.org/cdn/primeng/images/demo/product/bamboo-watch.jpg',
                alt: 'تصویر ۱',
            },
            {
                itemImageSrc:
                    'https://primefaces.org/cdn/primeng/images/demo/product/blue-band.jpg',
                thumbnailImageSrc:
                    'https://primefaces.org/cdn/primeng/images/demo/product/blue-band.jpg',
                alt: 'تصویر ۲',
            },
        ];

        this.meterGroupValue = [
            { label: 'App', value: 16 },
            { label: 'Messages', value: 8 },
            { label: 'Media', value: 24 },
            { label: 'System', value: 10 },
        ];
    }

    // ---------- Actions / Handlers ----------

    searchAutoComplete(event: any) {
        const query = (event.query || '').toLowerCase();
        const cities = ['Tehran', 'Isfahan', 'Shiraz', 'Mashhad', 'Tabriz'];
        this.autoCompleteSuggestions = cities.filter((c) =>
            c.toLowerCase().includes(query)
        );
    }

    onPageChange(event: any) {
        this.paginatorFirst = event.first;
        this.paginatorRows = event.rows;
    }

    onFileUpload(event: any) {
        this.messageService.add({
            severity: 'success',
            summary: 'آپلود شد',
            detail: `${event.files?.length || 0} فایل آپلود شد`,
        });
    }

    showToast() {
        this.messageService.add({
            severity: 'success',
            summary: this.toastSummary,
            detail: this.toastDetail,
        });
    }

    confirmSample() {
        this.confirmationService.confirm({
            message: 'حذف انجام شود؟',
            accept: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'حذف شد',
                    detail: 'آیتم با موفقیت حذف شد.',
                });
            },
        });
    }

    doFilterWithFilterService() {
        // مثال خیلی ساده برای استفاده‌ی FilterService
        this.filterServiceResult = this.filterService.filters.contains(
            'PrimeNG',
            'NG'
        );
    }
}
