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
        },
        {
            iconType: "message",
            title: "Message",
            url: '/main/messsahjkhjkge',
            component: "Message",
            childrenList: [
                {
                    key: "000000s0000000000000002",
                    title: "Bulb",
                    url: '/main/messagse/bulb',
                    component: "HomePage",
                },
                {
                    key: "0000000000000000d000003",
                    title: "Database",
                    url: '/main/messages/database',
                    component: "HomePage",
                }
            ]
        }, {
            iconType: "message",
            title: "Message",
            url: '/main/mesxshjkage',
            component: "Message",
            childrenList: [
                {
                    key: "000000000sd0000000000002",
                    title: "Bulb",
                    url: '/main/messxcage/bulb',
                    component: "HomePage",
                },
                {
                    key: "0000000000000000000003",
                    title: "Database",
                    url: '/main/messddsage/database',
                    component: "HomePage",
                }
            ]
        }, {
            iconType: "message",
            title: "Message",
            url: '/main/messaghjke',
            component: "Message",
            childrenList: [
                {
                    key: "0000000000sdf000000000002",
                    title: "Bulb",
                    url: '/main/messdfsage/bulb',
                    component: "HomePage",
                },
                {
                    key: "000000000000sdf0000000003",
                    title: "Databases",
                    url: '/main/messadsfsdge/database',
                    component: "HomePage",
                }
            ]
        },
        {
            iconType: "message",
            title: "Message",
            url: '/main/messagadsfhjke',
            component: "Message",
            childrenList: [
                {
                    key: "0000000000sdf0000000gddf00002",
                    title: "Bulb",
                    url: '/main/messdfsage/bulb',
                    component: "HomePage",
                },
                {
                    key: "000000000000sdf000000dfger0003",
                    title: "Databases",
                    url: '/main/messadsfsdge/database',
                    component: "HomePage",
                }
            ]
        },
        {
            iconType: "message",
            title: "Message",
            url: '/main/mexczssaghjke',
            component: "Message",
            childrenList: [
                {
                    key: "0000000000sdf000000000hhg002",
                    title: "Bulb",
                    url: '/main/messdfsage/bulb',
                    component: "HomePage",
                },
                {
                    key: "000000000000sdf0dfg000000003",
                    title: "Databases",
                    url: '/main/messadsfsdge/database',
                    component: "HomePage",
                }
            ]
        },
        {
            iconType: "message",
            title: "Message",
            url: '/main/messagasdfhjke',
            component: "Messaasdfge",
            childrenList: [
                {
                    key: "0000000000sdf0fgh00000000002",
                    title: "Bulb",
                    url: '/main/messdfsagdfghe/bulb',
                    component: "HomePage",
                },
                {
                    key: "000000000000sdf000fgh0000003",
                    title: "Databases",
                    url: '/main/messadsfsddfghge/database',
                    component: "HomePage",
                }
            ]
        },
        {
            iconType: "message",
            title: "Message",
            url: '/main/messagasasdfadfhjke',
            component: "Messaasdfge",
            childrenList: [
                {
                    key: "0000000000sdsadfaf0fgh00000000002",
                    title: "Bulb",
                    url: '/main/messdfsagdfghe/bulb',
                    component: "HomePage",
                },
                {
                    key: "000000000000sdf123000fgh0000003",
                    title: "Databases",
                    url: '/main/messadsfsddfghge/database',
                    component: "HomePage",
                }
            ]
        },
    ]
}

export default config
