// Navigation
const screens = document.querySelectorAll(".screen");
const navButtons = document.querySelectorAll(".nav-btn");
const quickNavButtons = document.querySelectorAll("button[data-nav]");

function showScreen(id) {
  screens.forEach((s) => s.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add("active");
  }

  navButtons.forEach((btn) => {
    if (btn.getAttribute("data-nav") === id) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-nav");
    showScreen(target);
  });
});

quickNavButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-nav");
    if (target) {
      showScreen(target);
    }
  });
});

// Qur'an Plan
const planButtons = document.querySelectorAll("button[data-plan]");
const planTitle = document.getElementById("plan-title");
const planDescription = document.getElementById("plan-description");
const planList = document.getElementById("plan-list");
const planChecklist = document.getElementById("plan-checklist");

const plans = {
  30: { pages: 4 },
  15: { pages: 8 },
  12: { pages: 10 },
  10: { pages: 12 },
  6: { pages: 20 },
};

const prayers = ["Fajr", "Zuhr", "Asr", "Maghrib", "Isha"];

function loadPlan(days) {
  const plan = plans[days];
  if (!plan) return;

  planTitle.textContent = `Finish Qur'an in ${days} days`;
  planDescription.textContent = `Read ${plan.pages} pages at each prayer time.`;

  planList.innerHTML = "";
  planChecklist.innerHTML = "";

  prayers.forEach((p) => {
    const li = document.createElement("li");
    li.textContent = `${p}: ${plan.pages} pages`;
    planList.appendChild(li);

    const liCheck = document.createElement("li");
    liCheck.innerHTML = `<label><input type="checkbox" /> ${p}: ${plan.pages} pages completed</label>`;
    planChecklist.appendChild(liCheck);
  });

  localStorage.setItem("selectedPlanDays", String(days));
}

planButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const days = btn.getAttribute("data-plan");
    loadPlan(days);
  });
});

// Load last selected plan if available
const savedPlan = localStorage.getItem("selectedPlanDays");
if (savedPlan && plans[savedPlan]) {
  loadPlan(savedPlan);
}

// Reflection save
const refGood = document.getElementById("ref-good");
const refImprove = document.getElementById("ref-improve");
const refStartStop = document.getElementById("ref-start-stop");
const saveReflectionBtn = document.getElementById("save-reflection");
const reflectionStatus = document.getElementById("reflection-status");

function saveReflection() {
  const todayKey = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const data = {
    good: refGood.value,
    improve: refImprove.value,
    startStop: refStartStop.value,
  };
  localStorage.setItem(`reflection-${todayKey}`, JSON.stringify(data));
  reflectionStatus.textContent = "Reflection saved for today.";
  setTimeout(() => (reflectionStatus.textContent = ""), 3000);
}

function loadReflection() {
  const todayKey = new Date().toISOString().slice(0, 10);
  const dataStr = localStorage.getItem(`reflection-${todayKey}`);
  if (!dataStr) return;
  try {
    const data = JSON.parse(dataStr);
    refGood.value = data.good || "";
    refImprove.value = data.improve || "";
    refStartStop.value = data.startStop || "";
  } catch (e) {
    console.error(e);
  }
}

saveReflectionBtn.addEventListener("click", saveReflection);
loadReflection();

// Charity notes
const charityNotes = document.getElementById("charity-notes");
const saveCharityBtn = document.getElementById("save-charity");
const charityStatus = document.getElementById("charity-status");

function saveCharity() {
  localStorage.setItem("charity-notes", charityNotes.value);
  charityStatus.textContent = "Charity notes saved.";
  setTimeout(() => (charityStatus.textContent = ""), 3000);
}

function loadCharity() {
  const notes = localStorage.getItem("charity-notes");
  if (notes) {
    charityNotes.value = notes;
  }
}

saveCharityBtn.addEventListener("click", saveCharity);
loadCharity();

// Service worker registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("service-worker.js").catch(function (err) {
      console.log("Service worker registration failed:", err);
    });
  });
}