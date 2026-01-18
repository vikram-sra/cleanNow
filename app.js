// ===== CLEANNOW APP - MOOD-DRIVEN CHORE ASSISTANT =====

// ===== DEFAULT DATA DEFINITIONS =====
const DEFAULT_CHORES = [
    { id: 'dishes', name: 'Doing the Dishes', icon: '🍽️', priority: 3, energyRequired: 2, frequency: 1 },
    { id: 'laundry', name: 'Doing the Laundry', icon: '🧺', priority: 2, energyRequired: 3, frequency: 3 },
    { id: 'folding', name: 'Folding the Laundry', icon: '👕', priority: 2, energyRequired: 1, frequency: 3 },
    { id: 'sheets', name: 'Changing Sheets', icon: '🛏️', priority: 2, energyRequired: 3, frequency: 7 },
    { id: 'bathroom', name: 'Clean Bathroom', icon: '🚿', priority: 2, energyRequired: 4, frequency: 7 },
    { id: 'floor', name: 'Floor Broom & Mop', icon: '🧹', priority: 2, energyRequired: 4, frequency: 5 },
    { id: 'organize', name: 'Organize Room', icon: '📦', priority: 1, energyRequired: 3, frequency: 7 },
    { id: 'bills', name: 'Check Bills & Usage', icon: '📊', priority: 1, energyRequired: 1, frequency: 7 },
    { id: 'garbage', name: 'Take Out Garbage', icon: '🗑️', priority: 3, energyRequired: 1, frequency: 2 },
    { id: 'workstation', name: 'Workstation Management', icon: '💻', priority: 1, energyRequired: 2, frequency: 3 }
];

const DEFAULT_HOBBIES = [
    { id: 'reading', name: 'Reading a Book', icon: '📚' },
    { id: 'painting', name: 'Painting', icon: '🎨' },
    { id: 'show', name: 'Watching a Show', icon: '📺' },
    { id: 'dance', name: 'Practice Dance', icon: '💃' },
    { id: 'clay', name: 'Play with Clay', icon: '🏺' },
    { id: 'selfcare', name: 'Self-Care Time', icon: '🧖' },
    { id: 'friend', name: 'Talk to a Friend', icon: '📞' }
];

const CHORE_EMOJIS = ['🍽️', '🧺', '👕', '🛏️', '🚿', '🧹', '📦', '📊', '🗑️', '💻', '🧽', '🪣', '🧴', '🪥', '🧸', '✨'];
const HOBBY_EMOJIS = ['📚', '🎨', '📺', '💃', '🏺', '🧖', '📞', '🎮', '🎵', '🎸', '🧘', '☕', '🌱', '📷', '✍️', '🎭'];

// ===== STATE =====
let state = {
    // Profile
    avatar: '🌸',
    name: 'Sunshine',

    // Mood
    mood: 3,

    // Tasks
    focusChoreId: null,
    currentTask: null,
    taskStartTime: null,
    taskTimerInterval: null,

    // Stats
    choresCompleted: 0,
    totalTimeSpent: 0,
    streak: 0,
    lastActiveDate: null,

    // Data
    chores: [...DEFAULT_CHORES],
    hobbies: [...DEFAULT_HOBBIES],
    history: [],
    choreDates: {},

    // Modal state
    modalMode: null, // 'chore' or 'hobby'
    editingItemId: null,
    selectedEmoji: null,
    selectedPriority: 2,
    selectedEnergy: 3
};

// ===== DOM ELEMENTS =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initSparkles();
    initFloatingHearts();
    initMoodInputs();
    initEventListeners();
    updateGreeting();
    updateSliderFill();
    renderSuggestions();
    renderHistory();
    renderProfileStats();
    renderChoresList();
    renderHobbiesList();
    checkReminder();
    updateStreak();
    initTimeWeather();
});

// ===== SPARKLE BACKGROUND =====
function initSparkles() {
    const container = $('#sparkleBg');
    const sparkleCount = 40;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparkle.style.animationDuration = (1.5 + Math.random()) + 's';
        container.appendChild(sparkle);
    }
}

