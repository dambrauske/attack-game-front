import React, {useEffect} from 'react';
import UserCard from "./UserCard.jsx";
import socket from "../socket.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setLoggedInUsers} from "../features/userSlice.jsx";

const AllUsers = () => {

    const dispatch = useDispatch()
    const users = useSelector(state => state.user.loggedInUsers)

    useEffect(() => {
        socket().on('loggedInUsers', (loggedInUsers) => {
            dispatch(setLoggedInUsers(loggedInUsers))
        })

        return () => {
            socket().off('loggedInUsers')
        }

    }, [])


    return (
        <div className="flex flex-col gap-2 p-2">

            {users.length > 0 &&
                users.map((user, i) => (
                    <UserCard
                    key={i}
                    user={user}
                    />
                ))

            }

        </div>
    );
};

export default AllUsers;
