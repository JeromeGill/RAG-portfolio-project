#!python

from dotenv import load_dotenv
import sys
import os

from .chatbot.Chatbot import factory as chatbot_factory
from .indexer.Indexer import factory as indexer_factory

"""Builds a chat Q/A instance on the CLI using whatever is in the default index
"""

DOCUMENT_NAMESPACE = 'anastasia'

def chat():
    load_dotenv()
    chatBot = chatbot_factory(DOCUMENT_NAMESPACE)

    while True:
        question = input("Ask question: ")
        print(chatBot.ask(question))

def index(file_path):
    files = []
    if os.path.isdir(file_path):
        # Walk through the directory and its subdirectories
        for root, dirs, filenames in os.walk(file_path):
            # Append file paths to the list
            files.extend([os.path.join(root, filename) for filename in filenames])
    elif os.path.isfile(file_path):
        # Call the method with the file path
        files = [file_path]
    else:
        print("Directory does not exist:", file_path)
        sys.exit(1)
    
    # @todo check formats are supported
    indexer = indexer_factory(DOCUMENT_NAMESPACE)
    indexer.index(files)


def main():
    if len(sys.argv) < 2:
        print("Usage: python -m documentRAG [chat | index]")
        sys.exit(1)

    function_name = str(sys.argv[1])
    
    if function_name == 'chat':
        chat()
    elif function_name == 'index':
        if len(sys.argv) != 3:
            print("Usage: python -m documentRAG index [file_path | directory_path]")
            sys.exit(1)
        index(sys.argv[2])
    else:
        print("Invalid function number")
        sys.exit(1)


if __name__ == '__main__':
    main()