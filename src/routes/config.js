//childrenList 无的表示单行选中
const config = {
    menus: [
        {
            key: "1",
            iconType: "home",
            title: "首页",
            url: '/main/home',
            component: "HomePage"
        },
        {
            key: "2",
            iconType: "user",
            title: "User",
            url: '/main/user',
            component: "HomePage",
            childrenList: [
                {
                    key: "3",
                    title: "Tome",
                    url: '/main/user/Tome',
                    component: "HomePage",
                },
                {
                    key: "4",
                    title: "Bill",
                    url: '/main/user/Bill',
                    component: "HomePage",
                }
            ]
        }
    ]
}

export default config
