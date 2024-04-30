export const askChatbotAction = async (question: string) => await fetch(
        `http://localhost:8000/api`,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: question }),
        }
    );
