export const createAuthSlice=(set)=>({
    userInfo:undefined,
    setUserInfo:(userInfo)=>set({userInfo}),
})


//choti global state hai userinfo ki as authslice

//set method is for just reading and setting the info while get method is used to manipulate the userinfo e.g.messages