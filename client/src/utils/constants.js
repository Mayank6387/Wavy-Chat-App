export const HOST=import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTE="api/auth";
export const SIGNUP_ROUTE= `${AUTH_ROUTE}/signup`
export const LOGIN_ROUTE=`${AUTH_ROUTE}/login`
export const GET_USER_INFO=`${AUTH_ROUTE}/user-info`
export const UPDATED_PROFILE=`${AUTH_ROUTE}/update-profile`
export const ADD_PROFILE_IMAGE=`${AUTH_ROUTE}/add-profile-image`
export const REMOVE_PROFILE_IMAGE=`${AUTH_ROUTE}/remove-profile-image`