// ===== FLOATING HEARTS =====
function initFloatingHearts() {
    const container = $('#floatingHearts');
    const hearts = ['💕', '💖', '✨', '🌸', '💜', '🦋'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (6 + Math.random() * 4) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(heart);

        setTimeout(() => heart.remove(), 12000);
    }

    // Create initial hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 1000);
    }

    // Keep creating hearts
    setInterval(createHeart, 3000);
}

// ===== GREETING =====
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good morning!';

    if (hour >= 12 && hour < 17) greeting = 'Good afternoon!';
    else if (hour >= 17 && hour < 21) greeting = 'Good evening!';
    else if (hour >= 21 || hour < 5) greeting = 'Good night!';

    $('#greetingHello').textContent = greeting;
    $('#greetingAvatar').textContent = state.avatar;
    $('#streakCount').textContent = state.streak;

    // Update score dashboard
    updateScoreDashboard();
}

// ===== SCORE DASHBOARD =====
function updateScoreDashboard() {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    // Get start of week (Sunday)
    const dayOfWeek = now.getDay();
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek).getTime();

    // Count tasks done today
    const todayCount = state.history.filter(item => item.completedAt >= todayStart).length;

    // Count tasks done this week
    const weekCount = state.history.filter(item => item.completedAt >= weekStart).length;

    // Update display
    $('#todayScore').textContent = todayCount;
    $('#weeklyScore').textContent = `${weekCount}/10`;
    $('#totalScore').textContent = state.choresCompleted;
}

// ===== STREAK =====
function updateStreak() {
    const today = new Date().toDateString();
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    if (state.lastActiveDate) {
        const lastDate = new Date(state.lastActiveDate);
        lastDate.setHours(0, 0, 0, 0);

        const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            // Same day, streak unchanged
        } else if (diffDays === 1) {
            // Yesterday, streak continues (already incremented in completeTask)
        } else if (diffDays > 1) {
            // Streak broken - missed a day
            state.streak = 0;
        }
    } else {
        // First time using app
        state.streak = 0;
    }

    $('#streakCount').textContent = state.streak;
    saveState();
}

// ===== MOOD INPUTS =====
function initMoodInputs() {
    // Emoji buttons
    $$('.emoji-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.emoji-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.mood = parseInt(btn.dataset.mood);
            syncMoodInputs();
            renderSuggestions();
            saveState();
        });
    });

    // Energy slider
    $('#energySlider').addEventListener('input', (e) => {
        state.mood = parseInt(e.target.value);
        syncMoodInputs();
        updateSliderFill();
        renderSuggestions();
        saveState();
    });

    // Set initial state
    syncMoodInputs();
}

function syncMoodInputs() {
    // Sync emoji
    $$('.emoji-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.mood) === state.mood);
    });

    // Sync slider
    $('#energySlider').value = state.mood;
    updateSliderFill();
}

function updateSliderFill() {
    const slider = $('#energySlider');
    const fill = $('#sliderFill');
    const percent = ((slider.value - 1) / 4) * 100;
    fill.style.width = percent + '%';
}

