export const askChatbotAction = (
    { question, indexName }: { question: string, indexName: string },
    token: string
) => fetch(
        `http://localhost:8000/api/question`,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token  ${token}`,
            },
            body: JSON.stringify({ question: question, index_name: indexName}),
        }
    );
