import React, { useState, useEffect, useRef } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { saathiDialogs } from '../utils/saathiChatData';
import VoiceInputButton from './VoiceInputButton';
import AudioSpeakButton from './AudioSpeakButton';
import DwellButton from './DwellButton';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  RotateCcw, 
  Heart,
  Mic,
  MessageSquare
} from 'lucide-react';

export default function SaathiChatAssistant({
  isTrustLayerEnabled,
  liveJitterMetrics,
  isAdaptiveActive,
  userBaseline,
  onTransferCompleted,
  onTriggerLockout,
  onResetSession
}) {
  const { language, speechLangCode } = useAccessibility();

  // Conversation Step: 'RECIPIENT' | 'AMOUNT' | 'OTP' | 'CONFIRM' | 'SUCCESS'
  const [step, setStep] = useState('RECIPIENT');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [otp, setOtp] = useState('');
  const actualOtp = '839201';

  // Chat message history: [{ id, sender: 'saathi'|'user', dialogKey, dialogArgs, rawText, isSummaryCard, isAdaptiveNotice, isSuccessCard, timestamp }]
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [hasInjectedAdaptiveTone, setHasInjectedAdaptiveTone] = useState(false);

  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  // Helper to get localized dialog text in the active accessibility language
  const getDialog = (key, ...args) => {
    const entry = saathiDialogs[key];
    if (!entry) return '';
    if (typeof entry === 'function') {
      const fn = entry(...args);
      return fn[language] || fn.en;
    }
    if (typeof entry.en === 'function') {
      const fn = entry.en(...args);
      return fn[language] || fn.en;
    }
    return entry[language] || entry.en || '';
  };

  // Helper to render message text (dynamically translates based on active language)
  const renderMessageText = (msg) => {
    if (msg.dialogKey) {
      return getDialog(msg.dialogKey, ...(msg.dialogArgs || []));
    }
    return msg.rawText || '';
  };

  // 1. DYNAMIC ACCESSIBILITY LANGUAGE SYNC:
  // Whenever the accessibility language changes (e.g. user selects Kannada in menu),
  // immediately update the conversation greeting or re-render existing dialogs in the new language!
  useEffect(() => {
    setMessages((prevMessages) => {
      if (prevMessages.length === 0) {
        return [
          {
            id: 1,
            sender: 'saathi',
            dialogKey: 'askRecipient',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ];
      }
      // Re-map messages to trigger re-render with new language text
      return prevMessages.map((m) => ({ ...m }));
    });
  }, [language]);

  // 2. TIE INTO JITTER / STRUGGLE DETECTION:
  // If tremor likelihood crosses threshold (~60%) WHILE interacting, bot injects warm reassurance in the active language!
  useEffect(() => {
    if (liveJitterMetrics?.isTremorDetected && !hasInjectedAdaptiveTone && step !== 'SUCCESS') {
      setHasInjectedAdaptiveTone(true);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: 'saathi',
            dialogKey: 'tremorReassurance',
            isAdaptiveNotice: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 400);
    }
  }, [liveJitterMetrics?.isTremorDetected, hasInjectedAdaptiveTone, step, language]);

  // Bot response dispatcher with realistic typing delay
  const botReply = (dialogKey, dialogArgs = [], nextStep = null, isCard = false) => {
    setIsBotTyping(true);
    setTimeout(() => {
      setIsBotTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'saathi',
          dialogKey,
          dialogArgs,
          isSummaryCard: isCard,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      if (nextStep) setStep(nextStep);
    }, 550);
  };

  // Handle user sending a message
  const handleSendMessage = (textToSend) => {
    const cleanText = (textToSend || inputText).trim();
    if (!cleanText || isBotTyping) return;

    // Add user message to chat
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      rawText: cleanText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // State Machine Processing
    if (step === 'RECIPIENT') {
      setRecipient(cleanText);
      botReply('askAmount', [cleanText], 'AMOUNT');
    } else if (step === 'AMOUNT') {
      const parsedAmt = cleanText.replace(/[^\d.]/g, '') || cleanText;
      setAmount(parsedAmt);
      botReply('askOtp', [parsedAmt, recipient || 'Recipient'], 'OTP');
    } else if (step === 'OTP') {
      const cleanOtp = cleanText.replace(/\D/g, '');
      setOtp(cleanOtp);

      // Check OTP verification
      if (cleanOtp === actualOtp || cleanText.includes(actualOtp) || cleanOtp.length === 6) {
        botReply('confirmTransfer', [], 'CONFIRM', true);
      } else {
        // Handle OTP retry or error
        if (!isTrustLayerEnabled) {
          onTriggerLockout('🚫 Flagged: Incorrect OTP verification entry under standard anti-bot policy (reCAPTCHA v3 score: 0.31)', 0.31);
        } else {
          botReply('trustTokenNotice', [], 'OTP');
        }
      }
    }
  };

  // Final Dwell-Click Authorization on the in-chat summary card
  const handleAuthorizeTransfer = () => {
    // Check if without trust layer and struggle detected
    if (!isTrustLayerEnabled && liveJitterMetrics?.isTremorDetected) {
      onTriggerLockout('🚫 Flagged: Erratic interaction pattern during final authorization (score: 0.31)', 0.31);
      return;
    }

    setStep('SUCCESS');
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'saathi',
        dialogKey: 'successReceipt',
        dialogArgs: [amount || '350.00', recipient || 'Dr. Alan Miller'],
        isSuccessCard: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    if (onTransferCompleted) {
      onTransferCompleted({ recipient, amount, otp });
    }
  };

  const handleResetChat = () => {
    setStep('RECIPIENT');
    setRecipient('');
    setAmount('');
    setOtp('');
    setHasInjectedAdaptiveTone(false);
    setIsBotTyping(true);
    setMessages([]);
    setTimeout(() => {
      setIsBotTyping(false);
      setMessages([
        {
          id: Date.now(),
          sender: 'saathi',
          dialogKey: 'askRecipient',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 400);
    if (onResetSession) onResetSession();
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[620px] transition-all">
      {/* Saathi Chat Header */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white p-4 flex items-center justify-between border-b border-teal-500/30">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-400 to-emerald-400 p-0.5 shadow-md">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-teal-300">
                <Bot className="w-6 h-6" />
              </div>
            </div>
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900 absolute -bottom-0.5 -right-0.5 animate-pulse"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
                <span>Saathi</span>
                <span className="text-[11px] font-normal text-teal-300 bg-teal-950/60 px-2 py-0.5 rounded-full border border-teal-500/40 font-sans">
                  {getDialog('uiAssistantBadge')}
                </span>
              </h2>
            </div>
            <p className="text-[11px] text-teal-200 flex items-center gap-1.5 mt-0.5 font-sans">
              <Sparkles className="w-3 h-3 text-teal-400" />
              <span>
                {isTrustLayerEnabled ? getDialog('uiTrustActive') : getDialog('uiTrustDisabled')}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetChat}
            title={getDialog('uiStartOver')}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs flex items-center gap-1.5 transition-all font-sans font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{getDialog('uiStartOver')}</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((msg) => {
          const displayBody = renderMessageText(msg);

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {/* Saathi Bot Avatar */}
              {msg.sender === 'saathi' && (
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              {/* Message Bubble Container */}
              <div className={`max-w-[85%] sm:max-w-[75%] space-y-2 ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}>
                
                {/* Standard Message Bubble */}
                <div
                  className={`p-3.5 rounded-3xl text-xs sm:text-sm font-medium leading-relaxed shadow-sm relative group ${
                    msg.sender === 'user'
                      ? 'bg-teal-600 text-white rounded-tr-sm'
                      : msg.isAdaptiveNotice
                      ? 'bg-amber-50 text-amber-950 border-2 border-amber-300/80 rounded-tl-sm shadow-md font-sans'
                      : 'bg-white text-slate-900 border border-slate-200/90 rounded-tl-sm font-sans'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="whitespace-pre-wrap">{displayBody}</p>
                    
                    {/* Read Aloud Audio TTS button for Bot Messages in active language */}
                    {msg.sender === 'saathi' && (
                      <AudioSpeakButton 
                        text={displayBody} 
                        label="Saathi Message" 
                        className="shrink-0 -mt-1 -mr-1"
                      />
                    )}
                  </div>

                  <div className={`text-[9px] mt-1.5 flex items-center gap-1 ${
                    msg.sender === 'user' ? 'text-teal-200 justify-end' : 'text-slate-400'
                  }`}>
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'user' && <CheckCircle2 className="w-3 h-3 text-teal-200" />}
                  </div>
                </div>

                {/* 1. Final Step Summary Card Inside Chat */}
                {msg.isSummaryCard && step === 'CONFIRM' && (
                  <div className="bg-slate-900 text-white border-2 border-teal-400 rounded-3xl p-5 shadow-2xl space-y-4 animate-in zoom-in-95 duration-300">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-teal-400" />
                        <span className="font-bold text-sm text-teal-200 font-sans">{getDialog('uiAuthCardTitle')}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[10px] font-sans font-bold">
                        {getDialog('uiOtpVerifiedBadge')}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block font-sans">{getDialog('uiRecipientLabel')}</span>
                        <strong className="text-white text-xs">{recipient || 'Dr. Alan Miller'}</strong>
                      </div>

                      <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block font-sans">{getDialog('uiTotalAmountLabel')}</span>
                        <strong className="text-teal-300 text-sm font-mono">₹{amount || '350.00'} INR</strong>
                      </div>
                    </div>

                    <div className="bg-teal-950/60 border border-teal-500/30 rounded-xl p-2.5 text-[11px] text-teal-200 flex items-center gap-2 font-sans">
                      <Heart className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>{getDialog('uiDwellNotice')}</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setStep('AMOUNT');
                          botReply('askAmount', [recipient || 'Recipient'], 'AMOUNT');
                        }}
                        className="px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 font-sans font-semibold"
                      >
                        {getDialog('uiEditAmountBtn')}
                      </button>

                      {/* Dwell-Click 500ms Authorization Button */}
                      <DwellButton
                        type="button"
                        onClick={handleAuthorizeTransfer}
                        isAdaptiveActive={isAdaptiveActive && isTrustLayerEnabled}
                        dwellTimeMs={userBaseline?.suggestedDwellMs || 500}
                        className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold shadow-lg shadow-teal-500/30 px-5 py-2.5 font-sans"
                      >
                        <Send className="w-4 h-4" />
                        <span>{getDialog('uiConfirmSendBtn')} ₹{amount || '350.00'}</span>
                      </DwellButton>
                    </div>
                  </div>
                )}

                {/* Success Receipt Card */}
                {msg.isSuccessCard && (
                  <div className="bg-emerald-950/90 text-white border-2 border-emerald-400 rounded-3xl p-5 shadow-2xl space-y-3 animate-in zoom-in-95 font-sans">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-emerald-200">{getDialog('uiTransferSuccessTitle')}</h4>
                        <p className="text-[11px] text-slate-300">{getDialog('uiTransferSecuredSubtitle')}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetChat}
                      className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow transition-all flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{getDialog('uiSendAnotherBtn')}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* User Avatar */}
              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-teal-300 flex items-center justify-center shrink-0 shadow-sm mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Typing Indicator */}
        {isBotTyping && (
          <div className="flex items-center gap-2.5 justify-start animate-in fade-in">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Quick Action Suggestion Chips for Fast Entry */}
      {step !== 'SUCCESS' && step !== 'CONFIRM' && (
        <div className="px-4 py-2 bg-slate-100/80 border-t border-slate-200 flex flex-wrap items-center gap-1.5 text-xs font-sans">
          <span className="text-[10px] font-bold text-slate-500 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-teal-600" />
            <span>{getDialog('uiSuggestions')}</span>
          </span>

          {step === 'RECIPIENT' && (
            <span className="text-[11px] text-slate-500 italic">
              Type or speak recipient name below
            </span>
          )}

          {step === 'AMOUNT' && (
            <>
              {['50', '100', '250', '350', '500'].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleSendMessage(val)}
                  className="px-3 py-1 rounded-xl bg-white hover:bg-teal-50 hover:border-teal-300 text-teal-900 border border-slate-200 text-xs font-mono font-bold transition-all shadow-xs"
                >
                  +₹{val}
                </button>
              ))}
            </>
          )}

          {step === 'OTP' && (
            <button
              type="button"
              onClick={() => handleSendMessage('839201')}
              className="px-3.5 py-1 rounded-xl bg-yellow-100 hover:bg-yellow-200 text-yellow-900 border border-yellow-300 text-xs font-mono font-bold transition-all shadow-xs flex items-center gap-1"
            >
              <span>{getDialog('uiUseOtpChip')}</span>
            </button>
          )}
        </div>
      )}

      {/* 2. Persistent Input Bar (Text + Mic + Send) in Active Language */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 sm:p-4 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={step === 'CONFIRM' || step === 'SUCCESS'}
          placeholder={
            step === 'RECIPIENT'
              ? getDialog('placeholderRecipient')
              : step === 'AMOUNT'
              ? getDialog('placeholderAmount')
              : step === 'OTP'
              ? getDialog('placeholderOtp')
              : getDialog('placeholderReady')
          }
          className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all disabled:opacity-50 font-sans"
        />

        {/* Reusable Voice Input Button configured with speechLangCode for active accessibility language */}
        <VoiceInputButton
          onTranscript={(spokenText) => {
            setInputText(spokenText);
            handleSendMessage(spokenText);
          }}
          fieldLabel="answer"
          isNumeric={step === 'AMOUNT'}
          isOtp={step === 'OTP'}
          presetSpoken={
            step === 'RECIPIENT'
              ? 'Dr. Alan Miller (Medical)'
              : step === 'AMOUNT'
              ? '350.00'
              : '839201'
          }
          className="py-3 px-3.5 rounded-2xl"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!inputText.trim() || step === 'CONFIRM' || step === 'SUCCESS'}
          className="p-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-teal-600/20 active:scale-95 flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