// ===== EVENT LISTENERS =====
function initEventListeners() {
    // Profile panel
    $('#profileBtn').addEventListener('click', () => {
        $('#profilePanel').classList.remove('hidden');
        renderProfileStats();
        renderChoresList();
        renderHobbiesList();
    });

    $('#closeProfileBtn').addEventListener('click', () => {
        $('#profilePanel').classList.add('hidden');
    });

    // Avatar picker
    $('.change-avatar-btn').addEventListener('click', () => {
        $('#avatarOptions').classList.toggle('hidden');
    });

    $$('.avatar-option').forEach(btn => {
        btn.addEventListener('click', () => {
            state.avatar = btn.dataset.avatar;
            $('#currentAvatar').textContent = state.avatar;
            $('#greetingAvatar').textContent = state.avatar;
            $('#avatarOptions').classList.add('hidden');
            saveState();
        });
    });

    // Name input
    $('#nameInput').value = state.name;
    $('#nameInput').addEventListener('input', (e) => {
        state.name = e.target.value || 'Sunshine';
        $('#greetingName').textContent = state.name + ' ✨';
        saveState();
    });

    // History panel
    $('#historyBtn').addEventListener('click', () => {
        $('#historyPanel').classList.remove('hidden');
    });

    $('#closeHistoryBtn').addEventListener('click', () => {
        $('#historyPanel').classList.add('hidden');
    });

    // Focus mode
    $('#focusModeBtn').addEventListener('click', toggleFocusMode);
    $('#cancelFocusBtn').addEventListener('click', () => {
        $('#focusOverlay').classList.add('hidden');
    });

    // Task actions
    $('#completeTaskBtn').addEventListener('click', completeCurrentTask);
    $('#skipTaskBtn').addEventListener('click', skipCurrentTask);

    // Break
    $('#skipBreakBtn').addEventListener('click', () => {
        $('#breakSuggestion').classList.add('hidden');
    });

    // Reminder
    $('#reminderClose').addEventListener('click', () => {
        $('#reminder').classList.add('hidden');
    });

    // Add chore/hobby buttons
    $('#addChoreBtn').addEventListener('click', () => openAddModal('chore'));
    $('#addHobbyBtn').addEventListener('click', () => openAddModal('hobby'));

    // Modal
    $('#modalCancel').addEventListener('click', closeAddModal);
    $('#modalSave').addEventListener('click', saveNewItem);
}

// ===== PROFILE STATS =====
function renderProfileStats() {
    $('#currentAvatar').textContent = state.avatar;
    $('#nameInput').value = state.name;
    $('#totalCompleted').textContent = state.choresCompleted;
    $('#currentStreak').textContent = state.streak;

    const hours = Math.floor(state.totalTimeSpent / 3600000);
    const mins = Math.floor((state.totalTimeSpent % 3600000) / 60000);
    $('#totalTime').textContent = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

// ===== EDITABLE LISTS =====
function renderChoresList() {
    const container = $('#choresList');
    container.innerHTML = state.chores.map(chore => `
        <div class="editable-item" data-id="${chore.id}">
            <span class="item-icon">${chore.icon}</span>
            <span class="item-name">${chore.name}</span>
            <div class="item-actions">
                <button class="item-action-btn delete" data-id="${chore.id}" data-type="chore">🗑️</button>
            </div>
        </div>
    `).join('');

    // Add delete handlers
    container.querySelectorAll('.delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteItem(btn.dataset.id, 'chore');
        });
    });
}

function renderHobbiesList() {
    const container = $('#hobbiesList');
    container.innerHTML = state.hobbies.map(hobby => `
        <div class="editable-item" data-id="${hobby.id}">
            <span class="item-icon">${hobby.icon}</span>
            <span class="item-name">${hobby.name}</span>
            <div class="item-actions">
                <button class="item-action-btn delete" data-id="${hobby.id}" data-type="hobby">🗑️</button>
            </div>
        </div>
    `).join('');

    // Add delete handlers
    container.querySelectorAll('.delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteItem(btn.dataset.id, 'hobby');
        });
    });
}

function deleteItem(id, type) {
    if (type === 'chore') {
        state.chores = state.chores.filter(c => c.id !== id);
        renderChoresList();
        renderSuggestions();
    } else {
        state.hobbies = state.hobbies.filter(h => h.id !== id);
        renderHobbiesList();
    }
    saveState();
    showToast('Item deleted! 🗑️');
}

