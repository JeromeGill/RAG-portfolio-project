from pathlib import Path
from setuptools import find_packages, setup
from documentRAG import __version__ as version


description = 'A haystack-ai implementation that allows indexing and retrieval augmented generation of documents'
requires = [
    "haystack-ai",
    "pinecone-haystack",
    "sentence-transformers>=2.2.0",
    "python-dotenv",
    "pytest"
]
here = Path(__file__).parent
readme = (here / "README.md").read_text()



setup(
    name='documentRAG',
    packages=find_packages(),
    version=version,
    description='',
    author='Jerome Gill',
    install_requires=requires,
    setup_requires=['pytest-runner'],
    tests_require=['pytest==4.4.1'],
    test_suite='tests',
    entry_points={'console_scripts': ['chatbot = documentRAG.__main__:main']},
)
