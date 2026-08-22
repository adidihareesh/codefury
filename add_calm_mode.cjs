const fs = require('fs');
const path = require('path');

// 1. AccessibilityContext.jsx
const ctxPath = path.join(__dirname, 'src/context/AccessibilityContext.jsx');
let ctxContent = fs.readFileSync(ctxPath, 'utf8');

if (!ctxContent.includes('isCalmMode')) {
  ctxContent = ctxContent.replace(
    "const [isSimplifyText, setIsSimplifyText] = useState(false);",
    "const [isSimplifyText, setIsSimplifyText] = useState(false);\n  const [isCalmMode, setIsCalmMode] = useState(false);"
  );

  ctxContent = ctxContent.replace(
    "isSimplifyText,\n        setIsSimplifyText,",
    "isSimplifyText,\n        setIsSimplifyText,\n        isCalmMode,\n        setIsCalmMode,"
  );
  
  ctxContent = ctxContent.replace(
    "${isSimplifyText ? 'simplify-text-mode' : ''}`}",
    "${isSimplifyText ? 'simplify-text-mode' : ''} ${isCalmMode ? 'calm-mode' : ''}`}"
  );
  
  // also add calm-mode into the prefs object if we look closely at where prefs are stored, but wait, TrustLayer handles accounts.
  fs.writeFileSync(ctxPath, ctxContent, 'utf8');
  console.log("Updated AccessibilityContext.jsx");
}

// 2. AccessibilityMenu.jsx
const menuPath = path.join(__dirname, 'src/components/AccessibilityMenu.jsx');
let menuContent = fs.readFileSync(menuPath, 'utf8');

if (!menuContent.includes('isCalmMode')) {
  menuContent = menuContent.replace(
    "isSimplifyText,",
    "isSimplifyText,\n    isCalmMode,\n    setIsCalmMode,"
  );

  menuContent = menuContent.replace(
    "language !== 'en' || colorBlindness !== 'none' || isHighContrast || isSimplifyText",
    "language !== 'en' || colorBlindness !== 'none' || isHighContrast || isSimplifyText || isCalmMode"
  );
  
  menuContent = menuContent.replace(
    "setIsHighContrast(false);\n    setIsSimplifyText(false);",
    "setIsHighContrast(false);\n    setIsSimplifyText(false);\n    setIsCalmMode(false);"
  );

  const calmModeToggle = `
              {/* 5. Sensory / Calm Mode Toggle */}
              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-200 flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-accent" />
                      <span>Reduced Sensory / Calm Mode</span>
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Muted color palette for sensory sensitivities
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsCalmMode(!isCalmMode)}
                    className={\`w-12 h-6 rounded-full transition-colors relative p-0.5 \${
                      isCalmMode ? 'bg-accent' : 'bg-slate-800'
                    }\`}
                  >
                    <div
                      className={\`w-5 h-5 rounded-full bg-white transition-transform \${
                        isCalmMode ? 'translate-x-6' : 'translate-x-0'
                      }\`}
                    />
                  </button>
                </div>
              </div>
  `;
  
  menuContent = menuContent.replace(
    "            </div>\n\n            {/* Footer Status & Reset */}",
    calmModeToggle + "\n            </div>\n\n            {/* Footer Status & Reset */}"
  );

  fs.writeFileSync(menuPath, menuContent, 'utf8');
  console.log("Updated AccessibilityMenu.jsx");
}

