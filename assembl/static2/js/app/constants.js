// @flow
import ThematicsMenu from './components/administration/thematicsMenu';

export const DEFAULT_FAVICON = '/static/img/icon/infinite-1.png';
export const EXTRA_SMALL_SCREEN_WIDTH = 600;
export const SMALL_SCREEN_WIDTH = 768;
export const SMALL_SCREEN_HEIGHT = 812;
export const MEDIUM_SCREEN_WIDTH = 992;
export const APP_CONTAINER_MAX_WIDTH = 1400;
export const IDEA_PREVIEW_MAX_WIDTH = 350;
export const IDEA_PREVIEW_MIN_WIDTH = 280;
// export const IDEA_PREVIEW_MIN_WIDTH = 280;
export const NB_IDEA_PREVIEW_TO_SHOW = 4;
export const APP_CONTAINER_PADDING = 15;
export const MIN_WIDTH_COLUMN = 400;
export const COLUMN_OPACITY_GAIN = 0.5;

// Minimum length for survey answers
export const MINIMUM_BODY_LENGTH = 10;

export const ANCHOR_SIZE = 44;

export const MAX_TREE_FORM_LEVEL = 4;

export const APOLLO_NETWORK_STATUS = {
  /**
   * The query has never been run before and the query is now currently running. A query will still
   * have this network status even if a partial data result was returned from the cache, but a
   * query was dispatched anyway.
   */
  loading: 1,

  /**
   * If `setVariables` was called and a query was fired because of that then the network status
   * will be `setVariables` until the result of that query comes back.
   */
  setVariables: 2,

  /**
   * Indicates that `fetchMore` was called on this query and that the query created is currently in
   * flight.
   */
  fetchMore: 3,

  /**
   * Similar to the `setVariables` network status. It means that `refetch` was called on a query
   * and the refetch request is currently in flight.
   */
  refetch: 4,

  /**
   * No request is in flight for this query, and no errors happened. Everything is OK.
   */
  ready: 7
};

export const PHASE_STATUS = {
  notStarted: 'notStarted',
  completed: 'completed',
  inProgress: 'inProgress'
};

export const PHASES = {
  survey: 'survey',
  thread: 'thread',
  multiColumns: 'multiColumns',
  voteSession: 'voteSession',
  brightMirror: 'brightMirror'
};

export const HARVESTABLE_PHASES = [PHASES.thread, PHASES.multiColumns];

export const COOKIE_TYPES = [
  'ACCEPT_TRACKING_ON_DISCUSSION',
  'ACCEPT_SESSION_ON_DISCUSSION',
  'REJECT_TRACKING_ON_DISCUSSION',
  'REJECT_SESSION_ON_DISCUSSION',
  'ACCEPT_LOCALE',
  'REJECT_LOCALE',
  'ACCEPT_PRIVACY_POLICY_ON_DISCUSSION',
  'REJECT_PRIVACY_POLICY_ON_DISCUSSION',
  'ACCEPT_CGU',
  'REJECT_CGU'
];

export const COOKIE_TRANSLATION_KEYS = {
  userSession: 'userSession',
  locale: 'locale',
  matomo: 'matomo',
  privacyPolicy: 'privacyPolicy',
  cgu: 'cgu'
};

export const COOKIES_CATEGORIES = {
  essential: 'essential',
  analytics: 'analytics',
  other: 'other'
};

export const ADMIN_MENU = {
  discussion: {
    title: 'administration.edition',
    sectionId: 1,
    subMenu: {
      language: {
        title: 'administration.menu.language',
        sectionId: 1
      },
      sections: {
        title: 'administration.menu.sections',
        sectionId: 2
      },
      manageProfileOptions: {
        title: 'administration.menu.manageProfileOptions',
        sectionId: 3
      },
      legalContents: {
        title: 'administration.menu.legalContents',
        sectionId: 4
      },
      timeline: {
        title: 'administration.menu.timeline',
        sectionId: 5
      },
      personalizeInterface: {
        title: 'administration.menu.personalizeInterface',
        sectionId: 6
      }
    }
  },
  exportTaxonomies: {
    title: 'administration.menu.exportTaxonomies'
  },
  landingPage: {
    title: 'administration.landingpage',
    sectionId: 1,
    subMenu: {
      manageModules: {
        title: 'administration.landingPage.manageModules.title',
        sectionId: 1
      },
      header: {
        title: 'administration.landingPage.header.title',
        sectionId: 2
      },
      timeline: {
        title: 'administration.landingPage.timeline.title',
        sectionId: 3
      }
    }
  },
  resourcesCenter: {
    title: 'administration.resourcesCenter.menuTitle'
  }
};

