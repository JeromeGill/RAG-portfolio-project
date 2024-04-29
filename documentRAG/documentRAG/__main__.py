from .chatbot.Chatbot import factory
from dotenv import load_dotenv

#!python
"""Builds a chat Q/A instance on the CLI using whatever is in the default index
"""

def main():
    load_dotenv()

    chatBot = factory()

    while True:
        question = input("Ask question: ")
        print(chatBot.ask(question))

if __name__ == '__main__':
    main()