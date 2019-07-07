//childrenList 无的表示单行选中
const config = {
    menus: [
        {
            iconType: "home",
            title: "首页",
            url: '/main/home',
            component: "HomePage"
        },
        {
            iconType: "user",
            title: "User",
            url: '/main/user',
            component: "HomePage",
            childrenList: [
                {
                    title: "Tome",
                    url: '/main/user/Tome',
                    component: "HomePage",
                },
                {
                    title: "Bill",
                    url: '/main/user/Bill',
                    component: "HomePage",
                }
            ]
        },
        {
            iconType: "message",
            title: "Message",
            url: '/main/message',
            component: "Message",
            childrenList: [
                {
                    title: "Bulb",
                    url: '/main/message/bulb',
                    component: "HomePage",
                },
                {
                    title: "Database",
                    url: '/main/user/database',
                    component: "HomePage",
                }
            ]
        }
    ]
}

export default config
