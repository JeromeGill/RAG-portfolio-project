from chatbot.Chatbot import Chatbot
from shared.retriever import retriever
from dotenv import load_dotenv
import settings

#!python
"""Builds a chat Q/A instance on the CLI using whatever is in the default index
"""

def main():
    load_dotenv()

    chatBot = Chatbot(
        settings.PROMPT_TEMPLATE,
        settings.EMBEDDINNG_MODEL,
        settings.LLM_MODEL,
        retriever(
            settings.EMBEDDING_DIMENSIONS
        )
    )

    while True:
        question = input("Ask question: ")
        print(chatBot.ask(question))

if __name__ == '__main__':
    main()