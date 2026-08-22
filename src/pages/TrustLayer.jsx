import React, { useState, useEffect, useRef } from 'react';
import { LiveJitterTracker } from '../utils/jitterEngine';
import { generateAccessibilityToken } from '../utils/tokenGenerator';
import CalibrationModal from '../components/CalibrationModal';
import DwellButton from '../components/DwellButton';

import TokenCard from '../components/TokenCard';
import VoiceInputButton from '../components/VoiceInputButton';
import AudioSpeakButton from '../components/AudioSpeakButton';
import SaathiChatAssistant from '../components/SaathiChatAssistant';
import ErrorBoundary from '../components/ErrorBoundary';
import OcrUploader from '../components/OcrUploader';
import { 
  ShieldCheck, 
  Shield, 
  ShieldAlert, 
  Lock, 
  Zap, 
  RotateCcw, 
  Clock, 
  MousePointer, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  CreditCard, 
  Send, 
  Sparkles, 
  DollarSign, 
  Smartphone, 
  Target, 
  Maximize2, 
  Award, 
  Bot, 
  Mic,
  ShieldX,
  Activity,
  Plus,
  Timer,
  FastForward,
  RefreshCw,
  MessageSquare,
  FileText,
  Eye,
  EyeOff,
  LogOut
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export default function TrustLayer({ setCurrentRoute }) {
  const { 
    t, 
    isHighContrast, setIsHighContrast,
    isSimplifyText, setIsSimplifyText,
    language, setLanguage,
    colorBlindness, setColorBlindness,
    speakText
  } = useAccessibility();

  // Master Switch: "With Trust Layer" is now permanently ON
  const isTrustLayerEnabled = true;

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authFormName, setAuthFormName] = useState('');
  const [authFormDob, setAuthFormDob] = useState('');
  const [authFormPhone, setAuthFormPhone] = useState('');
  const [ocrSuccessNotice, setOcrSuccessNotice] = useState(false);
  const [accounts, setAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem('trustLayerAccounts');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse accounts from localStorage", e);
    }
    return [{ 
      username: 'demo', 
      password: 'password',
      prefs: { language: 'en', isHighContrast: false, isSimplifyText: false, colorBlindness: 'none' },
      upiPin: '1234',
      balance: 124450.80
    }];
  });
  
  useEffect(() => {
    localStorage.setItem('trustLayerAccounts', JSON.stringify(accounts));
  }, [accounts]);

  const [currentUser, setCurrentUser] = useState(null);
  const [authFormUser, setAuthFormUser] = useState('');
  const [authFormPass, setAuthFormPass] = useState('');
  const [authFormPin, setAuthFormPin] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Transfer Form & View Mode State ('FORM' by default | 'CHAT')
  const [transferViewMode, setTransferViewMode] = useState('FORM');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [otp, setOtp] = useState('');
  const [actualOtp] = useState('839201');
  const [otpRetries, setOtpRetries] = useState(0);
  const [otpErrorMessage, setOtpErrorMessage] = useState('');
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPinPad, setShowPinPad] = useState(false);

  // Real-Time Live Jitter & Tremor Likelihood Tracking State
  const [liveJitterMetrics, setLiveJitterMetrics] = useState({
    tremorLikelihood: 12,
    jitterRatio: 1.15,
    directionReversals: 1,
    isTremorDetected: false,
    classification: 'Smooth / Natural Human Motion'
  });

  // 1. & 2. ESCALATING TIME BUDGET STATE (Capped at 5:00 / 300s Hard Max)
  const HARD_CAP_SECONDS = 300; // 5 minutes absolute maximum
  const [tremorSignaturesCount, setTremorSignaturesCount] = useState(0);
  const [allocatedBudgetSeconds, setAllocatedBudgetSeconds] = useState(180); // 180s base
  const [sessionTimeElapsed, setSessionTimeElapsed] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(180);
  
  // Extension & Graceful Timeout State
  const [isGracefulTimeout, setIsGracefulTimeout] = useState(false);
  const [extensionNotification, setExtensionNotification] = useState(null);
  const [showExtensionPopup, setShowExtensionPopup] = useState(false);
  const [counterPulse, setCounterPulse] = useState(false);

  // reCAPTCHA v3 Scoring State
  const [recaptchaScore, setRecaptchaScore] = useState(0.92);

  // Calibration, Adaptive UI & Signed Trust Token State
  const [isCalibrationOpen, setIsCalibrationOpen] = useState(false);
  const [userBaseline, setUserBaseline] = useState({
    avgJitter: 52,
    avgDwellMs: 480,
    tremorProfile: 'Elevated Motor Tremor (Verified)',
    suggestedDwellMs: 500,
    status: 'VERIFIED_ACCESSIBLE'
  });
  const [trustToken, setTrustToken] = useState(null);
  const [isAdaptiveActive, setIsAdaptiveActive] = useState(true);
  const [trustVerificationNotice, setTrustVerificationNotice] = useState(null);

  // Fraud Detection State (Hostile Lockout)
  const [isLocked, setIsLocked] = useState(false);
  const [lockReason, setLockReason] = useState('');
  const [lockScore, setLockScore] = useState(null);
  
  // Simulations
  const [simulationMode, setSimulationMode] = useState(null);
  const [botCursorPos, setBotCursorPos] = useState({ x: 150, y: 150 });
  const [showInspector, setShowInspector] = useState(true);

  const timerIntervalRef = useRef(null);
  const simulationIntervalRef = useRef(null);
  const jitterTrackerRef = useRef(null);
  const continuousTremorDurationRef = useRef(0);

  // Initialize Trust Token on mount
  useEffect(() => {
    if (userBaseline) {
      const token = generateAccessibilityToken(userBaseline);
      setTrustToken(token);
    }
  }, [userBaseline]);

  const calculateEscalatedBudget = (signatures) => {
    // Extends gap from 3 mins (180s) directly to 5 mins (300s) if >2 tremors are detected (3rd signature)
    if (signatures > 2) return HARD_CAP_SECONDS;
    return 180; // Base 3 minutes
  };

  const registerTremorSignature = () => {
    if (isLocked || isGracefulTimeout || transferSuccess) return;

    setTremorSignaturesCount((prevCount) => {
      if (prevCount >= 3) {
        setAllocatedBudgetSeconds(HARD_CAP_SECONDS);
        setExtensionNotification('⏳ Maximum 3/3 Tremor Signatures Logged (5:00 Hard Cap Ceiling Active)');
        setTimeout(() => setExtensionNotification(null), 4000);
        return 3;
      }

      const newCount = Math.min(3, prevCount + 1);
      const newBudget = calculateEscalatedBudget(newCount);
      setAllocatedBudgetSeconds(newBudget);

      // When > 2 tremors are detected, jump remaining time up to the 5:00 ceiling
      if (newCount > 2) {
        setTimeRemaining((prevRemaining) => {
          const finalRemaining = Math.max(prevRemaining, HARD_CAP_SECONDS - sessionTimeElapsed);
          return Math.max(180, finalRemaining);
        });

        setShowExtensionPopup(true);
        setTimeout(() => setShowExtensionPopup(false), 2600);

        setExtensionNotification('🛡️ >2 Tremors Detected: Session gap extended directly from 1:00 to 5:00 Max Ceiling!');
      } else {
        setExtensionNotification(`⚡ Tremor Signature #${newCount} of 2 logged (Requires >2 tremors to extend to 5:00)`);
      }

      setCounterPulse(true);
      setTimeout(() => setCounterPulse(false), 1200);

      setTimeout(() => setExtensionNotification(null), 4500);

      if (!isAdaptiveActive) setIsAdaptiveActive(true);

      return newCount;
    });
  };

  // Live Jitter Tracking (Telemetry only - does NOT extend session time on cursor movement)
  useEffect(() => {
    jitterTrackerRef.current = new LiveJitterTracker({
      windowMs: 2000,
      sampleIntervalMs: 50,
      threshold: 60,
      onUpdate: (metrics) => {
        setLiveJitterMetrics(metrics);

        if (!simulationMode) {
          let dynScore = 0.95;
          if (metrics.tremorLikelihood >= 60) {
            dynScore = Math.max(0.70, 0.95 - (metrics.tremorLikelihood / 100) * 0.25);
          } else {
            dynScore = Math.max(0.85, 0.95 - (metrics.tremorLikelihood / 100) * 0.10);
          }
          dynScore -= otpRetries * 0.15;
          setRecaptchaScore(Math.max(0.55, Math.min(0.98, parseFloat(dynScore.toFixed(2)))));
        }
      }
    });

    const handleMouseMove = (e) => {
      if (jitterTrackerRef.current && !isLocked && !simulationMode && isAuthenticated) {
        jitterTrackerRef.current.addPoint(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isLocked, simulationMode, isTrustLayerEnabled, isGracefulTimeout, otpRetries, isAuthenticated]);

  // Session timer ticker (1 min default base timeout unless tremors are simulated)
  useEffect(() => {
    if (isLocked || transferSuccess || isGracefulTimeout || !isAuthenticated) return;

    timerIntervalRef.current = setInterval(() => {
      // Advance session elapsed time
      setSessionTimeElapsed((prevElapsed) => {
        const nextElapsed = prevElapsed + 1;

        // If tremors were simulated and reached 5:00 hard cap
        if (tremorSignaturesCount > 0 && nextElapsed >= HARD_CAP_SECONDS) {
          clearInterval(timerIntervalRef.current);
          setIsGracefulTimeout(true);
          setTimeRemaining(0);
          return HARD_CAP_SECONDS;
        }

        return nextElapsed;
      });

      // Advance remaining time for the current allocated budget
      setTimeRemaining((prevRemaining) => {
        // Without Trust Layer: expires in 180s and flags as fraud
        if (!isTrustLayerEnabled && prevRemaining <= 1) {
          clearInterval(timerIntervalRef.current);
          const finalScore = 0.38;
          setRecaptchaScore(finalScore);
          triggerAccountLock(t('fraudLockMessage'), finalScore);
          return 0;
        }

        // With Trust Layer:
        if (prevRemaining <= 1) {
          clearInterval(timerIntervalRef.current);
          setIsGracefulTimeout(true);
          return 0;
        }

        return prevRemaining - 1;
      });
    }, 1000);

    return () => clearInterval(timerIntervalRef.current);
  }, [isLocked, transferSuccess, isGracefulTimeout, isTrustLayerEnabled, allocatedBudgetSeconds, sessionTimeElapsed, tremorSignaturesCount, isAuthenticated]);

  const showTrustBypassNotice = (msg) => {
    setTrustVerificationNotice(msg);
  };

  const triggerAccountLock = (reason, score = 0.31) => {
    setIsLocked(true);
    setLockReason(reason);
    setLockScore(score);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);
    setSimulationMode(null);
  };

  const handleFastForwardToHardCap = () => {
    if (isLocked || transferSuccess) return;
    setSessionTimeElapsed(296);
    setTimeRemaining(4);
    setAllocatedBudgetSeconds(HARD_CAP_SECONDS);
    setTremorSignaturesCount(3);
  };

  const handleTransfer = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (isLocked || isGracefulTimeout) return;

    if (!recipient.trim() || !amount.trim()) {
      alert('Please enter recipient and amount.');
      return;
    }

    if (!isTrustLayerEnabled && recaptchaScore < 0.50) {
      triggerAccountLock(t('fraudLockMessage'), recaptchaScore);
      return;
    }

    const currentUserObj = accounts.find(acc => acc.username === currentUser);
    const expectedPin = currentUserObj ? currentUserObj.upiPin : '1234';
    if (otp !== expectedPin) {
      const newRetries = otpRetries + 1;
      setOtpRetries(newRetries);
      const updatedScore = Math.max(0.1, recaptchaScore - 0.15);
      setRecaptchaScore(updatedScore);

      if (!isTrustLayerEnabled && (newRetries >= 3 || updatedScore < 0.50)) {
        triggerAccountLock(t('fraudLockMessage'), updatedScore);
      } else if (isTrustLayerEnabled && newRetries >= 3) {
        showTrustBypassNotice(t('trustVerifiedMessage'));
        setOtpErrorMessage(t('trustVerifiedMessage'));
      } else {
        setOtpErrorMessage(`Incorrect OTP (Attempt ${newRetries} of 3).`);
      }
      return;
    }

    setTransferSuccess(true);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
    // Deduct amount from balance
    const transferAmount = parseFloat(amount.toString().replace(/,/g, '')) || 0;
    setAccounts(prevAccounts => 
      prevAccounts.map(acc => {
        if (acc.username === currentUser) {
          return { ...acc, balance: Math.max(0, (acc.balance || 124450.80) - transferAmount) };
        }
        return acc;
      })
    );
  };

  const triggerSimulateTremor = () => {
    if (isLocked || isGracefulTimeout) return;

    setSimulationMode('TREMOR');
    let step = 0;

    simulationIntervalRef.current = setInterval(() => {
      step++;

      setLiveJitterMetrics({
        tremorLikelihood: 86,
        jitterRatio: 5.8,
        directionReversals: 18,
        netDisplacement: 38,
        totalPathLength: 240,
        isTremorDetected: true,
        classification: t('hudTremorDetected')
      });
      setRecaptchaScore(0.31);

      if (step === 2) {
        if (isTrustLayerEnabled) {
          registerTremorSignature();
        }
      }

      if (step >= 3) {
        clearInterval(simulationIntervalRef.current);
        setSimulationMode(null);

        if (!isTrustLayerEnabled) {
          triggerAccountLock(t('fraudLockMessage'), 0.31);
        } else {
          showTrustBypassNotice(t('trustVerifiedMessage'));
        }
      }
    }, 250);
  };

  const triggerSimulateBotCursor = () => {
    if (isLocked || isGracefulTimeout) return;

    setSimulationMode('BOT');
    let step = 0;

    simulationIntervalRef.current = setInterval(() => {
      step++;

      if (step === 1) {
        setBotCursorPos({ x: 300, y: 220 });
        setRecipient('Sarah Jenkins');
        setRecaptchaScore(0.55);
      } else if (step === 2) {
        setBotCursorPos({ x: 300, y: 310 });
        setAmount('450.00');
        setRecaptchaScore(0.38);
      } else if (step === 3) {
        setBotCursorPos({ x: 300, y: 400 });
        setOtp('839201');
        setRecaptchaScore(0.22);
      } else if (step >= 4) {
        clearInterval(simulationIntervalRef.current);
        setRecaptchaScore(0.22);
        setSimulationMode(null);
        triggerAccountLock(t('fraudLockMessage'), 0.22);
      }
    }, 240);
  };

  const handleReset = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);
    if (jitterTrackerRef.current) jitterTrackerRef.current.reset();

    setIsLocked(false);
    setIsGracefulTimeout(false);
    setLockReason('');
    setLockScore(null);
    setRecipient('');
    setAmount('');
    setOtp('');
    setOtpRetries(0);
    setOtpErrorMessage('');
    setTimeRemaining(180);
    setSessionTimeElapsed(0);
    setTremorSignaturesCount(0);
    setAllocatedBudgetSeconds(180);
    setSimulationMode(null);
    setTransferSuccess(false);
    setShowConfirmation(false);
    setShowPinPad(false);
    setExtensionNotification(null);
    setShowExtensionPopup(false);
    setTrustVerificationNotice(null);
    setRecaptchaScore(0.92);
    setLiveJitterMetrics({
      tremorLikelihood: 12,
      jitterRatio: 1.15,
      directionReversals: 1,
      isTremorDetected: false,
      classification: t('hudSmoothNormal')
    });
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const capProgressPct = tremorSignaturesCount > 0 
    ? Math.min(100, (sessionTimeElapsed / HARD_CAP_SECONDS) * 100)
    : Math.min(100, ((180 - timeRemaining) / 180) * 100);

  const handleProceed = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    setOcrSuccessNotice(false);
    if (authMode === 'signup') {
      if (accounts.some(acc => acc.username === authFormUser)) {
        setAuthError(t('authErrorExists') || 'Username already exists. Please choose another.');
        return;
      }
      const newPrefs = { language, isHighContrast, isSimplifyText, colorBlindness };
      setAccounts([...accounts, { 
        username: authFormUser, 
        password: authFormPass, 
        upiPin: authFormPin || '1234', 
        name: authFormName,
        dob: authFormDob,
        phone: authFormPhone,
        balance: Math.floor(Math.random() * (200000 - 50000 + 1) + 50000) + 0.80,
        prefs: newPrefs 
      }]);
      setCurrentUser(authFormUser);
      setIsAuthenticated(true);
    } else {
      const user = accounts.find(acc => acc.username === authFormUser && acc.password === authFormPass);
      if (user) {
        if (user.prefs) {
          setLanguage(user.prefs.language);
          setIsHighContrast(user.prefs.isHighContrast);
          setIsSimplifyText(user.prefs.isSimplifyText);
          setColorBlindness(user.prefs.colorBlindness);
        }
        setCurrentUser(user.username);
        setIsAuthenticated(true);
      } else {
        setAuthError(t('authErrorInvalid') || 'Invalid username or password.');
      }
    }
  };

  // Save preferences to the current user whenever they change
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      setAccounts(prevAccounts => prevAccounts.map(acc => {
        if (acc.username === currentUser) {
          return {
            ...acc,
            prefs: { language, isHighContrast, isSimplifyText, colorBlindness }
          };
        }
        return acc;
      }));
    }
  }, [language, isHighContrast, isSimplifyText, colorBlindness, isAuthenticated, currentUser]);

  // Ensure the login page acts as a clean slate (reset settings on logout/mount)
  useEffect(() => {
    if (!isAuthenticated) {
      setLanguage('en');
      setIsHighContrast(false);
      setIsSimplifyText(false);
      setColorBlindness('none');
    }
  }, [isAuthenticated, setLanguage, setIsHighContrast, setIsSimplifyText, setColorBlindness]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-12 px-4 py-8 font-sans">

        <div className="bg-white border border-slate-200 rounded-3xl shadow-xl mt-6 p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-teal-100 shadow-sm">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {authMode === 'login' ? t('loginHeading') : (t('signupHeading') || 'Create Account')}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {authMode === 'login' ? t('loginSubtitle') : (t('signupSubtitle') || 'Register to access the Trust Layer.')}
            </p>
          </div>
          
          {authError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-xl mb-4 text-center font-bold">
              {authError}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t('usernameLabel')}</label>
              <input 
                type="text" 
                value={authFormUser}
                onChange={(e) => setAuthFormUser(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 outline-none transition-all" 
                placeholder="Enter username" 
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">{t('passwordLabel')}</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={authFormPass}
                  onChange={(e) => setAuthFormPass(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 pr-12 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 outline-none transition-all" 
                  placeholder="Enter password" 
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            {authMode === 'signup' && (
              <div className="space-y-4">
                <OcrUploader 
                  onExtract={(data) => {
                    if (data.name) setAuthFormName(data.name);
                    if (data.dob) setAuthFormDob(data.dob);
                    if (data.aadhaar) setAuthFormPhone(data.aadhaar); // map to a field for demo
                    setOcrSuccessNotice("We read this from your uploaded document — please check it's correct. You can edit any field below.");
                  }}
                  onVoiceFallback={() => {
                     // Hand off to voice flow logic or alert for demo
                     alert("Voice Fallback Activated: 'Hi, I can help you fill this out. What is your name?'");
                  }}
                />

                {ocrSuccessNotice && (
                  <div className="bg-emerald-50 border-2 border-emerald-200 p-3 rounded-xl mb-4 text-xs font-bold text-emerald-700 flex items-start gap-2 text-left">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>{ocrSuccessNotice}</p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={authFormName}
                    onChange={(e) => setAuthFormName(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 outline-none transition-all" 
                    placeholder="e.g. Rahul Sharma" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth</label>
                  <input 
                    type="text" 
                    value={authFormDob}
                    onChange={(e) => setAuthFormDob(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 outline-none transition-all" 
                    placeholder="DD/MM/YYYY" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ID Number / Phone</label>
                  <input 
                    type="text" 
                    value={authFormPhone}
                    onChange={(e) => setAuthFormPhone(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:ring-2 focus:ring-teal-500 outline-none transition-all" 
                    placeholder="e.g. 1234 5678 9012" 
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Create 4-Digit UPI PIN</label>
                  <input 
                    type="password" 
                    maxLength={4}
                    value={authFormPin}
                    onChange={(e) => setAuthFormPin(e.target.value.replace(/\D/g, ''))}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 font-mono font-bold tracking-widest focus:ring-2 focus:ring-teal-500 outline-none transition-all" 
                    placeholder="••••" 
                    required
                  />
                </div>
              </div>
            )}
            <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition-all shadow-md mt-6">
              {authMode === 'login' ? t('loginButton') : (t('signupButton') || 'Create Account')}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            {authMode === 'login' ? (
              <p>
                {t('noAccountPrompt') || "Don't have an account?"}{' '}
                <button type="button" onClick={() => { setAuthMode('signup'); setAuthError(''); }} className="text-teal-600 font-bold hover:underline">
                  {t('signupLink') || 'Create one'}
                </button>
              </p>
            ) : (
              <p>
                {t('hasAccountPrompt') || "Already have an account?"}{' '}
                <button type="button" onClick={() => { setAuthMode('login'); setAuthError(''); }} className="text-teal-600 font-bold hover:underline">
                  {t('loginLink') || 'Sign In'}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  
  useEffect(() => {
    if (showConfirmation && !showPinPad && !transferSuccess) {
      const msgTemplate = t('spokenConfirmPrompt') || 'Proceed to pay AMOUNT to RECIPIENT. Please confirm or cancel.';
      const msg = msgTemplate.replace('AMOUNT', amount).replace('RECIPIENT', recipient);
      speakText(msg);
    }
  }, [showConfirmation, showPinPad, transferSuccess, amount, recipient, t, speakText]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 font-sans">
      {/* Calibration Modal */}
      <CalibrationModal
        isOpen={isCalibrationOpen}
        onClose={() => setIsCalibrationOpen(false)}
        onCalibrationComplete={(profile) => {
          setUserBaseline(profile);
          const token = generateAccessibilityToken(profile);
          setTrustToken(token);
          setIsAdaptiveActive(true);
        }}
      />

      {/* Visual Tremor Overlay */}
      {simulationMode === 'TREMOR' && (
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="simulated-cursor-jitter bg-amber-600 text-white px-4 py-2 rounded-2xl text-xs font-mono font-bold shadow-2xl border-2 border-yellow-300 flex items-center gap-2">
            <MousePointer className="w-4 h-4 text-yellow-300 animate-bounce" />
            <span>Simulating Tremor Signature #{Math.min(3, tremorSignaturesCount + 1)}</span>
          </div>
        </div>
      )}

      {/* Visual Bot Cursor Overlay */}
      {simulationMode === 'BOT' && (
        <div 
          style={{ transform: `translate(${botCursorPos.x}px, ${botCursorPos.y}px)` }}
          className="fixed top-0 left-0 z-50 pointer-events-none transition-all duration-200 ease-linear"
        >
          <div className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold shadow-2xl border-2 border-white flex items-center gap-1.5">
            <Bot className="w-4 h-4 text-white animate-spin" />
            <span>Bot Script (Linear Trajectory)</span>
          </div>
        </div>
      )}


      {/* Welcome Header & Sign Out */}
      <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center border border-teal-500/30">
            <User className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Secure Session Active</p>
            <p className="text-sm font-bold text-white">Welcome back, <span className="text-teal-300 capitalize">{currentUser}</span></p>
          </div>
        </div>
        <button
          onClick={() => {
            handleReset();
            setIsAuthenticated(false);
            setCurrentUser(null);
            setAuthFormUser('');
            setAuthFormPass('');
            setAuthFormPin('');
          }}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold transition-all border border-slate-700"
        >
          <LogOut className="w-4 h-4 text-slate-400" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Live Status Captions & 5:00 Cap Progress Meter */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 mb-4 shadow-md text-xs font-mono">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
          

          {/* Running Time Budget Display (3:00 Base unless Tremor is simulated) */}
          <div className="flex items-center gap-2 text-slate-300 font-sans text-xs">
            <Timer className="w-4 h-4 text-teal-400" />
            <span>
              {tremorSignaturesCount > 0 ? (
                <>
                  Session Time Budget: <strong className="text-teal-300 font-bold font-mono">{formatTime(sessionTimeElapsed)}</strong> / <span className="text-slate-400 font-semibold font-mono">5:00 Max Cap</span>
                </>
              ) : (
                <>
                  Session Timeout: <strong className="text-teal-300 font-bold font-mono">{formatTime(timeRemaining)}</strong> / <span className="text-slate-400 font-semibold font-mono">3:00 Base</span>
                </>
              )}
            </span>
          </div>

          {/* HUD Badges */}
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
              recaptchaScore >= 0.50 ? 'bg-teal-900/60 text-teal-300' : 'bg-red-900/60 text-red-300'
            }`}>
              {recaptchaScore >= 0.50 ? '✅ SAFE: ' : '🚫 FLAGGED: '} reCAPTCHA {recaptchaScore.toFixed(2)}
            </span>
            <span className="text-slate-400 text-[11px]">
              {liveJitterMetrics.tremorLikelihood >= 60 ? '⚠️ HIGH: ' : '✨ CALM: '}{liveJitterMetrics.tremorLikelihood >= 60 ? '⚠️ ' : '✅ '}{liveJitterMetrics.tremorLikelihood}% Jitter
            </span>
          </div>
        </div>

        {/* Animated Visual Bar */}
        <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden p-0.5 border border-slate-800">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              capProgressPct >= 80 
                ? 'bg-gradient-to-r from-warning to-danger animate-pulse' 
                : capProgressPct >= 50 
                ? 'bg-gradient-to-r from-success to-warning' 
                : 'bg-gradient-to-r from-accent to-success'
            }`}
            style={{ width: `${capProgressPct}%` }}
          />
        </div>
      </div>

      {/* Auto Extension Notification */}
      {extensionNotification && (
        <div className="bg-bgInverse border-2 border-teal-400 text-white rounded-2xl p-3 mb-4 shadow-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-teal-300 animate-spin" />
            </div>
            <div>
              <span className="font-bold text-xs sm:text-sm text-teal-200 block">
                {t('sessionExtendedNotice')}
              </span>
              <p className="text-[11px] text-slate-300">{extensionNotification}</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-teal-400 text-slate-950 font-mono font-bold text-[11px] rounded-lg">
            {tremorSignaturesCount > 2 ? '5:00 MAX' : `SIG #${tremorSignaturesCount}/2`}
          </span>
        </div>
      )}

      {/* Positive Verification Banner */}
      {isTrustLayerEnabled && trustVerificationNotice && !isLocked && !isGracefulTimeout && (
        <div className="bg-bgInverse border-2 border-emerald-400 text-white rounded-2xl p-3.5 mb-5 shadow-lg flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-xs sm:text-sm text-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {t('trustVerifiedHeading')}
              </span>
              <p className="text-[11px] text-slate-300 mt-0.5">{trustVerificationNotice}</p>
            </div>
          </div>
          <button
            onClick={() => setTrustVerificationNotice(null)}
            className="text-[10px] text-slate-400 hover:text-white px-2 py-1 bg-black/30 rounded"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        
        {/* Left Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Account Balance Card */}
          <div className="bg-bgInverse text-white rounded-3xl p-6 shadow-xl border border-slate-700/60 relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">{t('totalAvailableBalance')}</span>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
                  ₹{Math.floor((accounts.find(a => a.username === currentUser)?.balance || 124450.80)).toLocaleString('en-IN')}<span className="text-teal-400 text-2xl font-semibold">{((accounts.find(a => a.username === currentUser)?.balance || 124450.80) % 1).toFixed(2).substring(1)}</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300 font-bold font-sans text-xl">
                ₹
              </div>
            </div>

            

            <div className="border-t border-slate-700/80 pt-4 flex justify-between text-xs text-slate-400">
              <div>
                <span>{t('hudTrustToken')}</span>
                <p className="text-teal-300 font-medium mt-0.5 font-mono">
                  {isTrustLayerEnabled ? t('tokenStatusActive') : 'Disabled'}
                </p>
              </div>
              <div className="text-right">
                <span>{t('hardCapStatus')}</span>
                <p className="text-slate-200 font-medium mt-0.5">
                  {HARD_CAP_SECONDS - sessionTimeElapsed}s / 5:00
                </p>
              </div>
            </div>
          </div>

          {/* Transaction & Recipient History (Cleared) */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm text-center">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t('quickRecipientFill')}</h3>
            <div className="py-4 px-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-xs font-semibold text-slate-500">No Past Recipients</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Transaction history has been cleared for privacy.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Send Money Experience (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* View Mode Switcher: Classic Form (Default) / Saathi AI Chat */}
          <div className="flex flex-wrap items-center justify-between bg-slate-900/90 text-white p-2 sm:p-2.5 rounded-2xl border border-slate-800 shadow-md gap-2">
            <div className="flex items-center gap-2 pl-2">
              <span className="text-xs font-bold text-slate-300 font-sans">Transfer Interface:</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setTransferViewMode('FORM')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 font-sans ${
                  transferViewMode === 'FORM'
                    ? 'bg-teal-500 text-slate-950 shadow-md font-extrabold'
                    : 'text-white hover:text-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Classic Form</span>
              </button>
              <button
                type="button"
                onClick={() => setTransferViewMode('CHAT')}
                className={`px-6 py-3 rounded-xl text-sm font-extrabold transition-all flex items-center gap-2 font-sans ${
                  transferViewMode === 'CHAT'
                    ? 'bg-teal-500 text-slate-950 shadow-md font-extrabold'
                    : 'text-white hover:text-slate-200'
                }`}
              >
                <Bot className="w-4 h-4" />
                <span>Saathi AI Chat</span>
              </button>
            </div>
          </div>

          {/* VIEW A: Saathi Conversational Assistant (Chat Interface) */}
          {transferViewMode === 'CHAT' && !isGracefulTimeout && !isLocked && (
            <SaathiChatAssistant
              isTrustLayerEnabled={isTrustLayerEnabled}
              liveJitterMetrics={liveJitterMetrics}
              isAdaptiveActive={isAdaptiveActive}
              userBaseline={userBaseline}
              onTransferCompleted={(details) => {
                setTransferSuccess(true);
                setRecipient(details.recipient || recipient);
                setAmount(details.amount || amount);
                setOtp(details.otp || otp);
                if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
              }}
              onTriggerLockout={(reason, score) => {
                triggerAccountLock(reason, score);
              }}
              onResetSession={handleReset}
            />
          )}

          {/* VIEW B: Classic Form View & Modals Container */}
          {(transferViewMode === 'FORM' || isGracefulTimeout || isLocked) && (
          <div className={`bg-white rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden min-h-[580px] flex flex-col justify-between transition-all duration-300 ${
            isAdaptiveActive && isTrustLayerEnabled ? 'p-8 sm:p-10 ring-2 ring-teal-500/20' : 'p-6 sm:p-8'
          }`}>
            
            {/* Graceful 5:00 Hard Cap Timeout Modal */}
            {isGracefulTimeout && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md z-50 p-6 sm:p-10 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-200">
                <div className="max-w-lg bg-slate-900 border-2 border-teal-500/80 rounded-3xl p-6 sm:p-8 text-left shadow-2xl text-white">
                  <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-500/40 text-teal-300 flex items-center justify-center mb-4">
                    <Lock className="w-7 h-7" />
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2">
                    {tremorSignaturesCount > 0 
                      ? t('gracefulTimeoutHeading') 
                      : '3-Minute Base Session Expired'}
                  </h2>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {tremorSignaturesCount > 0
                      ? t('gracefulTimeoutMessage')
                      : 'Your standard 1-minute base session window has concluded. To extend the time budget up to the 5:00 maximum hard cap, simulate motor tremor inputs, or sign back in to continue.'}
                  </p>

                  <div className="border-t border-slate-800 pt-4 flex flex-wrap justify-between items-center gap-3">
                    <span className="text-[11px] text-slate-400">Normal Security Protocol • Not Fraud</span>
                    <button
                      onClick={() => { handleReset(); setIsAuthenticated(false); setCurrentUser(null); setAuthFormUser(''); setAuthFormPass(''); setAuthFormPin(''); }}
                      className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>{t('signBackIn')}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Hostile Lockout Intercept Modal */}
            {isLocked && (
              <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-50 p-6 sm:p-10 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-200">
                <div className="max-w-lg bg-slate-900 border-2 border-red-500/80 rounded-3xl p-6 sm:p-8 text-left shadow-2xl text-white">
                  <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center mb-4">
                    <ShieldAlert className="w-8 h-8 animate-pulse" />
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2">
                    {t('fraudLockHeading')}
                  </h2>

                  <div className="bg-dangerBg border border-red-800/80 rounded-2xl p-3.5 my-3.5 text-xs font-mono text-red-200">
                    <p className="text-white text-sm font-bold">{lockReason || t('fraudLockMessage')}</p>
                  </div>

                  <div className="border-t border-slate-800 pt-4 flex flex-wrap justify-between items-center gap-3">


                    <button
                      onClick={() => { handleReset(); setIsAuthenticated(false); setCurrentUser(null); setAuthFormUser(''); setAuthFormPass(''); setAuthFormPin(''); }}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Transfer Success Screen */}
            {transferSuccess && !isLocked && !isGracefulTimeout && (
              <div className="py-12 text-center my-auto">
                <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900">{t('transferSuccessHeading')}</h2>
                <p className="text-slate-600 text-sm mt-1">
                  ₹{amount} INR &rarr; <strong className="text-slate-900">{recipient}</strong>.
                </p>
                <div className="mt-6">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all"
                  >
                    {t('startNewTransfer')}
                  </button>
                </div>
              </div>
            )}

            {/* Send Money Form */}
            {!transferSuccess && !isGracefulTimeout && (
              <div>
                {/* Form Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-6">
                  <div>
                    <h2 className={`font-bold text-slate-900 flex items-center gap-2 ${isAdaptiveActive && isTrustLayerEnabled ? 'text-xl' : 'text-lg'}`}>
                      <Send className="w-5 h-5 text-teal-600" />
                      <span>{t('formHeading')}</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {isTrustLayerEnabled ? t('formSubtitleProtected') : t('formSubtitleUnprotected')}
                    </p>
                  </div>

                  {/* Visual Timer Badge with Animated +30s Pop-up */}
                  <div className="relative flex items-center gap-2">
                    {showExtensionPopup && (
                      <div className="absolute -top-7 right-0 z-30 bg-teal-500 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full shadow-lg border-2 border-white flex items-center gap-0.5 animate-bounce">
                        <Plus className="w-3 h-3" />
                        <span>BUDGET ESCALATED</span>
                      </div>
                    )}

                    <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      isTrustLayerEnabled 
                        ? 'bg-teal-50 text-teal-900 border border-teal-300 shadow-sm' 
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      <Clock className="w-4 h-4 text-teal-600 animate-spin" />
                      <span>{t('sessionTimeoutLabel')} <strong className="font-mono text-sm">{formatTime(timeRemaining)}</strong></span>
                    </div>
                  </div>
                </div>

                {!showConfirmation && !showPinPad && !transferSuccess && (
  <form onSubmit={handleProceed} className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
    <div className="flex flex-col items-center justify-center pt-4 mb-4">
      <div className="w-16 h-16 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center mb-3 shadow-inner">
        <User className="w-8 h-8 text-slate-400" />
      </div>
      <label className={`block font-bold text-slate-700 text-center flex flex-col items-center gap-1.5 ${isAdaptiveActive && isTrustLayerEnabled ? 'text-sm' : 'text-xs'}`}>
        <div className="flex items-center gap-2">
          <span>{t('recipientLabel')}</span>
          <AudioSpeakButton text={t('recipientLabel')} label="Recipient Name" />
        </div>
      </label>
      <div className="flex items-center gap-3 mt-3 w-full max-w-sm border-b-2 border-slate-300 focus-within:border-teal-500 transition-all">
        <input
          type="text"
          required
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Name, UPI ID or Number"
          className={`flex-1 text-center bg-transparent font-semibold text-slate-900 outline-none placeholder-slate-400 ${
            isAdaptiveActive && isTrustLayerEnabled ? 'py-3 text-2xl' : 'py-2 text-xl'
          }`}
        />
        <div className="shrink-0 mb-1">
          <VoiceInputButton
            onTranscript={(text) => setRecipient(text)}
            fieldLabel={t('recipientLabel')}
            className={isAdaptiveActive && isTrustLayerEnabled ? 'py-2 px-2 rounded-xl' : 'py-1.5 px-1.5 rounded-lg'}
          />
        </div>
      </div>
    </div>

    <div className="flex flex-col items-center justify-center mb-6">
      <div className="flex items-center justify-center gap-4 mt-4 w-full">
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-3xl px-6 py-2 shadow-sm focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all">
          <span className={`text-slate-900 font-extrabold font-sans pr-2 ${isAdaptiveActive && isTrustLayerEnabled ? 'text-5xl' : 'text-4xl'}`}>₹</span>
          <input
            type="number"
            step="0.01"
            min="1"
            max="120000"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className={`bg-transparent font-mono font-extrabold text-slate-900 w-[180px] outline-none transition-all placeholder-slate-300 ${
              isAdaptiveActive && isTrustLayerEnabled ? 'text-5xl' : 'text-4xl'
            }`}
          />
        </div>
        <div className="shrink-0">
          <VoiceInputButton
            onTranscript={(amt) => setAmount(amt)}
            fieldLabel={t('amountLabel')}
            isNumeric={true}
            presetSpoken="350"
            className={isAdaptiveActive && isTrustLayerEnabled ? 'py-4 px-4 rounded-2xl shadow-sm' : 'py-3 px-3 rounded-xl shadow-sm'}
          />
        </div>
      </div>

      <div className="mt-6 w-full max-w-sm">
        <div className="grid grid-cols-4 gap-2">
          {['50', '100', '250', '500'].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setAmount(chip)}
              className={`py-2 px-1 rounded-2xl font-mono font-bold text-xs border-2 transition-all shadow-sm ${
                amount === chip 
                  ? 'bg-slate-900 text-white border-slate-800' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
              }`}
            >
              ₹{chip}
            </button>
          ))}
        </div>
      </div>
    </div>

    <div className="pt-4 w-full flex flex-col items-center">
      <DwellButton
        type="submit"
        isAdaptiveActive={isAdaptiveActive && isTrustLayerEnabled}
        dwellTimeMs={userBaseline?.suggestedDwellMs || 500}
        className="w-full max-w-sm bg-teal-600 hover:bg-teal-700 text-white shadow-lg text-base py-4 rounded-3xl font-bold flex justify-center items-center"
      >
        <span>{t('proceedToPay')}</span>
      </DwellButton>
      <div className="mt-4 text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
        <Shield className="w-3 h-3" /> Powered by UPI
      </div>
    </div>
  </form>
)}

{showConfirmation && !showPinPad && !transferSuccess && (
  <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 flex flex-col items-center text-center mt-12 pb-12">
    <div className="w-20 h-20 bg-teal-50 border border-teal-100 rounded-full flex items-center justify-center mb-2 shadow-inner">
      <User className="w-10 h-10 text-teal-600" />
    </div>
    <h3 className="text-xl text-slate-500 font-medium">{t('paying')}</h3>
    <h2 className="text-3xl font-bold text-slate-900 capitalize">{recipient}</h2>
    <div className="text-5xl font-mono font-extrabold text-slate-900 my-4">₹{amount}</div>
    
    <div className="flex gap-4 w-full max-w-xs mt-8">
      <button 
        onClick={() => setShowConfirmation(false)} 
        className="flex-1 py-3 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
      >
        {t('cancel')}
      </button>
      <DwellButton
        onClick={() => { setShowConfirmation(false); setShowPinPad(true); }}
        isAdaptiveActive={isAdaptiveActive && isTrustLayerEnabled}
        dwellTimeMs={userBaseline?.suggestedDwellMs || 500}
        className="flex-1 py-3 rounded-2xl bg-teal-600 text-white font-bold hover:bg-teal-700 shadow-lg flex justify-center items-center"
      >
        {t('confirm')}
      </DwellButton>
    </div>
    <div className="mt-6 text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
      <Shield className="w-3 h-3" /> Powered by UPI
    </div>
  </div>
)}

{showPinPad && !transferSuccess && (
  <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 flex flex-col items-center mt-8 pb-12">
    <h2 className="text-lg font-bold text-slate-700 mb-2">{t('enterPin')}</h2>
    <div className="flex gap-4 justify-center mb-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className={`w-6 h-6 rounded-full border-2 ${otp.length > i ? 'bg-slate-900 border-slate-900' : 'bg-transparent border-slate-300'}`}></div>
      ))}
    </div>

    {otpErrorMessage && (
      <p className="text-red-600 font-bold text-sm mb-4 bg-red-50 px-4 py-2 rounded-xl flex items-center gap-2">
        <AlertTriangle className="w-4 h-4" />
        {otpErrorMessage}
      </p>
    )}

    <div className="grid grid-cols-3 gap-x-6 gap-y-4 max-w-[280px] mx-auto">
      {['1','2','3','4','5','6','7','8','9','X','0','OK'].map(key => {
        if (key === 'X') {
          return (
            <DwellButton
              key={key}
              onClick={() => setOtp(prev => prev.slice(0, -1))}
              isAdaptiveActive={isAdaptiveActive && isTrustLayerEnabled}
              dwellTimeMs={userBaseline?.suggestedDwellMs || 500}
              className={`rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center hover:bg-slate-200 active:bg-slate-300 ${isAdaptiveActive && isTrustLayerEnabled ? 'w-20 h-20 text-2xl' : 'w-16 h-16 text-xl'}`}
            >
              ⌫
            </DwellButton>
          );
        }
        if (key === 'OK') {
          return (
            <DwellButton
              key={key}
              onClick={handleTransfer}
              isAdaptiveActive={isAdaptiveActive && isTrustLayerEnabled}
              dwellTimeMs={userBaseline?.suggestedDwellMs || 500}
              className={`rounded-full bg-teal-600 text-white font-bold flex items-center justify-center hover:bg-teal-700 active:bg-teal-800 shadow-md ${isAdaptiveActive && isTrustLayerEnabled ? 'w-20 h-20 text-xl' : 'w-16 h-16 text-lg'}`}
            >
              <Send className="w-6 h-6" />
            </DwellButton>
          );
        }
        return (
          <DwellButton
            key={key}
            onClick={() => {
              if (otp.length < 4) setOtp(prev => prev + key);
            }}
            isAdaptiveActive={isAdaptiveActive && isTrustLayerEnabled}
            dwellTimeMs={userBaseline?.suggestedDwellMs || 500}
            className={`rounded-full border border-slate-200 bg-white text-slate-900 font-mono font-bold flex items-center justify-center hover:bg-slate-50 active:bg-slate-100 shadow-sm ${isAdaptiveActive && isTrustLayerEnabled ? 'w-20 h-20 text-4xl' : 'w-16 h-16 text-3xl'}`}
          >
            {key}
          </DwellButton>
        );
      })}
    </div>
    
    <div className="mt-8 text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
      <Shield className="w-3 h-3" /> Powered by UPI
    </div>
  </div>
)}
              </div>
            )}
          </div>
          )}
        </div>
      </div>

      {/* Live Demo Inspector with ESCALATING SIGNATURE TRIGGERS */}
      <div className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl p-5 text-white shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-teal-400 animate-pulse"></div>
            <span className="font-mono text-xs font-bold text-teal-300 uppercase tracking-wider">
              {t('inspectorTitle')}
            </span>
          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={() => setShowInspector(!showInspector)}
              className="text-xs text-slate-400 hover:text-white underline"
            >
              {showInspector ? 'Hide Telemetry' : 'Show Telemetry'}
            </button>
          </div>
        </div>

        {showInspector && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
              {/* Metric 1 */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">{t('signaturesLogged')}</span>
                <div className={`text-base font-mono font-bold mt-0.5 ${tremorSignaturesCount > 0 ? 'text-teal-300' : 'text-slate-400'}`}>
                  {tremorSignaturesCount} Signatures
                </div>
                <span className="text-[10px] text-slate-400">Budget: {formatTime(allocatedBudgetSeconds)}</span>
              </div>

              {/* Metric 2 */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">{t('sessionTimeoutLabel')}</span>
                <div className={`text-base font-mono font-bold mt-0.5 ${capProgressPct >= 80 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {formatTime(sessionTimeElapsed)} / 5:00
                </div>
                <span className="text-[10px] text-slate-400">{Math.round(capProgressPct)}% of Hard Cap</span>
              </div>

              {/* Metric 3 */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">{t('hudTremorLikelihood')}</span>
                <div className={`text-base font-mono font-bold mt-0.5 ${liveJitterMetrics.tremorLikelihood >= 60 ? 'text-amber-400' : 'text-teal-300'}`}>
                  {liveJitterMetrics.tremorLikelihood}%
                </div>
                <span className="text-[10px] text-slate-400 truncate block">Ratio: {liveJitterMetrics.jitterRatio}x</span>
              </div>

              {/* Metric 4 */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Security Status</span>
                <div className={`text-sm font-mono font-bold mt-0.5 uppercase ${
                  isGracefulTimeout 
                    ? 'text-teal-400' 
                    : isLocked 
                    ? 'text-red-400' 
                    : 'text-emerald-400'
                }`}>
                  {isGracefulTimeout ? '🔒 5:00 HARD CAP' : isLocked ? '🛑 LOCKED' : '🟢 ACTIVE SESSION'}
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800/80">
              <button
                type="button"
                onClick={triggerSimulateTremor}
                disabled={isLocked || isGracefulTimeout || simulationMode !== null}
                className={`px-4 py-2 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center gap-2 shadow-lg transition-all ${
                  isLocked || isGracefulTimeout || simulationMode !== null
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-amber-600 hover:bg-amber-500 text-white'
                }`}
              >
                <Zap className="w-4 h-4 text-yellow-300" />
                <span>{t('btnSimulateTremor')}</span>
              </button>

              <button
                type="button"
                onClick={handleFastForwardToHardCap}
                disabled={isLocked || isGracefulTimeout}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <FastForward className="w-4 h-4 text-teal-400" />
                <span>{t('btnFastForward')}</span>
              </button>

              <button
                type="button"
                onClick={triggerSimulateBotCursor}
                disabled={isLocked || isGracefulTimeout || simulationMode !== null}
                className={`px-3.5 py-2 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center gap-2 shadow-lg transition-all ${
                  isLocked || isGracefulTimeout || simulationMode !== null
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-500 text-white'
                }`}
              >
                <Bot className="w-4 h-4 text-white" />
                <span>{t('btnSimulateBot')}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="ml-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t('btnResetDemo')}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
