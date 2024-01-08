import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import { setUser } from '../redux/features/userSlice';
import { useAppContext } from '../context/context';
import { message } from 'antd';

//children is a prop
export default function ProtectAdminRoute({children}) {
    
    const { state, isUserAuthenticated, logout } = useAppContext();

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    const getUser = async() =>{
        try {
            const res = await axios.get(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/v1/admin/getUserData`, {
                headers: {
                  authorization: `Bearer ${state.accessToken}`,
                },
            });

            if(res.data.success){
                dispatch(setUser(res.data.data));
                
            }else{
                message.error(res.data.message);
                <Navigate to='/'/>
                logout();
            }

        } catch (error) {
            logout();
        }
    }

    useEffect(() => {
        if(!user){
            console.log("am i here");
            getUser();
        }
    }, [user, getUser])

    if(isUserAuthenticated()){
        console.log("Yay! Authenticated!");
        return children;
    }else{
        console.log("Not Authenticated!");
        return <Navigate to='/'/>;
    }

}

//wrap protected routes in app.js with <ProtectedRoute>