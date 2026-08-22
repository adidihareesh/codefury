# Trust Layer — Accessibility-Aware Fraud Detection

**An inclusive security framework that prevents banking and government systems from mistakenly locking out users with motor tremors or cognitive disabilities.**

## The Problem
Modern digital banking and government portals rely heavily on behavioral biometrics (like reCAPTCHA v3) to detect fraud. These systems track mouse movements, typing speed, and form completion times to distinguish humans from bots. 

Unfortunately, this creates a severe **Disability-as-Fraud Paradox**: legitimate users with Parkinson's, essential tremors, or cognitive delays naturally exhibit erratic mouse movements, slow typing speeds, and require multiple OTP retries. Standard security algorithms mistakenly flag these genuine accessibility struggles as "bot-like" behavior or "account takeover" attempts, instantly locking disabled users out of their own finances and essential services.

Built for the **Accessibility & Inclusive Technology** hackathon theme, the Trust Layer solves this systemic exclusion.

## Our Solution
The Trust Layer introduces a dignity-first security paradigm that bridges the gap between high-stakes fraud prevention and inclusive design through three core components:

1. **Personal Interaction Baseline Calibration:** Instead of comparing a user against an arbitrary "average human" standard, the system measures the user's specific motor and cognitive profile during a low-stakes calibration phase (e.g., a simple target-clicking game).
2. **Adaptive Session Behavior:** The UI dynamically adjusts in real-time based on the user's struggles. If tremors are detected, touch targets enlarge, dwell-click (hover-to-click) activates, and session timeouts are automatically extended. 
3. **Signed Accessibility Trust Token:** The user's validated baseline is cryptographically signed into a temporary "Trust Token" (analogous to a cookie). When the user attempts a high-stakes action (like a UPI transfer), the banking backend consumes this token and temporarily lowers its behavioral fraud thresholds, effectively whitelisting the user's erratic movements as safe, verified accessibility needs rather than fraud.

## Key Features

**Adaptive UI & Tremor Mitigation**
* **Real-Time Jitter Tracking:** Analyzes cursor/touch trajectories to detect direction reversals and tremor likelihood.
* **Dwell-Click Activation:** Converts critical actions (like "Proceed to Pay") into dwell buttons that execute when hovered for a specified duration, eliminating the need for precise physical clicks.
* **Dynamic Timeouts:** Automatically extends session limits (up to a hard-capped 5 minutes) when struggle is detected, preventing abrupt logouts.

**Fraud Simulation Engine**
* **The "Victim Site" Dummy Bank:** A vulnerable mock banking portal that demonstrates standard aggressive fraud lockouts when subjected to simulated tremor inputs.
* **Simulated Bot vs. Tremor Inputs:** Interactive toggles to inject purely robotic cursors vs. simulated human tremors to demonstrate how the Trust Layer differentiates the two.

**Inclusive Financial Tools**
* **UPI-Style Payment Flow:** A complete mock transfer interface including a custom 4-digit PIN pad designed for large-target touch interaction.
* **Document Auto-Fill (OCR):** Privacy-first, browser-based document scanning (via Tesseract.js) that extracts Name, DOB, and ID from Aadhaar/Identity cards to minimize typing. Includes auto-rotation fallbacks.
* **QR Camera Scanner:** Multi-frame decoding tolerant to extreme camera shake.

**Saathi AI Assistant**
* A conversational alternative to rigid web forms. Users can complete transactions entirely through an intuitive, WhatsApp-style chat interface using text or Web Speech API voice input.

**Universal Accessibility Profiles**
* **Multi-Language Support:** Instant, live translation (English, Hindi, Kannada, Tamil) applied to UI text, speech synthesis, and voice recognition.
* **Cognitive Simplification:** A "Simplify Text" mode that rewrites complex banking jargon into plain language.
* **Visual Accommodations:** High contrast modes and comprehensive color blindness SVG filters (Deuteranopia, Tritanopia, Monochromacy).
* **Screen Reader Optimization:** Full ARIA compliance across all dynamic elements.

## Tech Stack
* **Frontend Framework:** React 18 (Vite)
* **Styling:** Tailwind CSS + Lucide React Icons
* **Optical Character Recognition:** Tesseract.js (Client-side WASM)
* **QR Decoding:** jsQR
* **Voice & Audio:** Native HTML5 Web Speech API (SpeechRecognition & SpeechSynthesis)
* **State Management:** React Context API & LocalStorage
* **Deployment:** Vercel (SPA Routing)

## Live Demo
**[INSERT VERCEL URL HERE]**

* **`/dummy-bank` (Victim Site):** Demonstrates the core problem. Try the "Simulate Tremor" button to see how standard systems instantly lock the user out.
* **`/trust-layer` (Solution):** The protected environment. Complete the Calibration phase, generate a Trust Token, and experience how the UI adapts to simulated tremors to allow the transaction to succeed.

## How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/adidihareesh/codefury.git
   cd codefury
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Open in browser:** Navigate to `http://localhost:5173`

## Why This Matters
True accessibility in fintech requires dignity. The Trust Layer never asks users to upload medical documents or "prove" their disability. It responds empathetically to their behavior in real-time. By separating "UI accommodations" from "high-stakes fraud prevention," we prove that digital systems can be simultaneously impenetrable to bots and radically welcoming to all humans.

## Future Scope
* **Additional Regional Languages:** Expanding the voice and translation engine to support Bengali, Telugu, and Marathi.
* **Govt ID Integration:** Optional deep-linking with DigiLocker or UDID (Unique Disability ID) for permanent backend whitelisting.
* **Caregiver Dashboard:** A delegated access tier for family members to monitor activity and set daily spending limits.
* **Sensory Accommodations:** Adding visual flash alerts for the hearing impaired, dyslexia-friendly fonts (OpenDyslexic), and a comprehensive "Calm Mode" muted color palette for users with autism or sensory processing sensitivities.
