const fs = require('fs');
const path = require('path');

const contextPath = path.join(__dirname, 'src/context/AccessibilityContext.jsx');
let content = fs.readFileSync(contextPath, 'utf8');

const regex = /const speakText = \(text\) => \{/;
const replacement = `
  // Global unlock for Web Speech API on first interaction
  useEffect(() => {
    const unlockSpeech = () => {
      if ('speechSynthesis' in window && window.speechSynthesis.getVoices().length === 0) {
        const utterance = new SpeechSynthesisUtterance('');
        utterance.volume = 0;
        window.speechSynthesis.speak(utterance);
      }
      window.removeEventListener('click', unlockSpeech);
      window.removeEventListener('touchstart', unlockSpeech);
    };
    window.addEventListener('click', unlockSpeech);
    window.addEventListener('touchstart', unlockSpeech);
    return () => {
      window.removeEventListener('click', unlockSpeech);
      window.removeEventListener('touchstart', unlockSpeech);
    };
  }, []);

  const speakText = (text) => {`;

content = content.replace(regex, replacement);

fs.writeFileSync(contextPath, content, 'utf8');
console.log("Injected SpeechSynthesis unlocker.");
