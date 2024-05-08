export const getWorkspacesAction = async (token: string) => {
    const res = await fetch(
        `http://localhost:8000/api/workspaces/`,
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': `Token  ${token}`,
            },
        }
    )
    return res.json()
}
