import {
  Community,
  Home,
  Learn,
  QuickAccess,
  Tasks,
} from '@/app/assets/icons/Navigation/BottomBar';
import {
  ArrowLeft,
  ArrowMiddle,
  ArrowMiddleLeft,
  ArrowMiddleRight,
  ArrowRight,
} from '@/app/assets/icons/NavigationOnboarding';
import {MAIN_ROUTE} from '@/app/routes/routes';

import {NotificationCategory} from '@/packages/notifications/utils/consts';

export enum PhoneStep {
  Phone = 1,
  Code = 2,
}

export enum EmailStep {
  Email = 1,
  Check = 2,
}

export const NAVIGATION_ONBOARDING_TABS = [
  {
    orderNum: 1,
    Icon: Home,
    title: 'bottomTabs.home',
  },
  {
    orderNum: 2,
    Icon: Learn,
    title: 'bottomTabs.learn',
  },
  {
    orderNum: 5,
    Icon: QuickAccess,
    title: '',
  },
  {
    orderNum: 3,
    Icon: Tasks,
    title: 'bottomTabs.tasks',
  },
  {
    orderNum: 4,
    Icon: Community,
    title: 'bottomTabs.community',
  },
];

export const NAVIGATION_ONBOARDING_CONTEXT = [
  {
    Arrow: ArrowLeft,
    title: 'navigationOnboarding.home.title',
    features: [
      'navigationOnboarding.home.features.1',
      'navigationOnboarding.home.features.2',
      'navigationOnboarding.home.features.3',
    ],
  },
  {
    Arrow: ArrowMiddleLeft,
    title: 'navigationOnboarding.learn.title',
    features: [
      'navigationOnboarding.learn.features.1',
      'navigationOnboarding.learn.features.2',
    ],
  },
  {
    Arrow: ArrowMiddleRight,
    title: 'navigationOnboarding.tasks.title',
    features: [
      'navigationOnboarding.tasks.features.1',
      'navigationOnboarding.tasks.features.2',
      'navigationOnboarding.tasks.features.3',
    ],
  },
  {
    Arrow: ArrowRight,
    title: 'navigationOnboarding.community.title',
    features: [
      'navigationOnboarding.community.features.1',
      'navigationOnboarding.community.features.2',
      'navigationOnboarding.community.features.3',
    ],
  },
  {
    Arrow: ArrowMiddle,
    title: 'navigationOnboarding.quickAccess.title',
    features: [
      'navigationOnboarding.quickAccess.features.1',
      'navigationOnboarding.quickAccess.features.2',
      'navigationOnboarding.quickAccess.features.3',
    ],
  },
];

export const NOTIFICATION_SCREEN: {[key: string]: string} = {
  [NotificationCategory.assignNewTask]: MAIN_ROUTE.BOTTOM_TABS.TASKS,
  [NotificationCategory.newPost]: MAIN_ROUTE.BOTTOM_TABS.COMMUNITY,
};
