//childrenList 无的表示单行选中
// preventDeletion 参数 对应的标签页无删除按钮
const config = {
    menus: [
        {
            key: "9999999999999999999999",
            iconType: "home",
            title: "首页",
            url: '/main/home',
            component: "HomePage",
            preventDeletion: true
        },
        {
            iconType: "user",
            title: "User",
            url: '/main/user',
            component: "HomePage",
            childrenList: [
                {
                    key: "0000000000000000000000",
                    title: "Tome",
                    url: '/main/user/Tome',
                    component: "HomePage",
                },
                {
                    key: "0000000000000000000001",
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
                    key: "0000000000000000000002",
                    title: "Bulb",
                    url: '/main/message/bulb',
                    component: "HomePage",
                },
                {
                    key: "0000000000000000000003",
                    title: "Database",
                    url: '/main/message/database',
                    component: "HomePage",
                }
            ]
        }
    ]
}

export default config
