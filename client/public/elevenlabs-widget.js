(function() {
  console.log('Loading ElevenLabs Convai widget...');
  
  // Create the elevenlabs-convai element
  const convaiElement = document.createElement('elevenlabs-convai');
  convaiElement.setAttribute('agent-id', '9r6C9zlC7olJEeuP1vOv');
  document.body.appendChild(convaiElement);
  
  // Load the script
  const script = document.createElement('script');
  script.src = 'https://elevenlabs.io/convai-widget/index.js';
  script.async = true;
  script.type = 'text/javascript';
  script.onload = function() {
    console.log('ElevenLabs Convai widget script loaded successfully');
  };
  script.onerror = function() {
    console.error('Failed to load ElevenLabs Convai widget script');
  };
  document.body.appendChild(script);
})();