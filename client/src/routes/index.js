import config from '~/config';
//Layouts 
import { HeaderOnly } from '~/layouts';

import PrivateHome from "~/pages/PrivateHome";
import Login from "~/pages/Login";
import PublicHome from "~/pages/PublicHome";
import Register from "~/pages/Register";
import DiaryPost from "~/pages/DiaryPost";

const publicRoutes = [
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register }

]

const privateRoutes = [
    { path: config.routes.privateHome, component: PrivateHome },
    { path: config.routes.publicHome, component: PublicHome },
    { path: config.routes.diaryPost, component: DiaryPost, layout: HeaderOnly },
]

export { publicRoutes, privateRoutes }