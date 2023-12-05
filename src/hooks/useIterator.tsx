import { useEffect, useState } from 'react';

export interface User {
    email: string
    id: {
        name: string
        value: string
    }
}

export function useIterator(url: string) {
    const [userList, setUserList] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const result = await fetch(url);
            const data = await result.json()
            setUserList([...userList, ...data.results])
            setCurrentUser(data.results[0])
        } catch (e) {
            throw new Error('Failed to fetch users')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, []);

    const next = () => {
        const indexOfTheCurrentUser = userList.findIndex((user) => user.id.value === currentUser?.id.value);
        console.log(indexOfTheCurrentUser);
        const nextUser = userList[indexOfTheCurrentUser + 1];
        console.log('nextUser: ', nextUser);
        return Boolean(nextUser) ? setCurrentUser(nextUser) : fetchUsers()
    }

    const previous = () => {
        const indexOfTheCurrentUser = userList.findIndex((user) => user.id.value === currentUser?.id.value);
        const previousUser = userList[indexOfTheCurrentUser - 1]
        setCurrentUser(previousUser)
    }

    return { userList, currentUser, next, loading, previous }
}