export const PHASES_ADMIN_MENU = {
  survey: {
    sectionId: 1,
    subMenu: {
      setThemes: {
        title: 'administration.survey.0',
        sectionId: 1
      },
      configThematics: {
        sectionId: 'configThematics',
        component: ThematicsMenu
      },
      setQuestions: {
        title: 'administration.survey.1',
        sectionId: 2
      },
      exportData: {
        title: 'administration.survey.2',
        sectionId: 3
      }
    }
  },
  voteSession: {
    sectionId: 1,
    subMenu: {
      pageConfiguration: {
        title: 'administration.voteSession.0',
        sectionId: 1
      },
      configureVotingModules: {
        title: 'administration.voteSession.1',
        sectionId: 2
      },
      configureVotingProposals: {
        title: 'administration.voteSession.2',
        sectionId: 3
      },
      exportData: {
        title: 'administration.voteSession.3',
        sectionId: 4
      }
    }
  },
  thread: {
    sectionId: 1,
    subMenu: {
      exportData: {
        title: 'administration.thread.0',
        sectionId: 1
      }
    }
  },
  multiColumns: {
    sectionId: 1,
    subMenu: {
      exportData: {
        title: 'administration.multiColumns.0',
        sectionId: 1
      }
    }
  },
  brightMirror: {
    sectionId: 1,
    subMenu: {}
  }
};

// Those states lists need to be kept in sync with models/post.py
export const PublicationStates = {
  DRAFT: 'DRAFT',
  SUBMITTED_IN_EDIT_GRACE_PERIOD: 'SUBMITTED_IN_EDIT_GRACE_PERIOD',
  PUBLISHED: 'PUBLISHED',
  MODERATED_TEXT_ON_DEMAND: 'MODERATED_TEXT_ON_DEMAND',
  MODERATED_TEXT_NEVER_AVAILABLE: 'MODERATED_TEXT_NEVER_AVAILABLE',
  DELETED_BY_USER: 'DELETED_BY_USER',
  DELETED_BY_ADMIN: 'DELETED_BY_ADMIN'
};

// Those states lists need to be kept in sync with models/idea_content_link.py
export const ExtractStates = {
  SUBMITTED: 'SUBMITTED',
  PUBLISHED: 'PUBLISHED'
};

export const pickerColors = [
  '#B8E986',
  '#00AA7B',
  '#FCB900',
  '#FF6900',
  '#8646ED',
  '#FF82BE',
  '#00DCFF',
  '#1652C1',
  '#EB144C',
  '#000000'
];

export const modulesTranslationKeys = ['survey', 'thread', 'multiColumns', 'voteSession', 'brightMirror'];

export const BlockingPublicationStates = {};
BlockingPublicationStates[PublicationStates.MODERATED_TEXT_NEVER_AVAILABLE] = PublicationStates.MODERATED_TEXT_NEVER_AVAILABLE;
BlockingPublicationStates[PublicationStates.DELETED_BY_USER] = PublicationStates.DELETED_BY_USER;
BlockingPublicationStates[PublicationStates.DELETED_BY_ADMIN] = PublicationStates.DELETED_BY_ADMIN;

export const ModeratedPublicationStates = {};
ModeratedPublicationStates[PublicationStates.MODERATED_TEXT_NEVER_AVAILABLE] = PublicationStates.MODERATED_TEXT_NEVER_AVAILABLE;
ModeratedPublicationStates[PublicationStates.MODERATED_TEXT_ON_DEMAND] = PublicationStates.MODERATED_TEXT_ON_DEMAND;

export const DeletedPublicationStates = {};
DeletedPublicationStates[PublicationStates.DELETED_BY_USER] = PublicationStates.DELETED_BY_USER;
DeletedPublicationStates[PublicationStates.DELETED_BY_ADMIN] = PublicationStates.DELETED_BY_ADMIN;

export const CountablePublicationStates = {};
CountablePublicationStates[PublicationStates.SUBMITTED_IN_EDIT_GRACE_PERIOD] = PublicationStates.SUBMITTED_IN_EDIT_GRACE_PERIOD;
CountablePublicationStates[PublicationStates.PUBLISHED] = PublicationStates.PUBLISHED;
CountablePublicationStates[PublicationStates.MODERATED_TEXT_ON_DEMAND] = PublicationStates.MODERATED_TEXT_ON_DEMAND;
CountablePublicationStates[PublicationStates.MODERATED_TEXT_NEVER_AVAILABLE] = PublicationStates.MODERATED_TEXT_NEVER_AVAILABLE;