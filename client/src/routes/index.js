import config from '~/config';
//Layouts 
import { DefaultPrivateLayout } from '~/layouts';


import Login from "~/pages/Authen/Login";
import Register from "~/pages/Authen/Register";
import DiaryPost from "~/pages/PrivateCouple/DiaryPost";
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
]

export { publicRoutes, privateRoutes }