// script.js
/**
 * Typing Master Pro - Enterprise Engine Core orchestrator script
 * Architected with absolute zero third-party packages or runtime links.
 */

(function () {
    'use strict';

    // ==========================================
    // 1. APPLICATION ARCHITECTURAL STATE MATRIX
    // ==========================================
    let state = {
        currentView: 'home',
        testEngine: {
            isActive: false,
            hasStarted: false,
            duration: 15,
            timeLeft: 15,
            difficulty: 'easy',
            category: 'words',
            rawText: '',
            characterArray: [],
            pointerIndex: 0,
            validKeystrokes: 0,
            invalidKeystrokes: 0,
            errorCount: 0,
            timerReference: null,
            realtimeHistoryWPM: []
        },
        storyCampaign: {
            activeTrackNode: 0,
            activeChapterIdx: 0
        },
        userMetricsProfile: {
            bestWPM: 0.0,
            bestAccuracy: 0,
            totalTestsCompleted: 0,
            totalCharactersTyped: 0,
            totalTimePracticedSeconds: 0,
            historicalWpmRuns: [],
            keyboardErrorFrequencyMap: {}
        },
        achievementsUnlockedMatrix: [],
        dailyChallengeProgress: {
            currentDateString: '',
            testsCompletedToday: 0,
            charactersTypedToday: 0,
            targetGoalAchieved: false
        },
        systemPreferences: {
            theme: 'dark',
            audioFeedback: true,
            fontSizeRule: '1.75rem',
            kineticAnimations: true
        }
    };

    // Constant System Mappings Constants Data Objects
    const KEYBOARD_LAYOUT_MAP = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["z", "x", "c", "v", "b", "n", "m", "space"]
    ];

    const ACHIEVEMENT_DEFINITIONS_REGISTRY = [
        { id: 'first_run', title: 'System Initialization', desc: 'Complete your initial structural typing configuration pass.', icon: '⚡' },
        { id: 'tests_10', title: 'Data Pipeline Specialist', desc: 'Successfully log 10 system performance assessments.', icon: '💾' },
        { id: 'tests_50', title: 'Mainframe Standard', desc: 'Successfully log 50 system performance assessments.', icon: '📡' },
        { id: 'tests_100', title: 'Architect Status', desc: 'Successfully log 100 system performance assessments.', icon: '🎛️' },
        { id: 'speed_30', title: 'Sub-Light Navigation', desc: 'Register a calibrated operational speed over 30 WPM.', icon: '🛸' },
        { id: 'speed_50', title: 'Escape Velocity', desc: 'Register a calibrated operational speed over 50 WPM.', icon: '🚀' },
        { id: 'speed_75', title: 'Warp Factor Velocity', desc: 'Register a calibrated operational speed over 75 WPM.', icon: '🌌' },
        { id: 'speed_100', title: 'Quantum Singularity Speed', desc: 'Register a calibrated operational speed over 100 WPM.', icon: '🌀' },
        { id: 'acc_95', title: 'High Fidelity Tracking', desc: 'Complete an evaluation module with structural accuracy exceeding 95%.', icon: '🎯' },
        { id: 'acc_100', title: 'Absolute Zero Defect Matrix', desc: 'Log a flaw-free text array structure at 100% accuracy.', icon: '💎' },
        { id: 'story_1', title: 'Pluto Outpost Unlocked', desc: 'Complete Chapter 1 of the structural space flight narrative logs.', icon: '🪐' },
        { id: 'story_5', title: 'Forgotten Trip Complete', desc: 'Successfully process all encrypted data nodes across the campaign.', icon: '🎬' },
        { id: 'daily_done', title: 'Sector Directive Clear', desc: 'Successfully execute a calculated structural calendar quest target.', icon: '📅' }
    ];

    // ==========================================
    // 2. AUDIO SYNTHESIZER ENGINE (WEB AUDIO API)
    // ==========================================
    let audioContextInstance = null;

    function triggerProceduralSound(type) {
        if (!state.systemPreferences.audioFeedback) return;
        try {
            if (!audioContextInstance) {
                audioContextInstance = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioContextInstance.state === 'suspended') {
                audioContextInstance.resume();
            }

            const osc = audioContextInstance.createOscillator();
            const gainNode = audioContextInstance.createGain();
            osc.connect(gainNode);
            gainNode.connect(audioContextInstance.destination);

            const now = audioContextInstance.currentTime;

            switch (type) {
                case 'correct':
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(600, now);
                    gainNode.gain.setValueAtTime(0.08, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                    osc.start(now);
                    osc.stop(now + 0.05);
                    break;
                case 'incorrect':
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(140, now);
                    gainNode.gain.setValueAtTime(0.15, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
                    osc.start(now);
                    osc.stop(now + 0.12);
                    break;
                case 'achievement':
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(523.25, now); // C5
                    osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
                    osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
                    gainNode.gain.setValueAtTime(0.12, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
                    osc.start(now);
                    osc.stop(now + 0.4);
                    break;
                case 'complete':
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(440, now);
                    osc.frequency.setValueAtTime(880, now + 0.15);
                    gainNode.gain.setValueAtTime(0.1, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                    osc.start(now);
                    osc.stop(now + 0.35);
                    break;
            }
        } catch (e) {
            console.warn("Audio hardware context mapping failed initialization standard: ", e);
        }
    }

    // ==========================================
    // 3. PERSISTENT STORAGE CACHE INTERFACES
    // ==========================================
    function saveStateToLocalStorage() {
        localStorage.setItem('TYPING_MASTER_PRO_DATA_SYSTEM', JSON.stringify(state));
    }

    function loadStateFromLocalStorage() {
        const structuralDataBlob = localStorage.getItem('TYPING_MASTER_PRO_DATA_SYSTEM');
        if (structuralDataBlob) {
            try {
                const parsedState = JSON.parse(structuralDataBlob);
                // Recursive state assignment maps validation
                state.userMetricsProfile = { ...state.userMetricsProfile, ...parsedState.userMetricsProfile };
                state.achievementsUnlockedMatrix = parsedState.achievementsUnlockedMatrix || [];
                state.dailyChallengeProgress = { ...state.dailyChallengeProgress, ...parsedState.dailyChallengeProgress };
                state.systemPreferences = { ...state.systemPreferences, ...parsedState.systemPreferences };
                state.storyCampaign = { ...state.storyCampaign, ...parsedState.storyCampaign };
            } catch (err) {
                console.error("Local schema structure mismatch detected. Reverting cache models.");
            }
        }
        verifyDailyDirectiveCalendarCycle();
    }

    window.resetEngineData = function () {
        if (confirm("Execute analytical master reset operations? Stored profile statistics data structures will drop permanently.")) {
            localStorage.removeItem('TYPING_MASTER_PRO_DATA_SYSTEM');
            window.location.reload();
        }
    };

    // ==========================================
    // 4. REACTIVE CLIENT-SIDE SPA ROUTER ENGINE
    // ==========================================
    window.appRouter = function (targetViewID) {
        if (state.testEngine.isActive) {
            terminateTestEvaluationEngine();
        }

        state.currentView = targetViewID;
        
        // Dynamic navigation button state toggles
        document.querySelectorAll('.nav-btn').forEach(btn => {
            if (btn.getAttribute('data-target') === targetViewID) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Dynamic viewport state block mapping toggles
        document.querySelectorAll('.app-view').forEach(view => {
            if (view.id === `view-${targetViewID}`) {
                view.classList.add('active');
            } else {
                view.classList.remove('active');
            }
        });

        // Trigger individual viewport structural render cycles
        switch (targetViewID) {
            case 'home': renderDashboardViews(); break;
            case 'test': initializeStandardPracticeEngineView(); break;
            case 'story': renderStoryCampaignMatrix(); break;
            case 'stats': drawTelemetryAnalyticsDashboard(); break;
            case 'achievements': renderAchievementsCatalogGrid(); break;
            case 'leaderboard': processLeaderboardPopulationMatrix(); break;
            case 'settings': synchronizeSettingsFormMappingElements(); break;
        }

        // Auto Scroll to upper visibility frame bounds
        document.getElementById('main-scroll-frame').scrollTop = 0;
    };

    // ==========================================
    // 5. ACCESSIBLE SYSTEMS TOAST MESSAGE ENGINE
    // ==========================================
    function displaySystemToast(title, desc, layoutClass = 'toast-info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast-message ${layoutClass}`;
        toast.innerHTML = `<div><strong>${title}</strong><p style="font-size:0.8rem; margin-top:2px;">${desc}</p></div>`;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // ==========================================
    // 6. DAILY DIRECTIVE SYSTEM CHALLENGES INTERFACES
    // ==========================================
    function verifyDailyDirectiveCalendarCycle() {
        const currentDateStr = new Date().toISOString().split('T')[0];
        if (state.dailyChallengeProgress.currentDateString !== currentDateStr) {
            state.dailyChallengeProgress.currentDateString = currentDateStr;
            state.dailyChallengeProgress.testsCompletedToday = 0;
            state.dailyChallengeProgress.charactersTypedToday = 0;
            state.dailyChallengeProgress.targetGoalAchieved = false;
            saveStateToLocalStorage();
        }
    }

    function calculateActiveDailyChallengeParameters() {
        const dayInt = new Date().getDate();
        const modeSelector = dayInt % 4;
        
        switch (modeSelector) {
            case 0: return { type: 'tests', target: 3, title: 'Flight Operational Validation', desc: 'Execute 3 standard core structural evaluations to log baseline telemetry data sets.' };
            case 1: return { type: 'wpm', target: 50, title: 'Warp Threshold Calibration', desc: 'Break structural speeds over 50 Words Per Minute across any evaluation run.' };
            case 2: return { type: 'chars', target: 1000, title: 'Data Feed Synchronizer', desc: 'Process 1,000 structural algorithmic characters inside the interface terminal core array.' };
            default: return { type: 'accuracy', target: 95, title: 'Zero Defect Vector', desc: 'Secure an evaluation log showing overall semantic structural accuracy matching or exceeding 95%.' };
        }
    }

    function recordProgressToDailyDirective(type, value) {
        const challenge = calculateActiveDailyChallengeParameters();
        if (state.dailyChallengeProgress.targetGoalAchieved) return;

        if (challenge.type === 'tests' && type === 'test') state.dailyChallengeProgress.testsCompletedToday += value;
        if (challenge.type === 'chars' && type === 'char') state.dailyChallengeProgress.charactersTypedToday += value;
        if (challenge.type === 'wpm' && type === 'wpm' && value >= challenge.target) state.dailyChallengeProgress.targetGoalAchieved = true;
        if (challenge.type === 'accuracy' && type === 'accuracy' && value >= challenge.target) state.dailyChallengeProgress.targetGoalAchieved = true;

        // Linear parameter state bounds computations
        if (challenge.type === 'tests' && state.dailyChallengeProgress.testsCompletedToday >= challenge.target) state.dailyChallengeProgress.targetGoalAchieved = true;
        if (challenge.type === 'chars' && state.dailyChallengeProgress.charactersTypedToday >= challenge.target) state.dailyChallengeProgress.targetGoalAchieved = true;

        if (state.dailyChallengeProgress.targetGoalAchieved) {
            displaySystemToast('Sector Directive Clear', 'You completed today\'s automated network typing challenge directive tracking sequence.', 'toast-success');
            unlockTargetAchievementNode('daily_done');
        }
        saveStateToLocalStorage();
        evaluateSidebarNotificationBadgeStatus();
    }

    function evaluateSidebarNotificationBadgeStatus() {
        const badge = document.getElementById('sidebar-daily-badge');
        if (!badge) return;
        if (state.dailyChallengeProgress.targetGoalAchieved) {
            badge.className = "daily-badge completed";
            badge.innerHTML = `<span class="badge-dot" style="background-color:var(--success)"></span> Directive Verified`;
        } else {
            badge.className = "daily-badge pending";
            badge.innerHTML = `<span class="badge-dot" style="background-color:var(--warning)"></span> Daily Directive Pending`;
        }
    }

    // ==========================================
    // 7. CRYPTOGRAPHIC ACHIEVEMENT FRAMEWORK
    // ==========================================
    function unlockTargetAchievementNode(achievementID) {
        if (state.achievementsUnlockedMatrix.includes(achievementID)) return;
        
        state.achievementsUnlockedMatrix.push(achievementID);
        const meta = ACHIEVEMENT_DEFINITIONS_REGISTRY.find(a => a.id === achievementID);
        if (meta) {
            triggerProceduralSound('achievement');
            displaySystemToast(`Achievement Unlocked ${meta.icon}`, `${meta.title}: ${meta.desc}`, 'toast-success');
        }
        saveStateToLocalStorage();
    }

    // ==========================================
    // 8. PERSISTENT VIEWPORT ELEMENT DRAW ROUTINES
    // ==========================================
    function renderDashboardViews() {
        document.getElementById('dashboard-best-wpm').innerText = state.userMetricsProfile.bestWPM.toFixed(1);
        document.getElementById('dashboard-best-acc').innerText = `${state.userMetricsProfile.bestAccuracy}%`;
        document.getElementById('dashboard-total-tests').innerText = state.userMetricsProfile.totalTestsCompleted;

        const challenge = calculateActiveDailyChallengeParameters();
        document.getElementById('daily-title').innerText = challenge.title;
        document.getElementById('daily-desc').innerText = challenge.desc;

        let trackingPercent = 0;
        if (state.dailyChallengeProgress.targetGoalAchieved) {
            trackingPercent = 100;
        } else {
            if (challenge.type === 'tests') trackingPercent = (state.dailyChallengeProgress.testsCompletedToday / challenge.target) * 100;
            if (challenge.type === 'chars') trackingPercent = (state.dailyChallengeProgress.charactersTypedToday / challenge.target) * 100;
        }
        trackingPercent = Math.min(100, Math.max(0, trackingPercent));

        document.getElementById('daily-progress-bar').style.width = `${trackingPercent}%`;
        document.getElementById('daily-status-label').innerText = `${Math.floor(trackingPercent)}% Completed`;
        
        evaluateSidebarNotificationBadgeStatus();
    }

    function renderAchievementsCatalogGrid() {
        const grid = document.getElementById('achievements-render-grid');
        const countLabel = document.getElementById('achievement-unlocked-counter-lbl');
        if (!grid) return;

        grid.innerHTML = '';
        countLabel.innerText = `Unlocked Channels: ${state.achievementsUnlockedMatrix.length} / ${ACHIEVEMENT_DEFINITIONS_REGISTRY.length}`;

        ACHIEVEMENT_DEFINITIONS_REGISTRY.forEach(ach => {
            const isUnlocked = state.achievementsUnlockedMatrix.includes(ach.id);
            const card = document.createElement('div');
            card.className = `ach-card ${isUnlocked ? 'unlocked' : ''}`;
            card.innerHTML = `
                <div class="ach-icon">${ach.icon}</div>
                <div class="ach-meta">
                    <h5>${ach.title}</h5>
                    <p>${ach.desc}</p>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // ==========================================
    // 9. CORE RE-USABLE TYPING ENGINE IMPLEMENTATION
    // ==========================================
    function initializeStandardPracticeEngineView() {
        state.testEngine.isActive = true;
        state.testEngine.hasStarted = false;
        state.testEngine.pointerIndex = 0;
        state.testEngine.validKeystrokes = 0;
        state.testEngine.invalidKeystrokes = 0;
        state.testEngine.errorCount = 0;
        state.testEngine.realtimeHistoryWPM = [];
        state.testEngine.timeLeft = state.testEngine.duration;

        document.getElementById('live-timer').innerText = formatTimerEngineOutput(state.testEngine.timeLeft);
        document.getElementById('live-wpm').innerText = '0';
        document.getElementById('live-acc').innerText = '100%';
        document.getElementById('live-errors').innerText = '0';
        document.getElementById('test-results-panel').classList.add('hidden');
        
        assembleDynamicLexiconDataString();
        renderInterfaceTextDisplayBlocks();
        buildProceduralKeyboardLayoutComponent();

        const inputField = document.getElementById('hidden-writer');
        inputField.value = '';
        
        // Re-bind listeners down to global interface wrappers
        const focusWrap = document.getElementById('typing-box-focus-wrap');
        focusWrap.onclick = () => inputField.focus();
        
        inputField.oninput = handleDynamicInterfaceCharacterInput;
        inputField.onkeydown = function (e) {
            if (e.key === 'Backspace') {
                handleBackspaceOperations(e);
            } else {
                mapVirtualKeypressHighlightStates(e.key.toLowerCase(), true);
            }
        };
        inputField.onkeyup = function(e) {
            mapVirtualKeypressHighlightStates(e.key.toLowerCase(), false);
        };
        
        // Prevent generic structural cheating tactics
        inputField.onpaste = (e) => e.preventDefault();
        inputField.ondrop = (e) => e.preventDefault();
    }

    function assembleDynamicLexiconDataString() {
        const cat = state.testEngine.category;
        const diff = state.testEngine.difficulty;
        
        let poolSource = [];
        if (diff === 'easy' && window.EASY_TEXTS && window.EASY_TEXTS[cat]) poolSource = window.EASY_TEXTS[cat];
        else if (diff === 'medium' && window.MEDIUM_TEXTS && window.MEDIUM_TEXTS[cat]) poolSource = window.MEDIUM_TEXTS[cat];
        else if (diff === 'hard' && window.HARD_TEXTS && window.HARD_TEXTS[cat]) poolSource = window.HARD_TEXTS[cat];
        
        // Default fallbacks configuration patterns fallback
        if (!poolSource || poolSource.length === 0) {
            poolSource = window.EASY_TEXTS['words'];
        }

        if (cat === 'words') {
            let buildArr = [];
            for (let i = 0; i < 100; i++) {
                const randWord = poolSource[Math.floor(Math.random() * poolSource.length)];
                buildArr.push(randWord);
            }
            state.testEngine.rawText = buildArr.join(' ');
        } else {
            state.testEngine.rawText = poolSource[Math.floor(Math.random() * poolSource.length)];
        }
        
        state.testEngine.characterArray = state.testEngine.rawText.split('');
    }

    function renderInterfaceTextDisplayBlocks() {
        const pane = document.getElementById('text-display-pane');
        pane.innerHTML = '';
        
        // Apply configured system baseline scaling configurations dynamically
        pane.style.fontSize = state.systemPreferences.fontSizeRule;

        state.testEngine.characterArray.forEach((char, idx) => {
            const span = document.createElement('span');
            span.className = 'char-node';
            if (idx === 0) span.classList.add('current-cursor');
            // Retain absolute character mapping structures spaces transformation rendering visual tracking
            span.innerText = char;
            pane.appendChild(span);
        });
    }

    function handleDynamicInterfaceCharacterInput(event) {
        const engine = state.testEngine;
        if (!engine.isActive) return;

        if (!engine.hasStarted) {
            engine.hasStarted = true;
            engine.timerReference = setInterval(executeTimerCountdownIntervalPass, 1000);
        }

        const inputVal = event.target.value;
        if (inputVal.length === 0) return;

        const typedChar = inputVal.charAt(inputVal.length - 1);
        const targetChar = engine.characterArray[engine.pointerIndex];

        const charNodes = document.getElementById('text-display-pane').children;
        const currentActiveSpan = charNodes[engine.pointerIndex];

        if (typedChar === targetChar) {
            triggerProceduralSound('correct');
            if (currentActiveSpan) {
                currentActiveSpan.className = 'char-node correct';
            }
            engine.validKeystrokes++;
        } else {
            triggerProceduralSound('incorrect');
            if (currentActiveSpan) {
                currentActiveSpan.className = 'char-node incorrect';
            }
            engine.invalidKeystrokes++;
            engine.errorCount++;
            
            // Map character mistake vectors down inside persistent matrix logs
            if (targetChar && targetChar !== ' ') {
                const normalizedKey = targetChar.toLowerCase();
                state.userMetricsProfile.keyboardErrorFrequencyMap[normalizedKey] = 
                    (state.userMetricsProfile.keyboardErrorFrequencyMap[normalizedKey] || 0) + 1;
            }
        }

        // Shift structural cursors
        if (currentActiveSpan) currentActiveSpan.classList.remove('current-cursor');
        
        engine.pointerIndex++;
        
        if (engine.pointerIndex < engine.characterArray.length) {
            const nextActiveSpan = charNodes[engine.pointerIndex];
            if (nextActiveSpan) nextActiveSpan.classList.add('current-cursor');
            
            // Auto fluid scroll view adjustments calculations line steps tracking lines
            if (engine.pointerIndex % 20 === 0 && currentActiveSpan) {
                currentActiveSpan.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        calculateRealtimeLiveEngineTelemetry();

        // Check array end limits evaluation conditions
        if (engine.pointerIndex >= engine.characterArray.length) {
            terminateTestEvaluationEngine(true);
        }

        // Clear processing buffers
        event.target.value = '';
    }

    function handleBackspaceOperations(event) {
        const engine = state.testEngine;
        // Strict typing standard verification override prevents standard retro-correcting structural errors
        if (engine.pointerIndex === 0) return;

        const charNodes = document.getElementById('text-display-pane').children;
        
        // Remove present visual pointer locations configurations indicators
        if (charNodes[engine.pointerIndex]) {
            charNodes[engine.pointerIndex].classList.remove('current-cursor');
        }

        engine.pointerIndex--;
        
        const activeSpan = charNodes[engine.pointerIndex];
        if (activeSpan) {
            activeSpan.className = 'char-node current-cursor';
        }
        triggerProceduralSound('correct');
        calculateRealtimeLiveEngineTelemetry();
    }

    function calculateRealtimeLiveEngineTelemetry() {
        const engine = state.testEngine;
        const elapsedSecs = engine.duration - engine.timeLeft;
        if (elapsedSecs <= 0 && engine.pointerIndex === 0) return;

        const evaluatedTimeFraction = elapsedSecs > 0 ? (elapsedSecs / 60) : (1 / 60);
        
        // Standard baseline typing algorithmic velocity standard conversions formulas
        const grossWPM = (engine.validKeystrokes / 5) / evaluatedTimeFraction;
        const totalInputs = engine.validKeystrokes + engine.invalidKeystrokes;
        const accuracy = totalInputs > 0 ? Math.floor((engine.validKeystrokes / totalInputs) * 100) : 100;

        document.getElementById('live-wpm').innerText = Math.floor(grossWPM);
        document.getElementById('live-acc').innerText = `${accuracy}%`;
        document.getElementById('live-errors').innerText = engine.errorCount;
    }

    function executeTimerCountdownIntervalPass() {
        const engine = state.testEngine;
        engine.timeLeft--;
        
        document.getElementById('live-timer').innerText = formatTimerEngineOutput(engine.timeLeft);
        
        // Track snapshot speeds for vector parsing charts blocks
        const elapsed = engine.duration - engine.timeLeft;
        const timeFraction = elapsed > 0 ? (elapsed / 60) : (1 / 60);
        const runningWpm = (engine.validKeystrokes / 5) / timeFraction;
        engine.realtimeHistoryWPM.push({ second: elapsed, wpm: Math.floor(runningWpm) });

        if (engine.timeLeft <= 0) {
            terminateTestEvaluationEngine(true);
        }
    }

    function terminateTestEvaluationEngine(shouldProcessResults = false) {
        const engine = state.testEngine;
        engine.isActive = false;
        if (engine.timerReference) {
            clearInterval(engine.timerReference);
            engine.timerReference = null;
        }

        if (shouldProcessResults) {
            triggerProceduralSound('complete');
            compileFinalEvaluationReportMetrics();
        }
        
        // Remove runtime handler definitions configurations hooks listeners blocks safely
        const inputField = document.getElementById('hidden-writer');
        if (inputField) {
            inputField.oninput = null;
            inputField.onkeydown = null;
            inputField.onkeyup = null;
        }
    }

    function formatTimerEngineOutput(totalSecondsValue) {
        const mins = Math.floor(totalSecondsValue / 60);
        const secs = totalSecondsValue % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    // ==========================================
    // 10. DIAGNOSTICS REPORT COMPILATION
    // ==========================================
    function compileFinalEvaluationReportMetrics() {
        const engine = state.testEngine;
        const duration = engine.duration - engine.timeLeft;
        const structuralTimeFactor = duration > 0 ? (duration / 60) : (1 / 60);

        const netWPM = Math.max(0, ((engine.validKeystrokes - engine.errorCount) / 5) / structuralTimeFactor);
        const rawWPM = (engine.validKeystrokes / 5) / structuralTimeFactor;
        
        const totalInputs = engine.validKeystrokes + engine.invalidKeystrokes;
        const finalAccuracyPercent = totalInputs > 0 ? Math.floor((engine.validKeystrokes / totalInputs) * 100) : 100;

        // Apply typing grading algorithms matrix systems
        let grade = 'D';
        let feedbackStr = 'Synchronize mechanical keystroke pacing routines before executing subsequent speed tracks.';
        
        if (netWPM >= 100) { grade = 'S'; feedbackStr = 'Quantum matrix operational speed achieved. Precision pathways optimal.'; }
        else if (netWPM >= 80) { grade = 'A'; feedbackStr = 'Elite piloting velocity logged. Accuracy registers within clear specifications.'; }
        else if (netWPM >= 60) { grade = 'B'; feedbackStr = 'Sub-orbital speeds sustained. Target baseline operations cleared.'; }
        else if (netWPM >= 40) { grade = 'C'; feedbackStr = 'Atmospheric entry speed profile verified. Continue training protocols.'; }

        // Update structural state persistent profile entities structures properties references
        state.userMetricsProfile.totalTestsCompleted++;
        state.userMetricsProfile.totalCharactersTyped += engine.validKeystrokes;
        state.userMetricsProfile.totalTimePracticedSeconds += duration;
        
        if (netWPM > state.userMetricsProfile.bestWPM) state.userMetricsProfile.bestWPM = netWPM;
        if (finalAccuracyPercent > state.userMetricsProfile.bestAccuracy) state.userMetricsProfile.bestAccuracy = finalAccuracyPercent;

        state.userMetricsProfile.historicalWpmRuns.push({
            timestamp: Date.now(),
            wpm: Math.floor(netWPM),
            accuracy: finalAccuracyPercent
        });

        // Trigger milestone verification rules arrays routines
        evaluateSystemMilestoneMatrices(netWPM, finalAccuracyPercent);
        
        // Feed statistical pipelines updates
        recordProgressToDailyDirective('test', 1);
        recordProgressToDailyDirective('char', engine.validKeystrokes);
        recordProgressToDailyDirective('wpm', netWPM);
        recordProgressToDailyDirective('accuracy', finalAccuracyPercent);

        saveStateToLocalStorage();

        // Render fields results components nodes directly layout
        document.getElementById('res-grade-badge').innerText = grade;
        document.getElementById('res-wpm').innerText = Math.floor(netWPM);
        document.getElementById('res-raw').innerText = Math.floor(rawWPM);
        document.getElementById('res-acc').innerText = `${finalAccuracyPercent}%`;
        document.getElementById('res-errors').innerText = engine.errorCount;
        document.getElementById('res-good').innerText = engine.validKeystrokes;
        document.getElementById('res-bad').innerText = engine.invalidKeystrokes;
        document.getElementById('res-motivation').innerText = feedbackStr;

        document.getElementById('test-results-panel').classList.remove('hidden');
        document.getElementById('test-results-panel').scrollIntoView({ behavior: 'smooth' });

        // Map operational callback commands direct handlers onto elements bindings
        document.getElementById('btn-res-retry').onclick = () => initializeStandardPracticeEngineView();
        document.getElementById('btn-res-next').onclick = () => {
            assembleDynamicLexiconDataString();
            initializeStandardPracticeEngineView();
        };
    }

    function evaluateSystemMilestoneMatrices(finalWpm, finalAccuracy) {
        unlockTargetAchievementNode('first_run');
        
        const count = state.userMetricsProfile.totalTestsCompleted;
        if (count >= 10) unlockTargetAchievementNode('tests_10');
        if (count >= 50) unlockTargetAchievementNode('tests_50');
        if (count >= 100) unlockTargetAchievementNode('tests_100');

        if (finalWpm >= 100) unlockTargetAchievementNode('speed_100');
        else if (finalWpm >= 75) unlockTargetAchievementNode('speed_75');
        else if (finalWpm >= 50) unlockTargetAchievementNode('speed_50');
        else if (finalWpm >= 30) unlockTargetAchievementNode('speed_30');

        if (finalAccuracy === 100) unlockTargetAchievementNode('acc_100');
        else if (finalAccuracy >= 95) unlockTargetAchievementNode('acc_95');
    }

    // ==========================================
    // 11. KEYBOARD FREQUENCY HEATMAP COMPONENT
    // ==========================================
    function buildProceduralKeyboardLayoutComponent() {
        const wrap = document.getElementById('virtual-keyboard-matrix');
        if (!wrap) return;
        wrap.innerHTML = '';

        const maxErrorVal = Math.max(...Object.values(state.userMetricsProfile.keyboardErrorFrequencyMap), 1);

        KEYBOARD_LAYOUT_MAP.forEach(rowKeys => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'kb-row';
            
            rowKeys.forEach(key => {
                const keySpan = document.createElement('span');
                keySpan.className = `kb-key ${key === 'space' ? 'key-space' : ''}`;
                keySpan.id = `virtual-key-${key}`;
                keySpan.innerText = key === 'space' ? 'Space Bar' : key;

                // Color mapping mechanics interpolation based on mistake footprints frequencies values
                const currentErrorCount = state.userMetricsProfile.keyboardErrorFrequencyMap[key] || 0;
                if (currentErrorCount > 0) {
                    const ratio = currentErrorCount / maxErrorVal;
                    // Interpolate dynamic transparency parameters values using raw CSS engines calculations rules
                    keySpan.style.backgroundColor = `rgba(239, 68, 68, ${Math.min(0.8, ratio * 0.7) + 0.1})`;
                    keySpan.style.color = '#ffffff';
                }

                rowDiv.appendChild(keySpan);
            });
            wrap.appendChild(rowDiv);
        });
    }

    function mapVirtualKeypressHighlightStates(keyCharString, isPressedToggle) {
        let lookupString = keyCharString;
        if (lookupString === ' ') lookupString = 'space';
        
        const keyEl = document.getElementById(`virtual-key-${lookupString}`);
        if (keyEl) {
            if (isPressedToggle) keyEl.classList.add('active-press');
            else keyEl.classList.remove('active-press');
        }
    }

    // ==========================================
    // 12. STORY CAMPAIGN SECTOR TIMELINE TRACKS
    // ==========================================
    function renderStoryCampaignMatrix() {
        const track = document.getElementById('story-campaign-nodes-wrapper');
        if (!track) return;
        track.innerHTML = '';

        if (!window.HARD_TEXTS || !window.HARD_TEXTS.story) return;

        const storyTextsArr = window.HARD_TEXTS.story;

        for (let i = 0; i < 5; i++) {
            const isCompleted = state.storyCampaign.activeTrackNode > i;
            const isUnlocked = state.storyCampaign.activeTrackNode >= i;
            
            const card = document.createElement('div');
            card.className = `story-node-card ${isCompleted ? 'completed' : (isUnlocked ? 'unlocked' : 'locked')}`;
            
            let statusTag = `<span class="tag" style="background-color:var(--card-app); color:var(--text-muted)">Encrypted</span>`;
            if (isCompleted) statusTag = `<span class="tag" style="background-color:rgba(34,197,94,0.2); color:var(--success)">Decrypted</span>`;
            else if (isUnlocked) statusTag = `<span class="tag" style="background-color:rgba(59,130,246,0.2); color:var(--primary)">Available Array</span>`;

            card.innerHTML = `
                <div class="story-meta-node-header">
                    <h4>Sector Data Block: Chapter ${i + 1}</h4>
                    ${statusTag}
                </div>
                <p class="secondary-text mb-4" style="font-size:0.9rem; line-height:1.4;">
                    ${isUnlocked ? (storyTextsArr[i].substring(0, 160) + '...') : 'Access credentials denied. Resolve preceding systemic database nodes to allow extraction paths.'}
                </p>
                ${isUnlocked && !isCompleted ? `<button class="btn btn-primary" id="launch-story-node-btn-${i}">Initialize Decryption Pass</button>` : ''}
            `;
            
            track.appendChild(card);

            if (isUnlocked && !isCompleted) {
                document.getElementById(`launch-story-node-btn-${i}`).onclick = () => triggerStoryModeEvaluationTrack(i);
            }
        }
    }

    function triggerStoryModeEvaluationTrack(chapterIdx) {
        state.testEngine.isActive = true;
        state.testEngine.hasStarted = false;
        state.testEngine.pointerIndex = 0;
        state.testEngine.validKeystrokes = 0;
        state.testEngine.invalidKeystrokes = 0;
        state.testEngine.errorCount = 0;
        state.testEngine.realtimeHistoryWPM = [];
        // Allocate generous evaluation time windows for dense historical records paragraphs parsing blocks tracks updates
        state.testEngine.duration = 300; 
        state.testEngine.timeLeft = 300;
        state.testEngine.rawText = window.HARD_TEXTS.story[chapterIdx];
        state.testEngine.characterArray = state.testEngine.rawText.split('');

        window.appRouter('test');
        
        // Force replace contextual generation maps parameters overrides configurations blocks directly definitions values
        document.getElementById('live-timer').innerText = formatTimerEngineOutput(state.testEngine.timeLeft);
        renderInterfaceTextDisplayBlocks();
        buildProceduralKeyboardLayoutComponent();

        // High priority tracking hook context replacements functions redirection routines rules override parameters definitions values
        state.testEngine.timerReference = setInterval(executeTimerCountdownIntervalPass, 1000);
        state.testEngine.hasStarted = true;

        const originalFinalizer = terminateTestEvaluationEngine;
        terminateTestEvaluationEngine = function(shouldProcessResults) {
            // Re-route context interceptors down values evaluation chains targets loops rules parameters
            clearInterval(state.testEngine.timerReference);
            
            const totalInputs = state.testEngine.validKeystrokes + state.testEngine.invalidKeystrokes;
            const accuracy = totalInputs > 0 ? (state.testEngine.validKeystrokes / totalInputs) * 100 : 0;
            
            if (accuracy >= 90 && state.testEngine.pointerIndex >= state.testEngine.characterArray.length - 100) {
                if (state.storyCampaign.activeTrackNode === chapterIdx) {
                    state.storyCampaign.activeTrackNode++;
                }
                unlockTargetAchievementNode(`story_${chapterIdx + 1}`);
                if (state.storyCampaign.activeTrackNode === 5) {
                    unlockTargetAchievementNode('story_5');
                }
                saveStateToLocalStorage();
                displaySystemToast("Sector Node Decrypted", "Structural paragraph matrix integration successful. Core logs updated.", "toast-success");
            } else {
                displaySystemToast("Decryption Failure", "Accuracy fell below 90% parameters limit thresholds or text was left incomplete.", "toast-danger");
            }
            
            // Restore native configuration pointers paths directly loops maps blocks chains references targets definitions actions
            terminateTestEvaluationEngine = originalFinalizer;
            window.appRouter('story');
        };
    }

    // ==========================================
    // 13. CORE CANVAS RENDER GRAPHICS ENGINE
    // ==========================================
    function drawTelemetryAnalyticsDashboard() {
        const totalTyped = state.userMetricsProfile.totalCharactersTyped;
        const totalMinutes = state.userMetricsProfile.totalTimePracticedSeconds / 60;
        const runsArr = state.userMetricsProfile.historicalWpmRuns;

        document.getElementById('st-total-chars').innerText = totalTyped;
        document.getElementById('st-time-practiced').innerText = `${Math.ceil(totalMinutes)}m`;

        // Mathematical consistency matrix scaling formula derivations
        let consistency = 100;
        if (runsArr.length > 1) {
            let varianceSum = 0;
            const avg = runsArr.reduce((acc, r) => acc + r.wpm, 0) / runsArr.length;
            runsArr.forEach(r => varianceSum += Math.abs(r.wpm - avg));
            const meanDev = varianceSum / runsArr.length;
            consistency = Math.max(10, Math.floor(100 - (meanDev * 1.5)));
        }
        document.getElementById('st-consistency').innerText = `${consistency}%`;

        // Render pure canvas hardware-accelerated vector graph calculations layouts rules
        const canvas = document.getElementById('canvas-analytics-graph');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        ctx.clearRect(0, 0, rect.width, rect.height);

        if (runsArr.length === 0) {
            ctx.fillStyle = '#94a3b8';
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Mainframe diagnostic tracking history database context logs completely blank.', rect.width / 2, rect.height / 2);
            return;
        }

        // Draw Line Matrix Vector Operations Lines Paths Curves Structs Mappings Coordinates Loops
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.beginPath();

        const padding = 40;
        const graphW = rect.width - padding * 2;
        const graphH = rect.height - padding * 2;

        const maxWpmVal = Math.max(...runsArr.map(r => r.wpm), 60);

        runsArr.forEach((run, index) => {
            const x = padding + (index / Math.max(1, runsArr.length - 1)) * graphW;
            const y = padding + graphH - (run.wpm / maxWpmVal) * graphH;
            
            if (index === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);

            // Draw micro point nodes maps markers positions vectors
            ctx.fillStyle = '#22c55e';
            ctx.fillRect(x - 3, y - 3, 6, 6);
        });
        ctx.stroke();
    }

    // ==========================================
    // 14. GLOBAL LEADERBOARD GENERATION ENGINE
    // ==========================================
    let cachedLeaderboardSimArray = [];

    function processLeaderboardPopulationMatrix() {
        const tbody = document.getElementById('leaderboard-data-rows');
        if (!tbody) return;

        if (cachedLeaderboardSimArray.length === 0) {
            const identifiers = ['Kira', 'Vance', 'Alpha_9', 'Solaris', 'Nebula', 'ByteMe', 'WarpPilot', 'NovaChar', 'LinusX', 'Ada_Core', 'TechGod', 'ShadowType'];
            for (let i = 0; i < 60; i++) {
                const idStr = identifiers[Math.floor(Math.random() * identifiers.length)] + Math.floor(Math.random() * 900 + 100);
                const baselineWpm = Math.floor(Math.random() * 75 + 35);
                const accuracyRating = Math.floor(Math.random() * 12 + 88);
                const testCount = Math.floor(Math.random() * 40 + 5);
                cachedLeaderboardSimArray.push({ user: idStr, wpm: baselineWpm, acc: accuracyRating, tests: testCount });
            }
        }

        // Inject active player record profile into structural ranking blocks context lists maps loops
        const currentPlRecord = {
            user: 'You (Current Pilot Profile Channel)',
            wpm: Math.floor(state.userMetricsProfile.bestWPM),
            acc: state.userMetricsProfile.bestAccuracy,
            tests: state.userMetricsProfile.totalTestsCompleted,
            isPlayer: true
        };

        // Remove existing duplicate registrations inside tracking stacks definitions values lists maps loops targets
        const filteredArray = cachedLeaderboardSimArray.filter(item => item.isPlayer !== true);
        filteredArray.push(currentPlRecord);

        // Perform programmatic linear descending matrix velocity array sort operations
        filteredArray.sort((a, b) => b.wpm - a.wpm);

        renderLeaderboardRowsMarkupBlocks(filteredArray);

        // Bind interactive filter keys operations definitions configurations fields loops fields elements hooks
        document.getElementById('leaderboard-search-input').oninput = function(e) {
            const query = e.target.value.toLowerCase();
            const matchingRows = filteredArray.filter(r => r.user.toLowerCase().includes(query));
            renderLeaderboardRowsMarkupBlocks(matchingRows);
        };
    }

    function renderLeaderboardRowsMarkupBlocks(dataRecordsSourceArray) {
        const tbody = document.getElementById('leaderboard-data-rows');
        tbody.innerHTML = '';

        dataRecordsSourceArray.forEach((row, idx) => {
            const tr = document.createElement('tr');
            if (row.isPlayer) tr.style.backgroundColor = 'rgba(59,130,246,0.1)';
            
            let rankClass = '';
            if (idx === 0) rankClass = 'rank-pill rank-1';
            else if (idx === 1) rankClass = 'rank-pill rank-2';
            else if (idx === 2) rankClass = 'rank-pill rank-3';

            tr.innerHTML = `
                <td><span class="${rankClass}">${idx + 1}</span></td>
                <td><strong>${row.user}</strong></td>
                <td class="font-mono">${row.wpm} WPM</td>
                <td class="font-mono">${row.acc}%</td>
                <td>${row.tests} runs</td>
            `;
            tbody.appendChild(tr);
        });
    }

    // ==========================================
    // 15. MAIN ENGINE PARAMETERS INITIALIZER BINDINGS
    // ==========================================
    function synchronizeSettingsFormMappingElements() {
        document.getElementById('set-audio-toggle').checked = state.systemPreferences.audioFeedback;
        document.getElementById('set-animation-toggle').checked = state.systemPreferences.kineticAnimations;

        document.querySelectorAll('#set-font-size .segment-btn').forEach(btn => {
            if (btn.getAttribute('data-value') === state.systemPreferences.fontSizeRule) btn.classList.add('active');
            else btn.classList.remove('active');
        });

        document.querySelectorAll('#set-theme .segment-btn').forEach(btn => {
            if (btn.getAttribute('data-value') === state.systemPreferences.theme) btn.classList.add('active');
            else btn.classList.remove('active');
        });
    }

    function bindSegmentedControlsHookEventInterceptors() {
        // UI Navigation Setup Bindings Loops Elements Operations Framework Configurations Hooks Hooks
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.onclick = () => window.appRouter(btn.getAttribute('data-target'));
        });

        // Typing Engine Setup Segment Filters Hooks Event Interceptors Binds Routing Paths Layout Maps Definitions
        document.querySelectorAll('#control-time .segment-btn').forEach(b => {
            b.onclick = (e) => {
                document.querySelectorAll('#control-time .segment-btn').forEach(s => s.classList.remove('active'));
                b.classList.add('active');
                state.testEngine.duration = parseInt(b.getAttribute('data-value'));
                initializeStandardPracticeEngineView();
            };
        });

        document.querySelectorAll('#control-difficulty .segment-btn').forEach(b => {
            b.onclick = (e) => {
                document.querySelectorAll('#control-difficulty .segment-btn').forEach(s => s.classList.remove('active'));
                b.classList.add('active');
                state.testEngine.difficulty = b.getAttribute('data-value');
                initializeStandardPracticeEngineView();
            };
        });

        document.querySelectorAll('#control-category .segment-btn').forEach(b => {
            b.onclick = (e) => {
                document.querySelectorAll('#control-category .segment-btn').forEach(s => s.classList.remove('active'));
                b.classList.add('active');
                state.testEngine.category = b.getAttribute('data-value');
                initializeStandardPracticeEngineView();
            };
        });

        // Interface System Form Configuration Rules Modification Triggers
        document.getElementById('set-audio-toggle').onchange = (e) => {
            state.systemPreferences.audioFeedback = e.target.checked;
            saveStateToLocalStorage();
        };

        document.getElementById('set-animation-toggle').onchange = (e) => {
            state.systemPreferences.kineticAnimations = e.target.checked;
            saveStateToLocalStorage();
        };

        document.querySelectorAll('#set-font-size .segment-btn').forEach(b => {
            b.onclick = () => {
                document.querySelectorAll('#set-font-size .segment-btn').forEach(s => s.classList.remove('active'));
                b.classList.add('active');
                state.systemPreferences.fontSizeRule = b.getAttribute('data-value');
                saveStateToLocalStorage();
            };
        });

        document.querySelectorAll('#set-theme .segment-btn').forEach(b => {
            b.onclick = () => {
                document.querySelectorAll('#set-theme .segment-btn').forEach(s => s.classList.remove('active'));
                b.classList.add('active');
                const themeVal = b.getAttribute('data-value');
                state.systemPreferences.theme = themeVal;
                document.documentElement.setAttribute('data-theme', themeVal);
                saveStateToLocalStorage();
            };
        });
    }

    // Entry point initialization context runtime trigger bounds hooks lifecycle
    window.onload = function () {
        loadStateFromLocalStorage();
        bindSegmentedControlsHookEventInterceptors();
        
        // Push current configuration parameters definitions values onto system layout profiles tags components root elements
        document.documentElement.setAttribute('data-theme', state.systemPreferences.theme);
        
        window.appRouter('home');
    };

})();