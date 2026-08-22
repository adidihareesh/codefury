# Trust Layer — Accessibility-Aware Fraud Detection 🛡️

**A revolutionary, dignity-first security framework that prevents banking and government systems from mistakenly locking out users with motor tremors, cognitive disabilities, and neurodivergent profiles.**

---

##  The Problem: The Disability-as-Fraud Paradox
Modern digital banking and government portals rely heavily on behavioral biometrics (like reCAPTCHA v3) to detect fraud. These systems track mouse movements, typing speed, and form completion times to ruthlessly distinguish humans from bots. 

Unfortunately, this creates a devastating **Disability-as-Fraud Paradox**: legitimate users with Parkinson's, essential tremors, autism, or cognitive delays naturally exhibit erratic mouse movements, slow typing speeds, and require multiple OTP retries. Standard security algorithms mistakenly flag these genuine accessibility struggles as "bot-like" behavior or "account takeover" attempts, instantly locking disabled users out of their own finances and essential services.

Built to champion the **Accessibility & Inclusive Technology** hackathon theme, the Trust Layer completely obliterates this systemic exclusion.

---

## ✨ Our Solution: The Trust Layer
The Trust Layer introduces a groundbreaking security paradigm that bridges the gap between high-stakes fraud prevention and radically inclusive design through three core innovations:

1. **Personal Interaction Baseline Calibration:** Instead of comparing a user against an arbitrary, ableist "average human" standard, the system measures the user's specific motor and cognitive profile during a low-stakes, gamified calibration phase.
2. **Hyper-Adaptive Session Behavior:** The UI doesn't just sit there—it actively responds to the user's struggle in real-time. If multiple tremors are detected, touch targets enlarge, precise clicks are replaced with forgiving "hold-to-confirm" mechanics, and session timeouts dynamically expand.
3. **Signed Accessibility Trust Token:** The user's validated baseline is cryptographically signed into a temporary "Trust Token". When the user attempts a high-stakes action (like a UPI transfer), the banking backend consumes this token. It temporarily overrides aggressive behavioral fraud thresholds, effectively whitelisting the user's erratic movements as safe, verified accessibility needs rather than malicious fraud.

---

## 🚀 Glorified Feature Set

### 🧠 Real-Time Motor Adaptive UI (Tremor Mitigation)
* **Intelligent Jitter Tracking:** A bespoke algorithm continuously analyzes cursor and touch trajectories to detect direction reversals, velocity spikes, and tremor likelihood in real-time.
* **Hold-to-Confirm (Dwell-Click) Buttons:** Precision clicking is a nightmare for users with motor disabilities. We pioneered a robust **Hold-to-Confirm** mechanism where critical actions (like "Proceed to Pay" or "Confirm Pin") are executed simply by holding down the button for a calibrated duration, completely eliminating accidental double-clicks or misclicks.
* **Dynamic Auto-Extending Timeouts:** Typical banking sessions time out in 2 minutes, causing immense anxiety for users with cognitive delays or physical tremors. Our engine tracks real-time struggle—**if more than 2 distinct tremor signatures are logged, the session is instantly and automatically extended to a generous 5-minute hard cap**, giving the user the breathing room they deserve without compromising absolute security.

### 🎭 Neurodivergent & Sensory Accommodations
* **Autism-Friendly "Calm Mode":** A dedicated sensory-reduction mode that mutes harsh colors, disables flashing animations, and softens contrast to prevent sensory overload for autistic users.
* **Cognitive Simplification (Dyslexia/ADHD Support):** A revolutionary "Simplify Text" toggle that instantly translates dense, anxiety-inducing banking jargon into plain, highly legible, and direct language.
* **Comprehensive Color Blindness Engine:** Built-in, live SVG filtering that perfectly adjusts the entire application palette for Deuteranopia (green-blind), Tritanopia (blue-blind), and Monochromacy, ensuring critical success/error states are never conveyed by color alone.

### 🤖 Saathi: The Conversational AI Assistant
* Rigid web forms are inherently inaccessible. **Saathi** is our intelligent, WhatsApp-style chat assistant that allows users to complete complex UPI transfers conversationally.
* Integrated with the **Web Speech API**, users can bypass typing entirely, issuing voice commands to fill out forms and execute payments with zero physical friction.

### 📸 Zero-Friction Document Auto-Fill (OCR)
* A privacy-first, browser-based Optical Character Recognition (OCR) pipeline powered by **Tesseract.js**. 
* Users can simply drag-and-drop or snap a photo of their Aadhaar/ID card. The engine intelligently reads the document, handles auto-rotation for upside-down images, and instantly auto-fills their Name, Date of Birth, and ID Number—bypassing the need for grueling manual data entry.

### 🌐 Universal Localization
* Seamless, live UI translation across English, Hindi, Kannada, and Tamil. This localization extends deeply into the platform, automatically translating the Saathi AI responses, Web Speech synthesis prompts, and voice recognition models.


---

## 🛠️ Tech Stack
* **Frontend Framework:** React 18 (Vite) for blazing-fast rendering.
* **Styling & Animation:** Tailwind CSS & Lucide React Icons for a fluid, accessible UI.
* **Optical Character Recognition:** Tesseract.js (Client-side WASM) for secure, offline document parsing.
* **QR Decoding:** jsQR (multi-frame, shake-tolerant decoding).
* **Voice & Audio:** Native HTML5 Web Speech API (SpeechRecognition & SpeechSynthesis).
* **State Management:** React Context API & LocalStorage for persistent accessibility profiles.
* **Deployment:** Vercel (SPA Routing).

---

## 🌍 Live Demo
**[INSERT VERCEL URL HERE]**

* **`/trust-layer` (The Solution):** Step into the future of inclusive finance. Generate your baseline token, trigger a tremor, and watch the session dynamically extend, buttons transition to hold-to-confirm, and the transaction safely process.

---

## 💻 How to Run Locally

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

---

## 💖 Why This Matters
True accessibility in fintech demands absolute dignity. The Trust Layer never forces users to upload medical documents or humiliatingly "prove" their disability to a customer support agent. It responds empathetically to their natural behavior in real-time. By architecturally separating "UI accommodations" from "high-stakes fraud prevention," we have proven that digital security systems can be simultaneously impenetrable to malicious bots and radically welcoming to all human beings. 

This isn't just an accommodation—it is the baseline right to independent financial sovereignty.
