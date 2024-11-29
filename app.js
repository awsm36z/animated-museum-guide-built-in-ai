document.addEventListener('DOMContentLoaded', () => {
    const micButton = document.getElementById('mic-button');
    const responseDiv = document.getElementById('response');
    const characterImg = document.getElementById('character');
  
    // Initialize Web Speech API
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
  
    const synth = window.speechSynthesis;
  
    micButton.addEventListener('click', () => {
      startListening();
    });
  
    function startListening() {
      responseDiv.textContent = 'Listening...';
      recognition.start();
    }
  
    recognition.onresult = (event) => {
      const userQuery = event.results[0][0].transcript;
      responseDiv.textContent = `You said: ${userQuery}`;
      processQuery(userQuery);
    };
  
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      responseDiv.textContent = "Sorry, I couldn't understand that. Please try again.";
    };
  
    recognition.onend = () => {
      responseDiv.textContent = 'Processing your request...';
    };
  
    async function processQuery(query) {
      try {
        if (!('ai' in chrome && 'prompt' in chrome.ai)) {
          throw new Error('Prompt API is not available in this browser.');
        }
  
        const session = await chrome.ai.prompt.createSession();
  
        const result = await session.sendPrompt({
          prompt: `You are a friendly museum guide. Answer the following question: ${query}`,
          temperature: 0.7,
          maxTokens: 150,
        });
  
        const aiResponse = result.choices[0].text.trim();
        displayResponse(aiResponse);
        speakResponse(aiResponse);
      } catch (error) {
        console.error('Error:', error);
        const errorMessage = "I'm sorry, I couldn't process your request.";
        displayResponse(errorMessage);
        speakResponse(errorMessage);
      }
    }
  
    function displayResponse(response) {
      responseDiv.textContent = response;
      characterImg.src = 'assets/character_assets/speaking.png';
      setTimeout(() => {
        characterImg.src = 'assets/character_assets/idle.png';
      }, 2000);
    }
  
    function speakResponse(response) {
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.lang = 'en-US';
      utterance.onend = () => {
        characterImg.src = 'assets/character_assets/idle.png';
      };
      characterImg.src = 'assets/character_assets/speaking.png';
      synth.speak(utterance);
    }
  });
  