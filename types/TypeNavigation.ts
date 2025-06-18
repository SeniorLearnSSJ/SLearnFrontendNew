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
    UserProfile:undefined;
    UserSettings: undefined;
    CreateMemberBulletin: undefined;
    EditMemberBulletin: {
        memberBulletin: IMemberBulletin;
    }
    MemberBulletinListType: undefined;
    MemberBulletinDetail: {item:IMemberBulletin};
    
    CreateOfficialBulletin: undefined;
    EditOfficialBulletin: {
        officialBulletin: IOfficialBulletin;
    }
    OfficialBulletinList: IOfficialBulletin[];
    OfficialBulletinDetail: {item: IOfficialBulletin};

    AdminScreen: undefined;
}