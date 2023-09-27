import React from 'react';
import UserCard from "./UserCard.jsx";

const AllUsers = () => {
    return (
        <div className="flex flex-col gap-2 p-2">
            <UserCard/>
        </div>
    );
};

export default AllUsers;
