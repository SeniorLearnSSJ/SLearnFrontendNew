import {
    IUserDetails,
    IUserSettings,
    IMemberBulletin,
    IOfficialBulletin,  
} from './Interfaces';

//Navigation param Types
export type RootStackParamList = {
    Atrium: undefined;
    SignIn: undefined;
    Register: undefined;
    Guest: undefined;
    UserMenu: undefined;
    UserProfile: {
        profile:IUserDetails;
        UserBulletinList: IMemberBulletin[];
    }
    UserSettings: {
        userSettings:IUserSettings;
    }
    CreateMemberBulletin: undefined;
    EditMemberBulletin: {
        memberBulletin: IMemberBulletin;
    }
    MemberBulletinListType: IMemberBulletin[];
    MemberBulletinDetail: IMemberBulletin;
    
    CreateOfficialBulletin: undefined;
    EditOfficialBulletin: {
        officialBulletin: IOfficialBulletin;
    }
    OfficialBulletinListType: IOfficialBulletin[];
    OfficialBulletinDetail: IOfficialBulletin;
}