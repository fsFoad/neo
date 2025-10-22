import {environment} from "../environments/environment";

export class AppSettings {
    static AppDirection: 'rtl' | 'ltr' = 'rtl';
    static LTRDirection: 'rtl' | 'ltr' = 'ltr';
    static RTLDirection: 'rtl' | 'ltr' = 'rtl';
    static NavigationPosition: 'left' | 'right' = 'right';
    static FuseDrawerPosition: 'left' | 'right' = 'right';
    static ThemeDrawerPosition: 'left' | 'right' = 'left';
    static RightPosition: 'right' = 'right';
    static LeftPosition: 'left' = 'left';
    static ShowChat = false;
    static ShowSetting = !environment.production;
    static ServerSideNavigation = false;
    static IsMock = false;
}
