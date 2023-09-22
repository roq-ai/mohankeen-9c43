interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Site Owner'],
  customerRoles: ['Guest'],
  tenantRoles: ['Site Owner', 'Content Moderator', 'Anime Reviewer', 'Registered User'],
  tenantName: 'Company',
  applicationName: 'mohankeen',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Read anime information',
    'Read review content',
    'Read company information',
    'Read user information',
  ],
  ownerAbilities: [
    'Manage users',
    'Manage companies',
    'Manage animes',
    'Manage reviews',
    'Manage moderations',
    'Manage watchlists',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/72f11421-5283-4e32-8956-2ba89eb9de9f',
};
