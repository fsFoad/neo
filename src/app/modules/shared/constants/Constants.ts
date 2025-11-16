export class Constants {
    static postalPattern = '\\b(?!(\\d)\\1{3})[13-9]{4}[1346-9][013-9]{5}\\b';
    static phoneNumPattern = '^[0][0-9][0-9]([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]*$)';
    static mobNumPattern = '^((\\+98-?)|0)?[9][0-9]{9}$';
    static BracesOpenAndClosePattern = /}[^}]*$/;
    static BracesClosePattern =/\}/;
    static BracesOpenPattern = /\{/;
    static BracesOpenAndCloseAndEveryPattern = /{.*}/;
    static farsiNameMaxLength = 25;
    static farsiFamilyMaxLength = 25;
    static maxAmountMaxLength = 21;
    static minAmountMaxLength = 21;
    static maxPostalCode = 10;
    static maxPhoneNumber = 11;
    static maxLicenseNumber = 25;
    static titleLimitMaxLength = 125;
    static titleRestrictionsMaxLength = 100;
    static wageTitleMaxLength = 125;
    static serviceAffectedIdMaxLength = 26;
    static feeAffectedIdMaxLength = 26;
    static maxToken = 26;
    static nationalCodeLength = 10;
    static shenaseMelliLength = 11;
    static mobileLength = 11;
    static cardNoLength = 16;
    static yearRangeNormal = '1300:1410';
    static optionValueNormal = 'code';
    static optionLabelNormal = 'name';

    static LTRDirectionForForDiv = 'ltr';
    static RTLDirectionForForDiv = 'rtl';
    static APPDirection = 'rtl';
    static IsFontIran = false;
    static AppFontClass: string = 'isFontIran';
    static AppWrapperInitializer: boolean = true;

    static TABVIEW_HOME_PANEL_NAME="خانه";
    static TABVIEW_MESSAGES_PANEL_NAME="پیام ها";
    static TABVIEW_RULES_PANEL_NAME="قواعد";
    static TABVIEW_PARTY_PANEL_NAME="سازمان";
    static TABVIEW_MODULE_PANEL_NAME="ماژول";
    static TABVIEW_CLIENT_PANEL_NAME="کلاینت";
    static TABVIEW_ACCESS_PANEL_NAME="لیست دسترسی";
    static TABVIEW_MEDIATORS_LIST_PANEL_NAME="لیست مدیاتور ها";
    static TABVIEW_MEDIATOR_XML_PANEL_NAME="مدیاتور xml";
    static TABVIEW_MEDIATOR_Json_PANEL_NAME="مدیاتور json";
    static TABVIEW_USERS_PANEL_NAME="کاربران";
    static TABVIEW_ROLES_PANEL_NAME="نقش ها";
    static TABVIEW_REPORT_LOG_PANEL_NAME="گزارش ریز کارکرد سرویس";
    static TABVIEW_REPORT_CALL_PANEL_NAME="گزارش فراخوانی تجمیعی سرویس ها";
    static TABVIEW_FACTOR_PANEL_NAME="فاکتور";
    static TABVIEW_COSTS_PANEL_NAME="هزینه ها";
    static TABVIEW_ABOUT_PANEL_NAME="درباره...";
    static TABVIEW_WAGE_PANEL_NAME="کارمزد سرویس";
    static TABVIEW_DATA_HUB="هاب داده";
    static TABVIEW_REPORT_CHART_PANEL_NAME="گزارش نموداری";
    static TABVIEW_Alerts_System="آلارم های سیستم";
    static SPEED_NOTIF_FAST:number=1000
    static SPEED_NOTIF_Mid:number=2000
    static SPEED_NOTIF_SLOW:number=4000
    static PERSIAN_LETTERS = [
        'آ','ا','ب','پ','ت','ث','ج','چ','ح','خ','د','ذ','ر','ز','ژ','س','ش','ص','ض','ط','ظ','ع','غ','ف','ق','ک','گ','ل','م','ن','و','ه','ی'
    ];
    static faToEnDigits = (val: string | null | undefined): string => {
        if (!val) return '';
        const map: Record<string, string> = {
            '۰': '0','۱': '1','۲': '2','۳': '3','۴': '4','۵': '5','۶': '6','۷': '7','۸': '8','۹': '9'
        };
        return val.replace(/[۰-۹]/g, (d) => map[d]);
    };
    static amountOrPercentage = [
        {id: 1, name: 'مبلغ ثابت'},
        {id: 2, name: 'درصد'},
    ];
    static amount = [
        {id: 1, name: 'مبلغ ثابت'},

    ];
    static billingStatus = [
        {id: 1, name: 'ثبت موقت'},
        {id: 2, name: 'ثبت نهائی'},
        {id: 2, name: 'پرداخت شد'},
    ];
    static wageTypeList = [
        {id: '1', name: 'تعدادی ساده'},
        {id: '2', name: 'تعدادی پلکانی'},
        {id: '3', name: 'مبلغی ساده'},
        {id: '4', name: 'مبلغی پلکانی'},
    ];
    static categoryListOptions = [
        {id: null,name: '-'},
        {id: '1', name: 'براساس سازمان'},
        {id: '2', name: 'براساس کلاینت'},
    ];
    static notifiSuccess = 'عملیات با موفقیت انجام شد';
    static licenseInfoList = [
        {'name': '-', 'code': null},
        {'name': 'جوازکسب', 'code': 1},
        {'name': 'جوازتاسیس', 'code': 2},
        {'name': 'جوازآموزشی', 'code': 3},
        {'name': 'پروانه تاسیس', 'code': 4},
        {'name': 'مجوز بسته بندی,توزیع,پخش و تولید', 'code': 5},
    ];
    static DBEngineOption = [
        {'name': '-', 'code': null},
        {'name': 'MSSQL', 'code': '1'},
        {'name': 'Oracle', 'code': '2'},
        {'name': 'PostgreSQL', 'code': '3'},
        {'name': 'MySQL', 'code': '4'},
    ];
    static Protocol = [
        {'name': '-', 'code': null},
        {'name': 'TCP', 'code': '1'},

    ];
    static typeChart = [
        {'name': '-', 'code': null},
        {'name': 'حداکثر تاخیر', 'code': '1'},
        {'name': 'میانگین ثانیه تاخیر', 'code': '2'},


    ];
    static sorttype = [
        {'name': 'بیشترین تاخیر پاسخ‌دهی', 'code': '1'},
        {'name': 'کمترین تاخیر پاسخ‌دهی', 'code': '0'},


    ];
    static testParamTypeOptions = [
        {'name': 'Input Parameter', 'code': '0'},
        {'name': 'Output Parameter', 'code': '1'},
        {'name': 'Oracle Cursor', 'code': '2'},
        {'name': 'Output Parameter and set as ResultSet', 'code': '3'},
    ];
    static paramTypeOptions = [
        {'name': 'Output Parameter', 'code': '1'},
        {'name': 'Oracle Cursor', 'code': '2'},
        {'name': 'Output Parameter and set as ResultSet', 'code': '3'},
    ];
    static dataTypeSpOptions = [
        {'name': '-', 'code': null},
        {'name': 'string', 'code': '0'},
        {'name': 'numeric', 'code': '1'},
    ];
    static dataTypeOptions = [
        {'name': 'string', 'code': '0'},
        {'name': 'numeric', 'code': '1'},
    ];
    static actionTypeOption = [
        {'name': 'Ok', 'code': '0'},
        {'name': 'Dont Care', 'code': '1'},
    ];
    static commandType = [
        {'name': 'SQL Text', 'code': '1'},
        {'name': 'Execute Procedure', 'code': '2'},
        {'name': 'Custom Query', 'code': '3'},
    ];
    static customerTypes = [
        {name: 'حقیقی', code: '1'},
        {name: 'حقوقی', code: '2'},
    ];
    static citizenshipTypes = [
        {name: 'ایرانی', code: '1'},
        {name: 'غیرایرانی', code: '2'},
    ];
    static genderTypes = [
        {name: '-', code: null},
        {name: 'مرد', code: '1'},
        {name: 'زن', code: '2'},
    ];
    static countryList = [
        {name: '-', code: null},
        {name: 'ایران', code: '1'},
        // {name: 'انگلیس', code: '2'},
        // {name: 'عربستان', code: '3'},
    ];
    static provinceList = [
        {name: '-', code: null},
        {name: 'تهران', code: '1', countryCode: '1'},
        {name: 'اصفهان', code:'2', countryCode: '1'},
        {name: 'فارس', code: '3', countryCode: '1'},
        {name: 'خراسان رضوی', code: '4', countryCode: '1'},
        {name: 'قم', code: '5', countryCode: '1'},
        {name: 'کرمان', code: '6', countryCode: '1'},
    ];
    static cityList = [
        {name: '-', code: null},
        {name: 'تهران', code: '1', provinceCode: '1'},
        {name: 'قم', code: '2', provinceCode: '5'},
        {name: 'اصفهان', code: '3', provinceCode: '2'},
        {name: 'شیراز', code: '4', provinceCode: '3'},
        {name: 'مشهد', code: '5', provinceCode: '4'},
        {name: 'کرمان', code: '6' , provinceCode: '6'},
        {name: 'سیرجان', code: '7', provinceCode: '6'},
        {name: 'رفسنجان', code: '8', provinceCode: '6'},
        {name: 'جیرفت', code: '9', provinceCode: '6'},
        {name: 'بم', code: '10', provinceCode: '6'},
    ];
    static residenceTypes = [
        {name: '-', code: null},
        {name: 'مقیم', code: '1'},
        {name: 'غیرمقیم', code: '2'},
    ];
    static howResidence = [
        {name: '-', code: null},
        {name: 'دائم', code: '1'},
        {name: 'موقت', code: '2'},
    ];
    static terminalTypesList = [
        {code: null, name: '-'},
        {code: '1', name: 'پایانه فروش متصل به خط تلفن'},
        {code: '2', name: 'پایانه متصل به خط شبکه'},
        {code: '3', name: 'پایانه متصل به صندوق فروشگاهی'},
        {code: '4', name: 'پایانه فروش سیار'},
        {code: '5', name: 'درگاه پرداخت اینترنتی'},

    ];
    static organizationList = [
        {code: null, name: '-'},
        {code: 1, name: 'بانک رسالت'},
        {code: 2, name: 'سازمان توانیر'},
        {code: 3, name: 'وزارت بهداشت،درمان و آموزش پزشکی'},
        {code: 4, name: 'وزارت صنعت، معدن وتجارت'},
    ];
    static statusList = [
        {
            code: null,
            name: '-'
        },
        {
            code: 1,
            name: 'فعال'
        },
        {
            code: 2,
            name: 'غیرفعال'
        }
    ];
    static accountTypes = new Map([['cash','نقدی'],['bonus','بن'],['loan','تسهیلات'],
        ['trust','نسیه'],['score','امتیاز'], ['credit','اعتبار']])


    constructor() {
        // Constants.notifiSuccess =this.translateService.instant('label.http.status.200');

    }


    //digibank
    static acSummaries: AccountSummary[] = [
        {
            title: 'قرض الحسنه اشخاص حقوقی',
            accountNumber: '240-1000000589-25',
            balance: 350_000_000,
            blockedAmount: 41_000,
            dateOfLastTurnover: 14000902,
            openingBranch: 'ونک',
            openingDate: 14000715,
        },
        {
            title: 'جاری اشخاص حقوقی',
            accountNumber: '340-1000000145-65',
            balance: 1_435_000_000,
            blockedAmount: 1_000_500_000,
            dateOfLastTurnover: 14000901,
            openingBranch: 'استانبول',
            openingDate: 14000713,
        },
        {
            title: 'جاری اشخاص حقوقی',
            accountNumber: '340-1000000189-26',
            balance: 58_020_000,
            blockedAmount: 0,
            dateOfLastTurnover: 14000903,
            openingBranch: 'بازار',
            openingDate: 14000712,
        },
        {
            title: 'کوتاه مدت اشخاص حقوقی',
            accountNumber: '440-1006580523-01',
            balance: 140_400_000,
            blockedAmount: 0,
            dateOfLastTurnover: 14000905,
            openingBranch: 'تجریش',
            openingDate: 14000716,
        },
    ];
    static branchNames = [
        'تجریش',
        'بازار',
        'دولت',
        'گاندی',
        'شوش',
        'نلسون ماندلا',
        'سعدی',
        'سئول',
        'صادقیه',
        'توحید',
        'میدان آرژانتین',
        'میرداماد',
    ];
    static operationType=[
        {value: ' ', label: '-'},
        {value: 'واریز', label: 'واریز'},
        {value: 'برداشت', label: 'برداشت'},
        {value: 'پرداخت اقساط', label: 'پرداخت اقساط'},
        {value: 'پرداخت قبوض', label: 'پرداخت قبوض'},
        {value: 'ساتنا', label: 'ساتنا'},
        {value: 'پایا', label: 'پایا'},
    ]
    static priority=[
        {value: ' ', label: '-'},
        {value: 'بالا', label: 'بالا'},
        {value: 'پایین', label: 'پایین'},
        {value: 'معمولی', label: 'معمولی'},

    ]

    static acItems = [
        {value: '000', label: '-'},
        {value: '111', label: 'حساب قرض‌الحسنه 25-1000000589-240'},
        {value: '222', label: 'حساب جاری 65-1000000145-340'},
        {value: '444', label: 'حساب جاری 25-1000500148-340'},
        {value: '333', label: 'حساب کوتاه‌مدت 01-1006580523-440'},
    ];
    static tashilats: Tashilat[] = [
        {
            remaining: 8465215749,
            relevantUnit: 'شرکت هولدینگ',
            branch: 'بازار',
            tashilatType: 'مضاربه',
            fileNumber: '139932-621',
            amount: 750000000,
            date: 13980116,
            accumulationPaymentObligation: 220000,
            installmentsPaid: 1000000000
        },
        {
            remaining: 5100000,
            relevantUnit: 'شرکت تابعه1',
            branch: 'دولت',
            tashilatType: 'فروش اقساطی',
            fileNumber: '139911-760',
            amount: 500000000,
            date: 13990424,
            accumulationPaymentObligation: 1000000,
            installmentsPaid: 5000000
        },
        {
            remaining: 1548254962,
            relevantUnit: 'شرکت تابعه2',
            branch: 'میدان آرژانتین',
            tashilatType: 'خرید دین',
            fileNumber: '139910-220',
            amount: 2700000000,
            date: 13990217,
            accumulationPaymentObligation: 0,
            installmentsPaid: 1400000000
        },
        {
            remaining: 643700000,
            relevantUnit: 'شرکت تابعه3',
            branch: 'میرداماد',
            tashilatType: 'خرید دین',
            fileNumber: '139908-129',
            amount: 4000000000,
            date: 14000828,
            accumulationPaymentObligation: 0,
            installmentsPaid: 2000000000
        },
    ];
    static organizationalUnit = [
        {value: '0', label: '-'},
        {value: '1', label: 'شرکت هلدینگ'},
        {value: '2', label: 'شرکت تابعه ۱'},
        {value: '3', label: 'شرکت تابعه ۲'},
        {value: '4', label: 'شرکت تابعه ۳'},
    ];
    static shenasnameType = [
        {value: '0', label: '-'},
        {value: '1', label: 'المثنی'},

    ];
    static signType = [
        {value: '0', label: '-'},
        {value: '1', label: 'نمونه امضاء'},
        {value: '2', label: 'اثر انگشت'},
        {value: '3', label: 'مهر'},
    ];
    static postOrganization = [
        {value: '0', label: '-'},
        {value: '2', label: 'مدیر عامل'},
        {value: '1', label: 'رئیس هیئت مدیره'},
        {value: '3', label: 'نایب رئیس هیات مدیره'},
    ];

    static contactTypes = [
        {value: '0', label: '-'},
        {value: '1', label: 'محل کار'},
        {value: '2', label: 'محل سکونت'},
    ];
    static statusZinaf = [
        {value: '0', label: '-'},
        {value: '1', label: 'فعال'},
        {value: '2', label: 'غیر فعال'},
    ];
    static noMalekiat = [
        {value: '0', label: '-'},
        {value: '1', label: 'خصوصی'},

    ];
    static bankNameList = [
        {label: '-', value: '0'},
        {label: 'ملی', value: '1'},
        {label: 'ملت', value: '2'},
        {label: 'صادرات', value: '3'},
        {label: 'پاسارگاد', value: '4'},
        {label: 'تجارت', value: '5'},
    ];
    static financialHeading = [
        {label: '-', value: ' '},
        {label: 'دارایی‌های جاری', value: 'دارایی‌های جاری'},
        {label: 'دارایی‌های غیر جاری', value: 'دارایی‌های غیر جاری'},
        {label: 'بدهی‌های جاری', value: 'بدهی‌های جاری'},
        {label: 'بدهی‌های غیر جاری', value: 'بدهی‌های غیر جاری'},
        {label: 'حقوق صاحبان سهام', value: 'حقوق صاحبان سهام'},
        {label: 'فروش و درآمدها', value: 'فروش و درآمدها'},
        {label: 'بهای تمام شده کالای فروش رفته', value: 'بهای تمام شده کالای فروش رفته'},
        {label: 'هزینه‌های فعالیت', value: '8'},
        {label: 'سایر هزینه‌ها و درآمدهای غیر عملیاتی', value: 'سایر هزینه‌ها و درآمدهای غیر عملیاتی'},
        {label: 'حساب‌های انتظامی', value: 'حساب‌های انتظامی'},
    ];
    static availableRoles = [
        {value: '0', label: '-'},
        {value: '1', label: '1-کارمند'},
        {value: '2', label: '2-مشتری'},
        {value: '3', label: '3-نمایندگی کارگزاری'},
        {value: '4', label: '4-تامین کننده'},
    ];
    static availableRolespickList = [
        {value: '1', label: '1-کارمند'},
        {value: '2', label: '2-مشتری'},
        {value: '3', label: '3-نمایندگی کارگزاری'},
        {value: '4', label: '4-تامین کننده'},
    ];
    static codeHoze = [
        {value: '0', label: '-'},
        {value: '1', label: '142'},
        {value: '2', label: '703'},
    ];
    static HavaleInternetiStatus = [
        {value: '000', label: '-'},
        {value: '111', label: 'ثبت اولیه'},
        {value: '222', label: 'در انتظار تایید'},
        {value: '333', label: 'ارسال شده به بانک'},
        {value: '444', label: 'تایید نهایی'},
        {value: '555', label: 'خطا دار'},
        {value: '666', label: 'لغو شده'},
    ];
    static referralType = [
        {value: '000', label: '-'},
        {value: '111', label: 'عادی'},
        {value: '222', label: 'دستور پرداخت'},

    ];
    static forItems = [
        {value: '000', label: '-'},
        {value: '111', label: 'حقوق'},
        {value: '222', label: 'تسویه حساب مالی'},
        {value: '333', label: 'پرداخت ویزه'},
        {value: '444', label: 'سایر پرداخت ها'},

    ];
    // --------------------------------------------------------------------------------------

    static farsilabelMaxLength = 25;
    static farsiSegmentMaxLength = 50;
    static EnSegmentMaxLength = 100;
    static maxPostalvalue = 10;
    static servicelabelMaxLength = 25;
    static serviceEnlabelMaxLength = 50;
    static nationalvalueLength = 10;
    static commercialProductId = 1300;
    static commercialProductId2 = 1100;
    static commercialProductId3 = 1200;
    static commercialProductId4 = 1800;


    static contactTypeGroups = [
        {label: '-', value: '0'},
        // { label: 'نشانی', value: '1' },
        {label: 'تلفن ثابت محل کار', value: '1'},
        {label: 'تلفن ثابت محل سکونت', value: '2'},
        {label: 'تلفن همراه', value: '3'},
        {label: 'دورنگار', value: '4'},
        {label: 'پست الکترونیک', value: '5'},
        {label: 'صندوق پستی', value: '6'},
        {label: 'آدرس وب سایت', value: '7'},
        {label: 'آدرس شبکه اجتماعی تلگرام', value: '8'},
        {label: 'آدرس شبکه اجتماعی واتس اپ', value: '9'},
        {label: 'آدرس شبکه اجتماعی اینستاگرام', value: '10'},
        {label: 'آدرس شبکه اجتماعی لینکدین', value: '11'},
        {label: 'آدرس شبکه اجتماعی سایر', value: '12'},

    ];
    static mantaghe = [
        {label: '-', value: '0'},
        {label: 'منطقه1', value: '1'},
        {label: 'منطقه2', value: '2'},
        {label: 'منطقه3', value: '3'},
        {label: 'منطقه4', value: '4'},
        {label: 'منطقه5', value: '5'},
        {label: 'منطقه6', value: '6'},
        {label: 'منطقه7', value: '7'},
        {label: 'منطقه8', value: '8'},
        {label: 'منطقه9', value: '9'},
    ];

    static religion = [
        {label: '-', value: null},
        {label: 'اسلام', value: '1'},
        {label: 'مسیح', value: '2'},
        {label: 'یهود', value: '3'},
    ];
    static nahveTasarofs = [
        {label: '-', value: '0'},
        {label: 'ملکی', value: '1'},
        {label: 'استیجاری', value: '2'},
        {label: 'وقفی', value: '3'},
    ];
    static eduMaghta = [
        {label: '-', value: '0'},
        {label: 'دکتری', value: '1'},
        {label: 'کارشناسی ارشد', value: '2'},
        {label: 'کارشناسی', value: '3'},
        {label: 'کاردانی', value: '4'},
        {label: 'دیپلم', value: '5'},
        {label: 'سیکل', value: '6'},
    ];
    static eduReshte = [
        {value: '0', label: '-'},
        {value: '1', label: 'کامپیوتر'},
        {value: '2', label: 'مدیریت'},

    ];
    static recruitmentType = [
        {value: '0', label: '-'},
        {value: '1', label: 'دائم'},
        {value: '2', label: 'آزمایشی'},

    ];
    static vahed = [
        {value: '0', label: '-'},
        {value: '1', label: 'مدیریت'},
        {value: '2', label: 'فناوری'},

    ];
    static post = [
        {value: '0', label: '-'},
        {value: '1', label: 'مدیر عامل'},
        {value: '2', label: 'معمار سیستم'},

    ];

    static eduGraesh = [
        {label: '-', value: '0'},
        {label: 'سخت افزار', value: '1'},
        {label: 'کار آفرینی', value: '2'},

    ];
    static eduMoaseseType = [
        {label: '-', value: '0'},
        {label: 'دولتی', value: '1'},
        {label: 'آزاد', value: '2'},
        {label: 'غیر انتفاعی', value: '3'},
        {label: 'پیام نور', value: '4'},
        {label: 'کارو دانش', value: '5'},

    ];
    static sect = [
        {label: '-', value: null},
        {label: 'شیعه', value: '1'},
        {label: 'سنی', value: '2'},

    ];
    static segmentTypeList = [
        {
            value: null,
            label: '-'
        },
        {
            value: 1,
            label: 'نقدی'
        },
        {
            value: 2,
            label: 'تسهیلات'
        },
        {
            value: 3,
            label: 'اعتبار'
        },
    ];
    static purchaseTypeList = [
        {
            value: null,
            label: '-'
        },
        {
            value: 1,
            label: 'خرید فقط از جیب '
        },
        {
            value: 2,
            label: 'خرید ترکیبی'
        }
    ];
    static chargeTypeList = [
        {
            value: null,
            label: '-'
        },
        {
            value: 1,
            label: 'شارژ افزایشی'
        },
        {
            value: 2,
            label: 'شارژ ثابت'
        }
    ];

    static currencyList = [
        {
            value: null,
            label: '-'
        },
        {
            value: 'IRR',
            label: 'IRR'
        }
    ];
    static priorityList = [
        {value: null, label: '-'},
        {value: 1, label: 'اولویت اول'},
        {value: 2, label: 'اولویت دوم'},
        {value: 3, label: 'اولویت سوم'},
        {value: 4, label: 'اولویت چهارم'},
        {value: 5, label: 'اولویت پنجم'},
        {value: 6, label: 'اولویت ششم'},
        {value: 7, label: 'اولویت هفتم'},
        {value: 8, label: 'اولویت هشتم'},
        {value: 9, label: 'اولویت نهم'},
        {value: 10, label: 'اولویت دهم'},

    ];

}
export interface AccountSummary {
    title: string;
    accountNumber: string;
    balance: number;
    blockedAmount: number;
    openingDate: number;
    openingBranch: string;
    dateOfLastTurnover: number;
}

export interface Tashilat {
    remaining: number;
    relevantUnit: string;
    branch: string;
    tashilatType: string;
    fileNumber: string;
    amount: number;
    date: number;
    accumulationPaymentObligation: number;
    installmentsPaid: number;
}
