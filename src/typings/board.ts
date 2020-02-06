interface RootObject {
  name: string;
  desc: string;
  descData?: any;
  closed: boolean;
  idOrganization: string;
  idEnterprise?: any;
  limits?: any;
  pinned?: any;
  shortLink: string;
  powerUps: any[];
  dateLastActivity: string;
  idTags: any[];
  datePluginDisable?: any;
  creationMethod?: any;
  ixUpdate?: any;
  enterpriseOwned: boolean;
  id: string;
  starred: boolean;
  url: string;
  prefs: Prefs;
  subscribed: boolean;
  labelNames: LabelNames;
  dateLastView: string;
  shortUrl: string;
  templateGallery?: any;
  memberships: Membership[];
}

interface Membership {
  id: string;
  idMember: string;
  memberType: string;
  unconfirmed: boolean;
  deactivated: boolean;
}

interface LabelNames {
  green: string;
  yellow: string;
  orange: string;
  red: string;
  purple: string;
  blue: string;
  sky: string;
  lime: string;
  pink: string;
  black: string;
}

interface Prefs {
  permissionLevel: string;
  hideVotes: boolean;
  voting: string;
  comments: string;
  invitations: string;
  selfJoin: boolean;
  cardCovers: boolean;
  isTemplate: boolean;
  cardAging: string;
  calendarFeedEnabled: boolean;
  background: string;
  backgroundImage?: any;
  backgroundImageScaled?: any;
  backgroundTile: boolean;
  backgroundBrightness: string;
  backgroundColor: string;
  backgroundBottomColor: string;
  backgroundTopColor: string;
  canBePublic: boolean;
  canBeEnterprise: boolean;
  canBeOrg: boolean;
  canBePrivate: boolean;
  canInvite: boolean;
}
