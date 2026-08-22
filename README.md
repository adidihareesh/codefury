# Accessibility Trust Layer - "Solving the Disability-as-Fraud Paradox"

## Problem Statement
Many financial institutions deploy rigid bot-detection algorithms (like reCAPTCHA) and velocity checks that flag sudden, jerky, or slow mouse movements as "fraudulent" or "bot-like." Unfortunately, this directly penalizes users with motor disabilities (e.g., Parkinson's, essential tremors, cerebral palsy). Their natural cursor jitter or slow typing speed often triggers account lockouts, forcing them into a "Disability-as-Fraud Paradox" where they must prove they aren't bots just to access their own money.

## Solution
The **Accessibility Trust Layer** acts as a secure, frontend middleware. By securely calibrating a user's unique motor signature, the system issues a **Trust Token** that bypasses standard hostile fraud-checks. Instead of locking the user out, the interface gracefully adapts in real-time—expanding button target areas, activating Dwell-Click mechanics, scaling the session timeout budget, and offering a multimodal conversational assistant ("Saathi") when struggle is detected.

## Features
- **Traditional Authentication**: LocalStorage-based mock accounts with persisting accessibility preferences.
- **Adaptive UI**: Real-time jitter tracking that auto-expands button targets and enables Dwell-Clicking to prevent misclicks.
- **Dynamic Time Budgets**: Session timeouts scale dynamically from 1 minute up to 5 minutes based on detected motor difficulty.
- **Saathi Conversational AI**: A fallback chat interface that breaks complex forms into single-step, natural language conversational prompts.
- **Multimodal Inputs**: Web Speech API integration for dictation, and Text-to-Speech read-aloud functionality across 4 regional languages (English, Hindi, Kannada, Tamil).
- **Accessibility Menu**: High-contrast mode, cognitive text simplification, and multiple color-blindness matrices (Protanopia, Deuteranopia, Tritanopia).

## Tech Stack
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS, Lucide React Icons
- **State Management**: React Context, LocalStorage
- **APIs**: Web Speech API (SpeechRecognition & SpeechSynthesis)
- **Deployment Structure**: Frontend-only, instantly executable for rapid testing.

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

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173`
