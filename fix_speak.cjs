const fs = require('fs');
const path = require('path');

const contextPath = path.join(__dirname, 'src/context/AccessibilityContext.jsx');
let content = fs.readFileSync(contextPath, 'utf8');

const speakTextRegex = /const speakText = \(text\) => \{[\s\S]*?window\.speechSynthesis\.speak\(utterance\);\n\s*\} catch \{\n\s*setIsSpeaking\(false\);\n\s*\}\n\s*\};/;

const replacement = `const speakText = (text) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Text-to-speech is not supported in this browser.');
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop any active speech

      const utterance = new SpeechSynthesisUtterance(text);
      const targetLang = speechLangMap[language] || 'en-IN';
      
      let voices = window.speechSynthesis.getVoices();
      
      // Some browsers load voices asynchronously. If empty, it'll use default.
      if (voices.length > 0) {
        const exactVoice = voices.find(v => v.lang === targetLang);
        const looseVoice = voices.find(v => v.lang.startsWith(targetLang.split('-')[0]));
        
        if (exactVoice) {
          utterance.voice = exactVoice;
          utterance.lang = exactVoice.lang;
        } else if (looseVoice) {
          utterance.voice = looseVoice;
          utterance.lang = looseVoice.lang;
        } else {
          console.warn(\`No voice found for \${targetLang}. Falling back to en-IN.\`);
          const fallbackVoice = voices.find(v => v.lang.startsWith('en'));
          if (fallbackVoice) {
            utterance.voice = fallbackVoice;
            utterance.lang = fallbackVoice.lang;
          } else {
            utterance.lang = 'en-IN';
          }
        }
      } else {
        utterance.lang = targetLang;
      }
      
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
      
      // Hack for Chrome bug where long utterances get canceled
      if (window.speechSynthesis.resume) {
        window.speechSynthesis.resume();
      }
    } catch (e) {
      console.error('TTS failed:', e);
      setIsSpeaking(false);
    }
  };`;

content = content.replace(speakTextRegex, replacement);

fs.writeFileSync(contextPath, content, 'utf8');
console.log("Rewrote speakText to match requirements.");
