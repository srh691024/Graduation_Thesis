import config from '~/config';
//Layouts 
import { DefaultPrivateLayout, SettingPrivateLayout } from '~/layouts';


import Login from "~/pages/Authen/Login";
import Register from "~/pages/Authen/Register";
import DiaryPost from "~/pages/PrivateCouple/DiaryPost";
// import EditProfile from '~/pages/Settings/EditProfile';
import { EditProfile, AccountPassword, PushNotifications , CommentControl, Help} from '~/pages/Settings';
import { FinalRegister } from '~/components';
import { ResetPassword } from '~/components';

const publicRoutes = [
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: config.routes.finalregister, component: FinalRegister },
    { path: config.routes.resetpassword, component: ResetPassword },

]

const privateRoutes = [
    { path: config.routes.diarypost, component: DiaryPost, layout: DefaultPrivateLayout },
    { path: config.routes.settingEditProfile, component: EditProfile, layout: SettingPrivateLayout },
    { path: config.routes.settingAccountPassword, component: AccountPassword, layout: SettingPrivateLayout },
    { path: config.routes.settingPushNotifications, component: PushNotifications, layout: SettingPrivateLayout },
    { path: config.routes.settingCommentControl, component: CommentControl, layout: SettingPrivateLayout },
    { path: config.routes.settingHelp, component: Help, layout: SettingPrivateLayout },
]

export { publicRoutes, privateRoutes }