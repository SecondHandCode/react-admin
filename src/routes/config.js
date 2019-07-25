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
            id:"1000000000000000000000",
            iconType: "user",
            title: "User",
            url: '/main/user',
            component: "HomePage",
            childrenList: [
                {
                    parentId:"1000000000000000000000",
                    key: "1000000000000000000001",
                    title: "Tome",
                    url: '/main/user/Tome',
                    component: "HomePage",
                },
                {
                    parentId:"1000000000000000000000",
                    key: "1000000000000000000002",
                    title: "Bill",
                    url: '/main/user/Bill',
                    component: "HomePage",
                }
            ]
        },
        {
            id:"2000000000000000000000",
            iconType: "message",
            title: "Message",
            url: '/main/message',
            component: "Message",
            childrenList: [
                {
                    parentId:"2000000000000000000000",
                    key: "2000000000000000000001",
                    title: "Bulb",
                    url: '/main/message/bulb',
                    component: "HomePage",
                },
                {
                    parentId:"2000000000000000000000",
                    key: "2000000000000000000002",
                    title: "Database",
                    url: '/main/message/database',
                    component: "HomePage",
                }
            ]
        },
    ]
}

export default config
