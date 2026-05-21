// 1. INITIALIZE SUPABASE
const SB_URL = "https://hcuxxzzsjlwjfyeqfrms.supabase.co";
const SB_KEY = "sb_publishable_aFVH549Vjhzm5gY6XETzoA_CUEq-Zqd";
const supabaseClient = supabase.createClient(SB_URL, SB_KEY);

// --- PREMIUM DARK/LIGHT SYSTEM ENHANCEMENT ---
window.onload = function() {
    initTheme();

    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) {
        toggleBtn.onclick = function() {
            toggleTheme();
        };
    }
};

function initTheme() {
    const savedTheme = localStorage.getItem('premiumTheme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('premiumTheme', newTheme);
    updateToggleIcon(newTheme);
}

function updateToggleIcon(theme) {
    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) {
        toggleBtn.innerText = theme === 'dark' ? '☀️' : '🌙';
    }
}
// --- END THEME CONTROLLER ---

// 2. VIEW CONTROLLER
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    document.getElementById(viewId).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 3. CHECK FOR LOGGED IN USER
function checkExistingUser() {
    const savedUser = localStorage.getItem('mergeUser');
    if (savedUser) {
        runPairingAlgorithm(JSON.parse(savedUser));
    } else {
        showView('onboarding');
    }
}

// 4. SAVE DATA TO CLOUD
async function saveToCloud() {
    const saveBtn = document.getElementById('saveBtn');
    saveBtn.innerText = "Searching for Matches...";
    saveBtn.disabled = true;

    const user = {
        full_name: document.getElementById('userName').value,
        phone: document.getElementById('userPhone').value,
        faculty: document.getElementById('userFaculty').value,
        dept: document.getElementById('userDept').value,
        gender: document.getElementById('userGender').value,
        level: document.getElementById('userLevel').value,
        pref_gender: document.getElementById('prefGender').value,
        role: document.getElementById('userRole').value,
        group_size: document.getElementById('groupSize').value,
        is_active: true
    };

    if(!user.faculty || !user.phone || !user.full_name) {
        alert("Please complete all profile inputs!");
        saveBtn.innerText = "Save & Find Partners ⚡";
        saveBtn.disabled = false;
        return;
    }

    const { error } = await supabaseClient.from('Bingham Merge').insert([user]);

    if (error) {
        console.error(error);
        alert("Cloud Error: " + error.message);
        saveBtn.innerText = "Try Again";
        saveBtn.disabled = false;
    } else {
        localStorage.setItem('mergeUser', JSON.stringify(user));
        runPairingAlgorithm(user);
    }
}

// 5. FETCH AND FILTER FROM CLOUD
async function runPairingAlgorithm(user) {
    showView('dashboard');
    document.getElementById('welcomeUser').innerText = `Matches for ${user.full_name.split(' ')[0]}`;

    const perfectList = document.getElementById('perfectMatches');
    const flexList = document.getElementById('flexMatches');
    const flexContainer = document.getElementById('flexMatchContainer');

    perfectList.innerHTML = `<p style="text-align:center; font-family:var(--font-heading); color:var(--primary); font-weight:700;">Querying cloud mesh...</p>`;
    flexList.innerHTML = "";

    const { data: allPeers, error } = await supabaseClient
        .from('Bingham Merge')
        .select('*')
        .ilike('faculty', user.faculty)
        .eq('level', user.level)
        .eq('is_active', true)
        .neq('phone', user.phone);

    if (error) {
        perfectList.innerHTML = `<p style="text-align:center; color:#ef4444; font-weight:700;">Network sync breakdown.</p>`;
        return;
    }

    if (!allPeers || allPeers.length === 0) {
        perfectList.innerHTML = "";
        document.getElementById('matchStatus').innerText = "You are the first Person here! Invite Your peers to Match up.";
        return;
    }

    const perfect = allPeers.filter(p => user.pref_gender === "Any" || user.pref_gender === "Any Gender" || user.pref_gender === p.gender);
    const flex = allPeers.filter(p => !perfect.includes(p));

    perfectList.innerHTML = "";
    if (perfect.length > 0) {
        document.getElementById('matchStatus').innerText = `${perfect.length} Partner(s) Found!`;
        perfect.forEach(m => {
            perfectList.innerHTML += createCard(m);
        });
    } else {
        document.getElementById('matchStatus').innerText = "${perfect.length} partners found!";
    }

    if (flex.length > 0) {
        flexContainer.classList.remove('hidden');
        flex.forEach(m => {
            flexList.innerHTML += createCard(m);
        });
    } else {
        flexContainer.classList.add('hidden');
    }
}

// 6. DEACTIVATE ACCOUNT
async function deactivateAccount() {
    const user = JSON.parse(localStorage.getItem('mergeUser'));
    if(!user) return;

    const { error } = await supabaseClient.from('Bingham Merge').update({ is_active: false }).eq('phone', user.phone);
    if(!error) {
        alert("Profile operational status: Hidden");
        location.reload();
    }
}

// 7. CLEAR LOCAL DATA
function clearData() {
    localStorage.removeItem('mergeUser');
    location.reload();
}

// 8. CREATE CARD UI
function createCard(m) {
    const cleanPhone = m.phone.startsWith('0') ? '234' + m.phone.substring(1) : m.phone;

    return `
        <div class="match-card">
            <div style="display:flex; justify-content:space-between; align-items:center; gap: 10px;">
                <span style="font-family:var(--font-heading); font-weight:700; font-size:1.15rem; color:var(--text); flex-grow:1;">${m.full_name}</span>
                <span class="status-badge">${m.role}</span>
            </div>

            <p style="color:var(--text-muted); font-size:0.85rem; margin:14px 0; font-weight:600;">
                ${m.gender} &bull; Level ${m.level} &bull; Dept: ${m.dept}
            </p>

            <div style="background:var(--input-bg); border:1px solid var(--input-border); padding:12px; border-radius:12px; margin-bottom:16px; font-size:0.9rem; color:var(--text); letter-spacing:0.03em;">
                📞 <strong style="margin-left:4px;">${m.phone}</strong>
            </div>

            <button class="whatsapp-btn" onclick="window.open('https://wa.me/${cleanPhone}?text=Hi ${encodeURIComponent(m.full_name)}, I matched with you on Merge! Let us study.','_blank')">
                Message On WhatsApp
            </button>
        </div>
    `;
}