// ===== ADD/EDIT MODAL =====
function openAddModal(mode) {
    state.modalMode = mode;
    state.selectedEmoji = mode === 'chore' ? '✨' : '🌈';
    state.selectedPriority = 2;
    state.selectedEnergy = 3;

    $('#modalTitle').textContent = mode === 'chore' ? '🧹 Add New Chore' : '🌈 Add New Hobby';
    $('#itemNameInput').value = '';

    // Show/hide chore-specific options
    $('#priorityPicker').classList.toggle('hidden', mode !== 'chore');
    $('#energyPicker').classList.toggle('hidden', mode !== 'chore');

    // Render emoji grid
    const emojis = mode === 'chore' ? CHORE_EMOJIS : HOBBY_EMOJIS;
    $('#miniEmojiGrid').innerHTML = emojis.map(emoji => `
        <button class="mini-emoji-btn ${emoji === state.selectedEmoji ? 'active' : ''}" data-emoji="${emoji}">${emoji}</button>
    `).join('');

    // Add emoji click handlers
    $$('.mini-emoji-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.mini-emoji-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.selectedEmoji = btn.dataset.emoji;
        });
    });

    // Priority handlers
    $$('.priority-opt').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.priority) === state.selectedPriority);
        btn.addEventListener('click', () => {
            $$('.priority-opt').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.selectedPriority = parseInt(btn.dataset.priority);
        });
    });

    // Energy handlers
    $$('.energy-opt').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.energy) === state.selectedEnergy);
        btn.addEventListener('click', () => {
            $$('.energy-opt').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.selectedEnergy = parseInt(btn.dataset.energy);
        });
    });

    $('#addModal').classList.remove('hidden');
}

function closeAddModal() {
    $('#addModal').classList.add('hidden');
    state.modalMode = null;
}

function saveNewItem() {
    const name = $('#itemNameInput').value.trim();
    if (!name) {
        showToast('Please enter a name! 📝');
        return;
    }

    const id = name.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now();

    if (state.modalMode === 'chore') {
        state.chores.push({
            id,
            name,
            icon: state.selectedEmoji,
            priority: state.selectedPriority,
            energyRequired: state.selectedEnergy,
            frequency: 3
        });
        renderChoresList();
        renderSuggestions();
    } else {
        state.hobbies.push({
            id,
            name,
            icon: state.selectedEmoji
        });
        renderHobbiesList();
    }

    closeAddModal();
    saveState();
    showToast('Added successfully! ✨');
    triggerCelebration();
}

// ===== SUGGESTION ENGINE =====
function calculateChoreScore(chore) {
    const now = Date.now();
    const lastDone = state.choreDates[chore.id] || 0;
    const daysSinceDone = (now - lastDone) / (1000 * 60 * 60 * 24);

    // Skip if done in last 24h (unless high priority)
    if (daysSinceDone < 1 && chore.priority < 3) {
        return -1;
    }

    // Mood matching (40% weight)
    const energyMatch = 5 - Math.abs(state.mood - chore.energyRequired);
    const moodScore = (energyMatch / 5) * 40;

    // Priority (30% weight)
    const priorityScore = (chore.priority / 3) * 30;

    // Days since done vs frequency (30% weight)
    let urgencyScore = 0;
    if (chore.frequency > 0) {
        const overdue = daysSinceDone / chore.frequency;
        urgencyScore = Math.min(overdue, 2) * 15;
    }

    return moodScore + priorityScore + urgencyScore;
}

function getSuggestedChores() {
    if (state.focusChoreId) {
        const focusChore = state.chores.find(c => c.id === state.focusChoreId);
        return focusChore ? [focusChore] : [];
    }

    const scoredChores = state.chores.map(chore => ({
        ...chore,
        score: calculateChoreScore(chore)
    }))
        .filter(c => c.score >= 0)
        .sort((a, b) => b.score - a.score);

    return scoredChores.slice(0, 3);
}

function getPriorityClass(chore) {
    if (chore.priority === 3) return 'priority-high';
    if (chore.priority === 2) return 'priority-medium';
    return 'priority-low';
}

