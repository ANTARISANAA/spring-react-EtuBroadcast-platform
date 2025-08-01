import { routesMessages } from "@/core/components/messages/routes.messages";

export const privateRoutes = Object.freeze({
    home: {
        path: '/',
        label: routesMessages.home,
    },
    students: {
        path: '/students',
        label: routesMessages.students,
    },
    profile: {
        path: '/profile',
        label: routesMessages.profile,
    },
    login: {
        path: '/login',
        label: routesMessages.login,
    },

});

