import config from '~/config';
//Layouts 
import { DefaultPrivateLayout, SettingPrivateLayout, PrivateLayoutWithoutIntro, PublicLayout, AdminLayout } from '~/layouts';


import Login from "~/pages/Authen/Login";
import Register from "~/pages/Authen/Register";
import { EditProfile, AccountPassword, PushNotifications, CommentControl, Help, ConnectLover, ViewHistory, RequestConnection } from '~/pages/Settings';
import { FinalRegister, ResetPassword } from '~/components';
import { ImageDiary, Todolist, DiaryPost, Anniversary } from '~/pages/PrivateCouple';
import { FollowPostCouple, Homepage, Search } from '~/pages/PublicCouples';
import { Accounts, Dashboard, Posts, Supports } from '~/pages/Admin';

const publicRoutes = [
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: config.routes.finalregister, component: FinalRegister },
    { path: config.routes.resetpassword, component: ResetPassword },

]

const privateRoutes = [
    //private couple routes
    { path: config.routes.diarypost, component: DiaryPost, layout: DefaultPrivateLayout, logginRequired: false },
    { path: config.routes.imagesDiary, component: ImageDiary, layout: DefaultPrivateLayout, logginRequired: true },
    { path: config.routes.todolist, component: Todolist, layout: DefaultPrivateLayout, logginRequired: true },
    { path: config.routes.anniversary, component: Anniversary, layout: PrivateLayoutWithoutIntro, logginRequired: true },

    //public couples routes
    { path: config.routes.homepage, component: Homepage, layout: PublicLayout, logginRequired: true },
    { path: config.routes.following, component: FollowPostCouple, layout: PublicLayout, logginRequired: true },
    { path: config.routes.search, component: Search, layout: PublicLayout, logginRequired: true },

    //setting routes
    { path: config.routes.settingEditProfile, component: EditProfile, layout: SettingPrivateLayout, logginRequired: true },
    { path: config.routes.settingAccountPassword, component: AccountPassword, layout: SettingPrivateLayout, logginRequired: true },
    { path: config.routes.settingPushNotifications, component: PushNotifications, layout: SettingPrivateLayout, logginRequired: true },
    { path: config.routes.settingCommentControl, component: CommentControl, layout: SettingPrivateLayout, logginRequired: true },
    { path: config.routes.settingHelp, component: Help, layout: SettingPrivateLayout, logginRequired: true },
    { path: config.routes.settingConnectLover, component: ConnectLover, layout: SettingPrivateLayout, logginRequired: true },
    { path: config.routes.settingViewConnectionsHistory, component: ViewHistory, layout: SettingPrivateLayout, logginRequired: true },
    { path: config.routes.settingRequestConnection, component: RequestConnection, layout: SettingPrivateLayout, logginRequired: true },

    //admin routes
    { path: config.routes.dashboard, component: Dashboard, layout: AdminLayout, logginRequired: true },
    { path: config.routes.accounts, component: Accounts, layout: AdminLayout, logginRequired: true },
    { path: config.routes.posts, component: Posts, layout: AdminLayout, logginRequired: true },
    { path: config.routes.supports, component: Supports, layout: AdminLayout, logginRequired: true },
]

export { publicRoutes, privateRoutes }