function getLastDoneText(choreId) {
    const lastDone = state.choreDates[choreId];
    if (!lastDone) return 'Never done';

    const days = Math.floor((Date.now() - lastDone) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
}

function renderSuggestions() {
    const container = $('#choreCards');
    const suggestions = getSuggestedChores();

    if (suggestions.length === 0) {
        container.innerHTML = `
            <div class="break-card">
                <span class="break-icon">🎉</span>
                <h3>All caught up!</h3>
                <p>You've done all your chores recently. Take a well-deserved break!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = suggestions.map((chore, index) => `
        <div class="chore-card ${getPriorityClass(chore)}" data-chore-id="${chore.id}" style="animation-delay: ${index * 0.1}s">
            <span class="chore-icon">${chore.icon}</span>
            <div class="chore-info">
                <div class="chore-name">${chore.name}</div>
                <div class="chore-meta">
                    <span class="chore-priority">
                        ${'⭐'.repeat(chore.priority)}
                    </span>
                    <span class="chore-last-done">${getLastDoneText(chore.id)}</span>
                </div>
            </div>
        </div>
    `).join('');

    $$('.chore-card').forEach(card => {
        card.addEventListener('click', () => startTask(card.dataset.choreId));
    });
}

// ===== TASK MANAGEMENT =====
function startTask(choreId) {
    const chore = state.chores.find(c => c.id === choreId);
    if (!chore) return;

    state.currentTask = chore;
    state.taskStartTime = Date.now();

    $('#currentTaskIcon').textContent = chore.icon;
    $('#currentTaskName').textContent = chore.name;
    $('#taskTimer').textContent = '00:00';

    $('#suggestionsSection').classList.add('hidden');
    $('#currentTaskSection').classList.remove('hidden');

    state.taskTimerInterval = setInterval(updateTaskTimer, 1000);

    saveState();
}

function updateTaskTimer() {
    if (!state.taskStartTime) return;

    const elapsed = Math.floor((Date.now() - state.taskStartTime) / 1000);
    const mins = Math.floor(elapsed / 60).toString().padStart(2, '0');
    const secs = (elapsed % 60).toString().padStart(2, '0');
    $('#taskTimer').textContent = `${mins}:${secs}`;
}

function completeCurrentTask() {
    if (!state.currentTask) return;

    const elapsed = Date.now() - state.taskStartTime;

    // Log to history
    const historyItem = {
        choreId: state.currentTask.id,
        name: state.currentTask.name,
        icon: state.currentTask.icon,
        completedAt: Date.now(),
        duration: elapsed
    };
    state.history.unshift(historyItem);

    // Update last done date
    state.choreDates[state.currentTask.id] = Date.now();

    // Update stats
    state.choresCompleted++;
    state.totalTimeSpent += elapsed;

    // Update streak
    const today = new Date().toDateString();
    if (state.lastActiveDate !== today) {
        state.streak++;
    }
    state.lastActiveDate = today;

    // Clear task
    clearCurrentTask();

    // Show celebration
    triggerCelebration();
    showToast('🎉 Amazing job! Task completed!');

    // Update UI
    updateGreeting();
    renderProfileStats();

    // Check if break is suggested (every 2 chores)
    if (state.choresCompleted % 2 === 0) {
        suggestBreak();
    } else {
        renderSuggestions();
    }

    renderHistory();
    saveState();
}

function skipCurrentTask() {
    clearCurrentTask();
    renderSuggestions();
}

function clearCurrentTask() {
    if (state.taskTimerInterval) {
        clearInterval(state.taskTimerInterval);
    }
    state.currentTask = null;
    state.taskStartTime = null;
    state.taskTimerInterval = null;

    $('#currentTaskSection').classList.add('hidden');
    $('#suggestionsSection').classList.remove('hidden');
}

// ===== BREAKS =====
function suggestBreak() {
    const activity = state.hobbies[Math.floor(Math.random() * state.hobbies.length)];
    if (activity) {
        $('#breakActivity').textContent = `${activity.icon} ${activity.name}`;
    }
    $('#breakSuggestion').classList.remove('hidden');
    $('#suggestionsSection').classList.remove('hidden');
    renderSuggestions();
}

// ===== FOCUS MODE =====
function toggleFocusMode() {
    const btn = $('#focusModeBtn');

    if (state.focusChoreId) {
        state.focusChoreId = null;
        btn.classList.remove('active');
        btn.innerHTML = '<span>🎯</span> Focus Mode';
        renderSuggestions();
        saveState();
        return;
    }

    renderFocusChoreList();
    $('#focusOverlay').classList.remove('hidden');
}

function renderFocusChoreList() {
    const container = $('#focusChoreList');

    container.innerHTML = state.chores.map(chore => `
        <div class="focus-chore-item" data-chore-id="${chore.id}">
            <span>${chore.icon}</span>
            <span>${chore.name}</span>
        </div>
    `).join('');

    $$('.focus-chore-item').forEach(item => {
        item.addEventListener('click', () => {
            state.focusChoreId = item.dataset.choreId;
            const chore = state.chores.find(c => c.id === state.focusChoreId);

            $('#focusModeBtn').classList.add('active');
            $('#focusModeBtn').innerHTML = `<span>🎯</span> Focus: ${chore.icon}`;
            $('#focusOverlay').classList.add('hidden');

            renderSuggestions();
            saveState();
        });
    });
}

// ===== HISTORY =====
function renderHistory() {
    const container = $('#historyList');

    if (state.history.length === 0) {
        container.innerHTML = '<div class="history-empty">No chores completed yet. Get started! 🦄</div>';
        return;
    }

    container.innerHTML = state.history.slice(0, 50).map((item, index) => `
        <div class="history-item" data-index="${index}">
            <span class="history-item-icon">${item.icon}</span>
            <div class="history-item-info">
                <div class="history-item-name">${item.name}</div>
                <div class="history-item-time">${formatTime(item.completedAt)}</div>
            </div>
            <div class="history-item-actions">
                <button class="history-redo-btn" data-index="${index}" title="Do again">🔁</button>
                <button class="history-delete-btn" data-index="${index}" title="Remove">🗑️</button>
            </div>
        </div>
    `).join('');

    // Add event listeners for redo buttons
    container.querySelectorAll('.history-redo-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            redoHistoryItem(parseInt(btn.dataset.index));
        });
    });

    // Add event listeners for delete buttons
    container.querySelectorAll('.history-delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteHistoryItem(parseInt(btn.dataset.index));
        });
    });
}

function redoHistoryItem(index) {
    const item = state.history[index];
    if (!item) return;

    // Reset the chore's last done date so it shows up in suggestions
    delete state.choreDates[item.choreId];

    // Close history panel
    $('#historyPanel').classList.add('hidden');

    saveState();
    renderSuggestions();
    showToast(`🔁 ${item.name} added back to tasks!`);
}

function deleteHistoryItem(index) {
    const item = state.history[index];
    if (!item) return;

    state.history.splice(index, 1);

    // Adjust stats
    if (state.choresCompleted > 0) state.choresCompleted--;
    state.totalTimeSpent -= item.duration || 0;
    if (state.totalTimeSpent < 0) state.totalTimeSpent = 0;

    saveState();
    renderHistory();
    renderProfileStats();
    showToast('🗑️ Removed from history');
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
}

// ===== CELEBRATION (ENHANCED FULL SCREEN) =====
const CELEBRATION_MESSAGES = [
    { emoji: '🎉', title: 'Amazing Job!', subtitle: "You're crushing it! ✨" },
    { emoji: '🦄', title: 'Magical!', subtitle: 'Look at you go! 🌟' },
    { emoji: '⭐', title: 'Superstar!', subtitle: 'Gold star for you! 💫' },
    { emoji: '🌈', title: 'Wonderful!', subtitle: 'You sparkle so bright! ✨' },
    { emoji: '💖', title: 'Fabulous!', subtitle: 'Keep shining, cutie! 🌸' },
    { emoji: '🏆', title: 'Champion!', subtitle: 'You did it beautifully! 💕' },
    { emoji: '🎀', title: 'So Proud!', subtitle: 'You deserve all the love! 💝' },
    { emoji: '✨', title: 'Incredible!', subtitle: "You're unstoppable! 🚀" }
];

function triggerCelebration() {
    const container = $('#confettiContainer');
    const starsContainer = $('#floatingStars');
    const celebration = $('#celebration');
    celebration.classList.remove('hidden');

    // Random celebration message
    const msg = CELEBRATION_MESSAGES[Math.floor(Math.random() * CELEBRATION_MESSAGES.length)];
    $('#celebrationEmoji').textContent = msg.emoji;
    $('#celebrationTitle').textContent = msg.title;
    $('#celebrationSubtitle').textContent = msg.subtitle;

    const colors = ['#ff6b9d', '#a855f7', '#22d3ee', '#fbbf24', '#22c55e', '#fda4af', '#c4b5fd', '#7dd3fc'];
    const shapes = ['❤️', '⭐', '✨', '💖', '🌟', '💕', '🦋', '🌸'];

    // More confetti for full-screen effect
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.8 + 's';
        confetti.style.animationDuration = (2.5 + Math.random() * 1.5) + 's';
        confetti.style.width = (8 + Math.random() * 10) + 'px';
        confetti.style.height = (8 + Math.random() * 10) + 'px';
        container.appendChild(confetti);
    }

    // Floating stars
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('span');
        star.className = 'floating-star';
        star.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 1 + 's';
        star.style.fontSize = (1.5 + Math.random() * 1.5) + 'rem';
        starsContainer.appendChild(star);
    }

    setTimeout(() => {
        celebration.classList.add('hidden');
        container.innerHTML = '';
        starsContainer.innerHTML = '';
    }, 4000);
}

// ===== NOTIFICATIONS =====
function showToast(message) {
    const toast = $('#toast');
    $('#toastMessage').textContent = message;
    toast.classList.remove('hidden');

    playNotificationSound();

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

function checkReminder() {
    const today = new Date().toDateString();
    const doneToday = state.history.some(h =>
        new Date(h.completedAt).toDateString() === today
    );

    const hour = new Date().getHours();
    if (!doneToday && hour >= 10 && hour < 22) {
        if (Math.random() < 0.3) {
            setTimeout(() => {
                showReminder("Time to sparkle! ✨ Let's do a quick chore!");
            }, 2000);
        }
    }
}

function showReminder(message) {
    $('#reminderMessage').textContent = message;
    $('#reminder').classList.remove('hidden');
    playNotificationSound();
}

function playNotificationSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 880;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.1;

        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) { }
}

// ===== PERSISTENCE =====
function saveState() {
    const toSave = {
        avatar: state.avatar,
        name: state.name,
        mood: state.mood,
        focusChoreId: state.focusChoreId,
        choresCompleted: state.choresCompleted,
        totalTimeSpent: state.totalTimeSpent,
        streak: state.streak,
        lastActiveDate: state.lastActiveDate,
        chores: state.chores,
        hobbies: state.hobbies,
        history: state.history.slice(0, 100),
        choreDates: state.choreDates
    };
    localStorage.setItem('cleannow_state', JSON.stringify(toSave));
}

function loadState() {
    try {
        const saved = localStorage.getItem('cleannow_state');
        if (saved) {
            const parsed = JSON.parse(saved);
            state.avatar = parsed.avatar || '🌸';
            state.name = parsed.name || 'Sunshine';
            state.mood = parsed.mood || 3;
            state.focusChoreId = parsed.focusChoreId || null;
            state.choresCompleted = parsed.choresCompleted || 0;
            state.totalTimeSpent = parsed.totalTimeSpent || 0;
            state.streak = parsed.streak || 0;
            state.lastActiveDate = parsed.lastActiveDate || null;
            state.chores = parsed.chores || [...DEFAULT_CHORES];
            state.hobbies = parsed.hobbies || [...DEFAULT_HOBBIES];
            state.history = parsed.history || [];
            state.choreDates = parsed.choreDates || {};

            if (state.focusChoreId) {
                const chore = state.chores.find(c => c.id === state.focusChoreId);
                if (chore) {
                    $('#focusModeBtn').classList.add('active');
                    $('#focusModeBtn').innerHTML = `<span>🎯</span> Focus: ${chore.icon}`;
                }
            }
        }
    } catch (e) {
        console.error('Failed to load state:', e);
    }
}

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('SW registered:', reg.scope))
            .catch(err => console.log('SW registration failed:', err));
    });
}
// ===== TIME DISPLAY =====
function initTimeWeather() {
    updateTime();
    setInterval(updateTime, 1000);
}

function updateTime() {
    const now = new Date();
    const timeOpts = { hour: 'numeric', minute: '2-digit', hour12: true };

    $('#currentTime').textContent = now.toLocaleTimeString('en-US', timeOpts);
}
