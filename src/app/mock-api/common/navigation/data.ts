/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

let navigations: FuseNavigationItem[] = [
    {
        icon: 'home',
        menuId: 2,
        id: 'home',
        title: 'صفحه اصلی',
        type: 'basic',
        parentId: 1,
        translate: 'home',
        link: '/main/home',
        children: [],
    },
    {
        icon: 'home',
        menuId: 3,
        id: 'basicInfo',
        title: 'مدیریت تسهیلات',
        type: 'collapsable',
        parentId: 1,
        translate: 'مدیریت تسهیلات',
        children: [
            {
                icon: 'home',
                menuId: 4,
                id: 'messages',
                title: 'اطلاعات پایه',
                type: 'collapsable',
                parentId: 3,
                translate: 'اطلاعات پایه',
                children: [
                    {
                        icon: 'home',
                        menuId: 4,
                        id: 'messages',
                        title: 'محصول',
                        type: 'basic',
                        parentId: 3,
                        translate: 'محصول',
                        link: '/main/lon-product',
                        children: [],
                    },
                    {
                        icon: 'home',
                        menuId: 5,
                        id: 'messages',
                        title: 'تعهدات',
                        type: 'basic',
                        parentId: 3,
                        translate: 'تعهدات',
                        link: '/main/loan-funding-sources',
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        icon: 'feedback',
        menuId: 15,
        id: 'messages',
        title: 'درباره...',
        type: 'basic',
        parentId: 1,
        translate: 'درباره...',
        link: '/main/about',
        children: [],
    },
    {
        icon: 'exit_to_app',
        menuId: 16,
        id: 'messages',
        title: 'خروج',
        type: 'basic',
        parentId: 1,
        translate: 'خروج',
        link: '/000000000',
        children: [],
    },
];
export const defaultNavigation: FuseNavigationItem[] = navigations;
export const compactNavigation: FuseNavigationItem[] = navigations;
export const futuristicNavigation: FuseNavigationItem[] = navigations;
export const horizontalNavigation: FuseNavigationItem[] = navigations;
