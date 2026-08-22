import React, { useState, useEffect, useRef } from 'react';
import { 
  AlertTriangle, 
  Lock, 
  ShieldAlert, 
  Zap, 
  RotateCcw, 
  Clock, 
  MousePointer, 
  KeyRound, 
  ArrowRight, 
  Building, 
  CheckCircle2, 
  Bot, 
  ShieldCheck, 
  Activity,
  Info,
  ShieldX
} from 'lucide-react';

import { useAccessibility } from '../context/AccessibilityContext';

export default function DummyBank() {
  const { t, language } = useAccessibility();
  // State management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('john_doe_99');
  const [password, setPassword] = useState('••••••••');
  
  // Transfer Form State
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [otp, setOtp] = useState('');
  const [actualOtp] = useState('839201');
  const [otpRetries, setOtpRetries] = useState(0);
  const [otpErrorMessage, setOtpErrorMessage] = useState('');
  const [transferSuccess, setTransferSuccess] = useState(false);

  // reCAPTCHA v3 Scoring State (0.0 = Bot, 1.0 = Human, Threshold = 0.5)
  const [recaptchaScore, setRecaptchaScore] = useState(0.92);
  const [recaptchaStatus, setRecaptchaStatus] = useState('HUMAN_VERIFIED'); // 'HUMAN_VERIFIED' | 'ERRATIC_FLAGGED' | 'BOT_FLAGGED'

  // Fraud Detection Engine State
  const [isLocked, setIsLocked] = useState(false);
  const [lockReason, setLockReason] = useState('');
  const [lockScore, setLockScore] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  // Simulation States
  const [simulationMode, setSimulationMode] = useState(null); // 'TREMOR' | 'BOT' | null
  const [botCursorPos, setBotCursorPos] = useState({ x: 100, y: 100 });
  const [showDevPanel, setShowDevPanel] = useState(true);

  const intervalRef = useRef(null);
  const simulationIntervalRef = useRef(null);

  // Calculate live mock reCAPTCHA v3 score
  const evaluateRecaptchaV3 = (jitterVar = 0.1, retries = 0, regularity = 0.5) => {
    let score = 1.0;
    score -= jitterVar * 0.5;               // Erratic movement lowers score
    score -= retries * 0.15;                // OTP retries lower score
    score -= (1 - regularity) * 0.3;        // Very irregular typing lowers score
    score = Math.max(0.05, Math.min(0.95, parseFloat(score.toFixed(2))));
    return score;
  };

  // Live mouse movement listener (Natural cursor movements keep score healthy ~0.90+)
  useEffect(() => {
    const handleMouseMove = () => {
      if (!isLocked && !simulationMode) {
        // Natural human cursor maintains strong human score (0.88 - 0.94)
        const naturalScore = Math.max(0.70, evaluateRecaptchaV3(0.08, otpRetries, 0.75));
        setRecaptchaScore(naturalScore);
        setRecaptchaStatus('HUMAN_VERIFIED');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isLocked, simulationMode, otpRetries]);

  // Form timer (30s strict fraud limit)
  useEffect(() => {
    if (!isLoggedIn || isLocked || transferSuccess) return;

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          const finalScore = 0.38;
          setRecaptchaScore(finalScore);
          triggerAccountLock('Form interaction timeout exceeded 30 seconds threshold. Session terminated by unaccommodated security policy.', finalScore);
          return 0;
        }
        return prev - 1;
      });
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isLoggedIn, isLocked, transferSuccess]);

  // Trigger Account Lock
  const triggerAccountLock = (reason, score = 0.31) => {
    setIsLocked(true);
    setLockReason(reason);
    setLockScore(score);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);
    setSimulationMode(null);
  };

  // Handle Login Form
  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;
    setIsLoggedIn(true);
    setTimeRemaining(30);
    setTimeElapsed(0);
    setOtpRetries(0);
    setIsLocked(false);
    setRecaptchaScore(0.92);
    setRecaptchaStatus('HUMAN_VERIFIED');
  };

  // Handle Send Money Submit
  const handleTransfer = (e) => {
    e.preventDefault();
    if (isLocked) return;

    if (!recipient.trim() || !amount.trim()) {
      alert('Error: All required fields must be populated.');
      return;
    }

    // Check reCAPTCHA v3 score threshold (< 0.5 locks out)
    if (recaptchaScore < 0.5) {
      triggerAccountLock(`🚫 Flagged: Interaction risk score fell below 0.50 threshold (score: ${recaptchaScore.toFixed(2)})`, recaptchaScore);
      return;
    }

    // Check OTP
    if (otp !== actualOtp) {
      const newRetries = otpRetries + 1;
      setOtpRetries(newRetries);

      // Re-evaluate score with retry penalty
      const updatedScore = evaluateRecaptchaV3(0.2, newRetries, 0.6);
      setRecaptchaScore(updatedScore);

      if (newRetries >= 3 || updatedScore < 0.5) {
        triggerAccountLock(`🚫 Flagged: Excessive OTP verification retries (score: ${updatedScore.toFixed(2)} < 0.50)`, updatedScore);
      } else {
        setOtpErrorMessage(`Invalid OTP. Warning: Attempt ${newRetries} of 3. reCAPTCHA score dropped to ${updatedScore.toFixed(2)}.`);
      }
      return;
    }

    // Success
    setTransferSuccess(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // =========================================================================
  // DEV BUTTON 1: Simulate Tremor Input (Erratic, Jittery, Irregular Timing)
  // =========================================================================
  const triggerSimulateTremor = () => {
    if (isLocked) return;

    setSimulationMode('TREMOR');
    let step = 0;

    simulationIntervalRef.current = setInterval(() => {
      step++;

      // Gradually push jitterVariance HIGH, keystrokeRegularity LOW (random pauses, backspaces)
      if (step === 1) {
        setRecaptchaScore(0.64);
        setRecipient('S');
      } else if (step === 2) {
        setRecaptchaScore(0.52);
        setRecipient('Sa--r'); // backspace stutter
      } else if (step === 3) {
        setRecaptchaScore(0.43);
        setRecipient('Sarah Jenkins');
        setAmount('250.00');
        setOtp('839');
      } else if (step === 4) {
        setOtp('8399'); // mistype
        setOtpRetries(2);
        setRecaptchaScore(0.35);
      } else if (step >= 5) {
        clearInterval(simulationIntervalRef.current);
        const finalScore = 0.31;
        setRecaptchaScore(finalScore);
        setRecaptchaStatus('ERRATIC_FLAGGED');
        setOtp('839912');
        setOtpRetries(3);
        triggerAccountLock('🚫 Flagged: Erratic interaction pattern (score: 0.31)', finalScore);
      }
    }, 280);
  };

  // =========================================================================
  // DEV BUTTON 2: Simulate Bot Cursor (Perfect Straight Lines, Uniform 0ms Delays)
  // =========================================================================
  const triggerSimulateBotCursor = () => {
    if (isLocked) return;

    setSimulationMode('BOT');
    let step = 0;

    simulationIntervalRef.current = setInterval(() => {
      step++;

      // Perfectly straight programmatic vector and instant uniform 15ms typing
      if (step === 1) {
        setBotCursorPos({ x: 250, y: 180 });
        setRecipient('Sarah Jenkins');
        setRecaptchaScore(0.58);
      } else if (step === 2) {
        setBotCursorPos({ x: 250, y: 240 }); // exact straight vertical move (dx=0)
        setAmount('450.00');
        setRecaptchaScore(0.42);
      } else if (step === 3) {
        setBotCursorPos({ x: 250, y: 310 });
        setOtp('839201'); // instant perfect fill
        setRecaptchaScore(0.28);
      } else if (step >= 4) {
        clearInterval(simulationIntervalRef.current);
        const finalScore = 0.22;
        setRecaptchaScore(finalScore);
        setRecaptchaStatus('BOT_FLAGGED');
        triggerAccountLock('🚫 Flagged: Non-human interaction pattern (score: 0.22)', finalScore);
      }
    }, 250);
  };

  // Reset demo session
  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (simulationIntervalRef.current) clearInterval(simulationIntervalRef.current);

    setIsLoggedIn(false);
    setIsLocked(false);
    setLockReason('');
    setLockScore(null);
    setRecipient('');
    setAmount('');
    setOtp('');
    setOtpRetries(0);
    setOtpErrorMessage('');
    setTimeRemaining(30);
    setTimeElapsed(0);
    setSimulationMode(null);
    setTransferSuccess(false);
    setRecaptchaScore(0.92);
    setRecaptchaStatus('HUMAN_VERIFIED');
  };

  return (
    <div className="min-h-screen bg-[#ece9d8] font-bank text-black p-2 sm:p-4 text-xs relative overflow-hidden">
      
      {/* Visual Simulation Overlay: Tremor Jitter Badge */}
      {simulationMode === 'TREMOR' && (
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="simulated-cursor-jitter bg-amber-600 text-white px-4 py-2 rounded-2xl text-xs font-mono font-bold shadow-2xl border-2 border-yellow-300 flex items-center gap-2">
            <MousePointer className="w-4 h-4 text-yellow-300 animate-bounce" />
            <span>Simulating Tremor (High Jitter & Irregular Keystroke Pauses)</span>
          </div>
        </div>
      )}

      {/* Visual Simulation Overlay: Robotic Straight-Line Bot Cursor */}
      {simulationMode === 'BOT' && (
        <div 
          style={{ transform: `translate(${botCursorPos.x}px, ${botCursorPos.y}px)` }}
          className="fixed top-0 left-0 z-50 pointer-events-none transition-all duration-200 ease-linear"
        >
          <div className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold shadow-2xl border-2 border-white flex items-center gap-1.5">
            <Bot className="w-4 h-4 text-white animate-spin" />
            <span>Bot Script (Perfect Straight-Line Trajectory)</span>
          </div>
        </div>
      )}

      {/* Top Banner / Retro Header */}
      <div className="max-w-4xl mx-auto bg-white border border-[#7f9db9] shadow-md mb-3">
        <div className="bg-gradient-to-r from-[#003366] via-[#004080] to-[#002244] text-white p-2.5 flex items-center justify-between border-b border-[#001f3f]">
          <div className="flex items-center space-x-2">
            <Building className="w-5 h-5 text-amber-300" />
            <div>
              <h1 className="font-bold text-sm tracking-wide">FIRST NATIONAL TRUST BANK</h1>
              <p className="text-[10px] text-blue-200 uppercase tracking-wider">Online Commercial & Retail Banking System v4.18 (Legacy Security Gateway)</p>
            </div>
          </div>
          <div className="text-right text-[10px] text-blue-100 hidden sm:block">
            <div>Encrypted 128-Bit Session</div>
            <div className="text-amber-300 font-mono">SERVER: SVR-NY-PROD-09</div>
          </div>
        </div>

        {/* Sub-bar */}
        <div className="bg-[#f0f0f0] border-b border-[#d4d0c8] px-3 py-1.5 flex justify-between items-center text-[11px]">
          <span className="text-[#333]">
            {isLoggedIn ? `Authenticated User: ${username} | Account: 0049-1182-9920-X` : 'Security Status: Unauthenticated Guest Session'}
          </span>
          <span className="text-red-700 font-semibold flex items-center gap-1">
            <Lock className="w-3 h-3" /> Unprotected Legacy Gateway (Zero Accessibility Adaptation)
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto bg-white border border-[#7f9db9] shadow-md p-4 sm:p-6 relative">
        
        {/* Full-Screen Hostile Lockout Screen (Triggered when reCAPTCHA v3 Score < 0.50) */}
        {isLocked && (
          <div className="absolute inset-0 bg-red-950/95 text-white z-50 p-6 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="max-w-lg bg-red-900/90 border-4 border-red-500 p-6 shadow-2xl rounded-none text-left">
              <div className="flex items-center gap-3 border-b-2 border-red-500 pb-3 mb-4">
                <ShieldAlert className="w-10 h-10 text-yellow-300 shrink-0 animate-bounce" />
                <div>
                  <h2 className="text-lg font-black tracking-wider text-yellow-300 uppercase">
                    ⚠️ SUSPICIOUS ACTIVITY DETECTED
                  </h2>
                  <p className="text-xs text-red-200 font-bold uppercase">Google reCAPTCHA v3 Risk Defense Intercept</p>
                </div>
              </div>

              {/* Specific Reason & Score Tag */}
              <div className="bg-black/50 p-3.5 border border-red-700 font-mono text-xs mb-4">
                <span className="text-yellow-400 font-bold block mb-1">REASON FOR LOCKOUT:</span>
                <p className="text-white text-sm font-bold">{lockReason}</p>
                <div className="mt-2 text-[11px] text-red-300 flex items-center gap-2">
                  <span>Calculated Risk Score:</span>
                  <span className="bg-red-700 text-white px-2 py-0.5 font-bold rounded">
                    {lockScore !== null ? lockScore.toFixed(2) : '0.31'} (Threshold: 0.50)
                  </span>
                </div>
              </div>

              {/* Core Demo Insight Banner */}
              <div className="bg-yellow-400/15 border-l-4 border-yellow-400 p-3 text-[11px] text-yellow-100 mb-4 leading-relaxed">
                <strong>💡 The Naive reCAPTCHA v3 Paradox:</strong> Notice how this naive system flags <strong>BOTH extremes</strong> identically as fraud:
                <ul className="list-disc pl-4 mt-1 space-y-1 text-yellow-200">
                  <li><strong>Too Erratic (Tremor):</strong> Score drops to 0.31 &rarr; locked out</li>
                  <li><strong>Too Smooth / Fast (Bot):</strong> Score drops to 0.22 &rarr; locked out</li>
                </ul>
                Standard systems cannot distinguish a struggling disabled human from an attack script!
              </div>

              <div className="flex flex-wrap gap-2 justify-between items-center border-t border-red-800 pt-3">
                <span className="text-[10px] text-red-300 font-mono">ACTION REQUIRED: PHYSICAL BRANCH VISIT</span>
                <button
                  onClick={handleReset}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-4 py-2 text-xs uppercase flex items-center gap-1.5 shadow-md active:translate-y-0.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Demo Session
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Transfer Success Screen */}
        {transferSuccess && !isLocked && (
          <div className="bg-green-50 border-2 border-green-600 p-6 text-center mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-2" />
            <h2 className="text-base font-bold text-green-800 uppercase">Transfer Successfully Processed</h2>
            <p className="text-xs text-green-700 mt-1">Amount: ₹{amount} INR transferred to {recipient}.</p>
            <p className="text-[11px] text-gray-600 mt-2 font-mono">reCAPTCHA v3 Score: {recaptchaScore.toFixed(2)} (Passed &ge; 0.50)</p>
            <button
              onClick={handleReset}
              className="mt-4 retro-button px-4 py-1.5 text-xs font-semibold text-gray-800"
            >
              Start Another Transaction
            </button>
          </div>
        )}

        {/* View 1: Login Form */}
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto my-6 border border-[#7f9db9] bg-[#f9f9f9] p-5 shadow-inner">
            <div className="border-b border-[#c0c0c0] pb-2 mb-4">
              <h2 className="font-bold text-sm text-[#003366]">Internet Banking Sign-On</h2>
              <p className="text-[11px] text-gray-500">Please provide your authorized credentials to continue.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  User ID / Customer Number:
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-[#7f9db9] p-1.5 text-xs bg-white focus:bg-yellow-50 outline-none"
                  placeholder="e.g. jdoe8821"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">
                  Security Password / PIN:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-[#7f9db9] p-1.5 text-xs bg-white focus:bg-yellow-50 outline-none"
                  placeholder="••••••••"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 p-2 text-[10px] text-amber-900">
                <strong>Note:</strong> Press "Log In" to access the wire transfer portal.
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="retro-button px-4 py-1.5 text-xs font-bold text-black flex items-center gap-1"
                >
                  <span>Log In Securely</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* View 2: Send Money Wire Transfer Form */
          <div>
            {/* Account Summary Strip */}
            <div className="bg-[#f0f4f9] border border-[#b8cbe0] p-3 mb-4 flex flex-wrap justify-between items-center text-[11px]">
              <div>
                <span className="text-gray-500">Account Type:</span> <strong className="text-[#003366]">Premier Checking</strong>
                <span className="mx-2 text-gray-400">|</span>
                <span className="text-gray-500">Available Balance:</span> <strong className="text-green-800">₹48,210.00 INR</strong>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold border border-red-300">
                  <Clock className="w-3 h-3 mr-1 animate-spin" /> Session Timeout: {timeRemaining}s
                </span>
                <button
                  onClick={handleReset}
                  className="text-[10px] text-blue-800 underline hover:text-blue-950"
                >
                  Log Off
                </button>
              </div>
            </div>

            {/* LIVE reCAPTCHA v3 Score Screen Badge */}
            <div className={`p-2.5 mb-4 border flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono ${
              recaptchaScore >= 0.5 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                : 'bg-red-50 border-red-400 text-red-900 animate-pulse'
            }`}>
              <div className="flex items-center gap-2">
                {recaptchaScore >= 0.5 ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <ShieldX className="w-4 h-4 text-red-600 shrink-0" />
                )}
                <div>
                  <span>Google reCAPTCHA v3 Live Score: </span>
                  <strong className={`px-2 py-0.5 rounded text-xs ${
                    recaptchaScore >= 0.5 ? 'bg-emerald-200 text-emerald-950' : 'bg-red-600 text-white'
                  }`}>
                    {recaptchaScore.toFixed(2)}
                  </strong>
                  <span className="text-[10px] ml-2 text-gray-600">
                    (Threshold: 0.50 | 0.0=Bot, 1.0=Human)
                  </span>
                </div>
              </div>

              <div className="text-[10px] font-bold">
                {recaptchaScore >= 0.5 ? (
                  <span className="text-emerald-700">STATUS: HUMAN PASS ✅</span>
                ) : (
                  <span className="text-red-700">STATUS: FRAUD LOCK TRIGGERED 🛑</span>
                )}
              </div>
            </div>

            {/* Transfer Form */}
            <form onSubmit={handleTransfer} className="border border-[#d4d0c8] bg-[#fafafa] p-4 space-y-4">
              <div className="border-b border-[#e0e0e0] pb-2 font-bold text-sm text-[#003366] flex items-center justify-between">
                <span>Express Wire & Direct Funds Transfer</span>
                <span className="text-[10px] font-normal text-gray-500 font-mono">FORM: SEC-FT-0091</span>
              </div>

              {/* Recipient Name Field */}
              <div>
                <label className="block text-[11px] font-bold text-gray-800 mb-1">
                  {t('recipientLabel')} <span className="text-red-600">*</span>:
                </label>
                <input
                  type="text"
                  required
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder={t('recipientPlaceholder')}
                  className="w-full border border-[#7f9db9] p-1.5 text-xs bg-white focus:bg-yellow-50 outline-none"
                />
              </div>

              {/* Transfer Amount Field */}
              <div>
                <label className="block text-[11px] font-bold text-gray-800 mb-1">
                  {t('amountLabel')} <span className="text-red-600">*</span>:
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1.5 text-gray-700 font-bold font-sans">₹</span>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    max="480000"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={t('amountPlaceholder')}
                    className="w-full border border-[#7f9db9] pl-6 p-1.5 text-xs bg-white focus:bg-yellow-50 outline-none font-mono"
                  />
                </div>

                {/* Quick 4 Amount Preset Boxes for Dummy Bank */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 font-bold">Quick Presets:</span>
                  <div className="flex gap-1.5">
                    {['50', '100', '250', '500'].map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => setAmount(chip)}
                        className={`px-2.5 py-1 text-[11px] font-mono font-bold border transition-all ${
                          amount === chip 
                            ? 'bg-[#003366] text-white border-black shadow-inner' 
                            : 'retro-button text-[#003366] hover:bg-yellow-100'
                        }`}
                      >
                        +₹{chip}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* OTP Verification Field */}
              <div className="border-t border-[#e0e0e0] pt-3">
                <div className="bg-yellow-50 border border-yellow-200 p-2 mb-2 text-[10px] text-yellow-900 flex justify-between items-center">
                  <span>
                    🔑 {t('smsSimulatedNotice')} <strong className="font-mono text-xs bg-yellow-200 px-1 py-0.5 border border-yellow-400">{actualOtp}</strong>
                  </span>
                  <span className="text-red-700 font-bold">Attempts: {otpRetries} / 3</span>
                </div>

                <label className="block text-[11px] font-bold text-gray-800 mb-1">
                  {t('otpLabel')} <span className="text-red-600">*</span>:
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    setOtpErrorMessage('');
                  }}
                  placeholder={t('otpPlaceholder')}
                  className="w-48 border-2 border-[#7f9db9] p-1.5 text-sm font-mono tracking-widest text-center bg-white focus:bg-yellow-50 outline-none"
                />

                {otpErrorMessage && (
                  <p className="text-red-600 font-bold text-[10px] mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> {otpErrorMessage}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="border-t border-[#d4d0c8] pt-3 flex items-center justify-between">
                <div className="text-[10px] text-gray-500">
                  Strict timer: <span className="text-red-600 font-mono font-bold">{timeRemaining}s remaining</span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="retro-button px-3 py-1 text-xs text-gray-700"
                  >
                    {t('clearForm')}
                  </button>
                  <button
                    type="submit"
                    className="retro-button px-4 py-1 text-xs font-bold text-[#003366] hover:bg-[#d0d0d0]"
                  >
                    {t('submitTransfer')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
