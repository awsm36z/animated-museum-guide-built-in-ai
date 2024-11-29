# Animated Museum Guide - Built-In AI

This project, **Animated Museum Guide - Built-In AI**, is my submission for the **[Google Chrome Built-in AI Challenge](https://googlechromeai.devpost.com/)**.

The guide is a Chrome Extension that provides museum visitors with an interactive experience. Visitors can interact with an animated character that answers questions, offers navigation assistance, and makes learning fun. This project demonstrates the integration of LangChain for task planning and RAG for context retrieval.

---

## Features

1. **Voice Interaction**: Users can ask questions verbally, and the guide responds using synthesized speech.
2. **LangChain Integration**: The project uses LangChain to dynamically plan and chain tasks using agents.
3. **RAG (Retrieval-Augmented Generation)**: Retrieves context from PDFs and images hosted on the cloud to provide detailed and accurate answers.
4. **AI-Powered Responses**: Leverages Chrome’s built-in Prompt API to process and respond to user queries in real time.
5. **Contextual Assistance**: Provides navigation help using the museum’s map and guide.

---

## Installation and Setup

Follow the instructions below to set up and run the project on your machine.

### Prerequisites

1. **Python 3.8+**: Install Python from [python.org](https://www.python.org/).
2. **Node.js**: Install Node.js from [nodejs.org](https://nodejs.org/).
3. **Chrome Browser**: Make sure you have the latest version of Google Chrome installed.
4. **Cloud Storage**: Upload the following files to a cloud storage:
   - `museum_guide.pdf` (Exhibit details)
   - `museum_map.jpg` (Museum map)

   Update the URLs for these files in `langchain/rag_retrieval.py`.

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/animated-museum-guide-built-in-ai.git
cd animated-museum-guide-built-in-ai
```

Step 2: Backend Setup (Flask Server)

    Create a Python Virtual Environment:

python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

Install Dependencies: Install the required Python packages:

pip install -r requirements.txt

Run the Flask Server: Start the backend server to handle LangChain agents and RAG:

    python server.py

    The server will start at http://localhost:5000.

Step 3: Frontend Setup (Chrome Extension)

    Install Frontend Dependencies: Install the necessary Node.js dependencies:

    npm install

    Load the Extension:
        Open Chrome and navigate to chrome://extensions/.
        Enable "Developer mode" (toggle in the top right corner).
        Click "Load unpacked" and select the project directory.

Step 4: Cloud Storage Configuration

    Host Required Files: Upload museum_guide.pdf and museum_map.jpg to a cloud storage platform.

    Update File URLs: Open langchain/rag_retrieval.py and replace:

    exhibit_pdf_path = "https://example-bucket.s3.amazonaws.com/museum_guide.pdf"
    navigation_image_path = "https://example-bucket.s3.amazonaws.com/museum_map.jpg"

    Replace these URLs with the actual paths to your uploaded files.

Usage

    Start the Backend: Ensure the Flask server is running at http://localhost:5000.

    Interact with the Extension:
        Click the extension icon in Chrome.
        Use the microphone button to ask questions.
        The character will respond with voice and text based on the query.

Project Components
1. Backend (Flask Server)

    Located in server.py.
    Handles LangChain-based planning and RAG for context retrieval.

2. Frontend (Chrome Extension)

    Built using HTML, CSS, and JavaScript.
    Includes app.js for client-side interactions.

3. LangChain Integration

    Located in the langchain/ directory:
        agents.py: Defines agents for exhibit and navigation tasks.
        rag_retrieval.py: Configures RAG retrieval using cloud-hosted documents.
        planner.py: Implements a LangChain planner to dynamically handle tasks.

Troubleshooting

    Backend Not Starting:
        Ensure Python dependencies are installed correctly.
        Verify that the required files (museum_guide.pdf, museum_map.jpg) are accessible via the URLs specified in langchain/rag_retrieval.py.

    Frontend Issues:
        Check that the Chrome extension is loaded and enabled.
        Verify the Flask server is running and accessible.

Participation in the Google Chrome Built-in AI Challenge

This project was developed as part of my participation in the Google Chrome Built-in AI Challenge. It demonstrates the power of Chrome's built-in AI APIs and LangChain integration for dynamic, real-time, browser-native AI experiences.
Author

Yassine El Yacoubi

    Website: Musa.im
    Blog: Medium Blog

License

This project is licensed under the MIT License.