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
    const [error, setError] = useState<string>()

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const result = await fetch(url);
            const data = await result.json()
            setUserList([...userList, ...data.results])
            setCurrentUser(data.results[0])
        } catch (e) {
            setError('Users could not be fetched!!')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, []);

    const next = () => {
        const indexOfTheCurrentUser = userList.findIndex((user) => user.id.value === currentUser?.id.value);
        const nextUser = userList[indexOfTheCurrentUser + 1];
        return Boolean(nextUser) ? setCurrentUser(nextUser) : fetchUsers()
    }

    const previous = () => {
        const indexOfTheCurrentUser = userList.findIndex((user) => user.id.value === currentUser?.id.value);
        const previousUser = userList[indexOfTheCurrentUser - 1]
        setCurrentUser(previousUser)
    }

    return { userList, currentUser, next, loading, previous, error }
}
