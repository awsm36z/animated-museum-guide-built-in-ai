document.addEventListener('DOMContentLoaded', () => {
    const micButton = document.getElementById('mic-button');
    const responseDiv = document.getElementById('response');
    const characterImg = document.getElementById('character');
  
    micButton.addEventListener('click', async () => {
      const userQuery = await getVoiceInput();
      const aiResponse = await processQuery(userQuery);
      displayResponse(aiResponse);
      speakResponse(aiResponse);
    });
  
    async function processQuery(query) {
      try {
        const response = await fetch("http://localhost:5000/query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });
        const data = await response.json();
        return data.answer;
      } catch (error) {
        console.error("Error processing query:", error);
        return "Sorry, I couldn't process your request.";
      }
    }
  
    function displayResponse(response) {
      responseDiv.textContent = response;
      characterImg.src = "assets/character_assets/speaking.png";
      setTimeout(() => {
        characterImg.src = "assets/character_assets/idle.png";
      }, 2000);
    }
  
    function speakResponse(response) {
      const utterance = new SpeechSynthesisUtterance(response);
      speechSynthesis.speak(utterance);
    }
  
    async function getVoiceInput() {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = "en-US";
      recognition.start();
  
      return new Promise((resolve) => {
        recognition.onresult = (event) => {
          const query = event.results[0][0].transcript;
          resolve(query);
        };
      });
    }
  });
  