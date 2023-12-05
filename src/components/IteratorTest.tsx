// import React from 'react';
import { useIterator, User } from '../hooks/useIterator';

export function IteratorTest() {
    const {
        userList,
        currentUser,
        next,
        loading,
        previous
        // previous,
        // next,
    } = useIterator(
        'https://randomuser.me/api'
    )

    return (
        <div>
            <p>All users:{' '}
                {
                    userList.map((user: User) => {
                        if (user.email === currentUser?.email) {
                            return (
                                <div key={user.email}><b>{user.email}</b></div>
                            )
                        } else {
                            return (
                                <div key={user.email}><span>{user.email}</span></div>
                            )
                        }
                    })
                }
            </p>
            {loading ? ('Loading...') : (
                <div>Current user:{' '}{currentUser?.email}</div>
            )}
            <button style={{background: 'grey', color: 'white', padding: '20px'}}
                onClick={() => next()}
            >
                Next
            </button>
            <button style={{background: 'grey', color: 'blue', padding: '20px'}}
                    onClick={() => previous()}
            >
                Previous
            </button>
        </div>
    )
}