import {
  AI_CHAT_ROUTE,
  COMMUNITY_ROUTE,
  LEARN_ROUTE,
  MAIN_ROUTE,
  TASK_ROUTE,
  VISIT_ADVOCATE_ROUTE,
} from '@/app/routes/routes';

import type { RecurrentRuleType } from '@/packages/shared/utils/consts';

import type { Type } from '@/packages/auth/utils/interfaces/auth';
import type { ICommunityPost } from '@/packages/community/utils/interfaces';
import type {
  ICareTeamWithPerson,
  IExtendedCareTeamMember,
} from '@/packages/careTeam/utils/interfaces/careTeam';
import { CareTeamMemberType } from '@/packages/careTeam/utils/consts';
import type { IExtendedArticle } from '@/packages/learn/utils/interfaces/trainingPlan';
import type { ITask } from '@/packages/tasks/utils/interfaces/task';
import type { IHelpRequest } from '@/packages/tasks/utils/interfaces/helpRequest';
import type { CheckInType } from '@/packages/aiAssistant/utils/interfaces/aiChat';
import type {
  IVisit,
  IVisitCreateRequest,
} from '@/packages/aiAssistant/utils/interfaces/visitAdvocate';

export type NavigationParamList = {
  [MAIN_ROUTE.CARE_TEAM.NAVIGATOR_NAME]: {
    screen: string;
    params: {
      careTeamId: string;
    };
  };
  [LEARN_ROUTE.NAVIGATOR_NAME]: {
    screen: string;
    params: {
      article?: IExtendedArticle;
      userPlanId?: string;
      trainingPlanId?: string;
      trainingPlanTitle?: string;
      subCategoryId?: string;
      subCategoryCode?: string;
    };
  };
  [LEARN_ROUTE.ARTICLE]: {
    userPlanId?: string;
    trainingPlanId?: string;
    article: IExtendedArticle;
    isLastArticle?: boolean;
  };
  [LEARN_ROUTE.PLAN]: {
    userPlanId: string;
    trainingPlanId: string;
    trainingPlanTitle: string;
  };
  [COMMUNITY_ROUTE.NAVIGATOR_NAME]: {
    screen: string;
    params?: {
      post?: ICommunityPost;
      postId?: string;
    };
  };
  [COMMUNITY_ROUTE.POST_EDIT]: {
    post: ICommunityPost;
  };
  [COMMUNITY_ROUTE.POST_COMMENT_CREATE]: {
    postId: string;
  };
  [MAIN_ROUTE.CREATE_CARE_TEAM.NAVIGATOR_NAME]:
    | {
        screen: string;
        params: {
          careTeamId?: string;
        };
      }
    | undefined;
  [MAIN_ROUTE.CREATE_CARE_TEAM.CARE_TEAM_INVITE.NAVIGATOR_NAME]: {
    careTeamId: string;
  };
  [MAIN_ROUTE.CREATE_CARE_TEAM.CAREGIVER_QUESTIONNAIRE]: {
    memberType: CareTeamMemberType;
  };
  [MAIN_ROUTE.MANAGE_CARE_TEAM.NAVIGATOR_NAME]: {
    screen: string;
    params: {
      careTeamId?: string | undefined;
      careTeamMember?: IExtendedCareTeamMember;
    };
  };
  [TASK_ROUTE.NAVIGATOR_NAME]:
    | {
        screen: string;
        params: {
          taskParams?: { calendarId: string; calendarEventId: string };
          helpRequestId?: string;
          task?: ITask;
          selectedDateTs?: number;
        };
      }
    | undefined;
  [TASK_ROUTE.TASK_UPDATE]: {
    task: ITask;
    recurrentRuleType?: RecurrentRuleType;
    selectedDateTs?: number;
  };
  [TASK_ROUTE.HELP_REQUEST_UPDATE]: {
    helpRequest: IHelpRequest;
  };
  [MAIN_ROUTE.SECONDARY_AUTH_METHOD.NAVIGATOR_NAME]: {
    screen: string;
    params?: {
      type?: Type;
    };
  };
  [MAIN_ROUTE.SECONDARY_AUTH_METHOD.SUCCESS]: {
    params?: {
      type?: Type;
    };
  };
  [AI_CHAT_ROUTE.NAVIGATOR_NAME]: {
    screen: string;
    params: {
      selectedCareTeam?: ICareTeamWithPerson;
      careTeamMemberType?: CareTeamMemberType;
      checkInType?: CheckInType;
    };
  };
  [MAIN_ROUTE.NOTIFICATIONS]: undefined;
  [VISIT_ADVOCATE_ROUTE.NAVIGATOR_NAME]: {
    screen: string;
    params: {
      selectedCareTeam?: ICareTeamWithPerson;
    };
  };
  [VISIT_ADVOCATE_ROUTE.INTRO]: {
    selectedCareTeam: ICareTeamWithPerson;
  };
  [VISIT_ADVOCATE_ROUTE.HISTORY]: {
    selectedCareTeam: ICareTeamWithPerson;
  };
  [VISIT_ADVOCATE_ROUTE.CREATE_VISIT]: {
    selectedCareTeam: ICareTeamWithPerson;
  };
  [VISIT_ADVOCATE_ROUTE.VISIT_DETAILS]: {
    selectedCareTeam: ICareTeamWithPerson;
    visitId: string;
  };
  [VISIT_ADVOCATE_ROUTE.VISIT_DETAILS_EDIT]: {
    selectedCareTeam: ICareTeamWithPerson;
    visit: IVisit;
  };
  [VISIT_ADVOCATE_ROUTE.AUDIO_RECORD]: {
    visit: IVisitCreateRequest;
    selectedCareTeam: ICareTeamWithPerson;
  };
  [VISIT_ADVOCATE_ROUTE.VISIT_UPLOADING]: {
    visit: IVisitCreateRequest;
    audioUri: string;
    selectedCareTeam: ICareTeamWithPerson;
  };
  [MAIN_ROUTE.SURVEY.NAVIGATOR_NAME]: {
    screen: string;
    params: {
      type: string;
      firstName?: string;
      patientFirstName?: string;
      careTeamId?: string;
    };
  };
};
