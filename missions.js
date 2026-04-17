// VARIABLES

const navItems = document.querySelectorAll(".nav__list-item");
const activeButton = document.getElementById("activeButton");
const completedButton = document.getElementById("completedButton");
const activeMissions = document.getElementById("activeMissions");
const completedMissions = document.getElementById("completedMissions");
const setTimeButton = document.getElementById("setTimeButton");
const calibrationBox = document.getElementById("calibrationBox");
const formElement = document.getElementById("formElement");
const timePickerButton = document.getElementById("timePickerButton");
const fieldsetContainer = document.getElementById("fieldsetContainer");
const addStepBtn = document.getElementById("addStepBtn");
const stepTemplate = document.getElementById("stepTemplate");
const breakdownList = document.getElementById("breakdownList");

// EVENT LISTENERS

let hedefButon = null;

// =========================================================
// 2. SAAT MOTORU
// =========================================================
let currentHour = 1;
let currentMinute = 15;

function updateDisplay() {
  let textHour = currentHour < 10 ? "0" + currentHour : currentHour;
  let textMinute = currentMinute < 10 ? "0" + currentMinute : currentMinute;

  document.getElementById("displayHour").textContent = textHour;
  document.getElementById("displayMinute").textContent = textMinute;
}

document.getElementById("btnHourUp").addEventListener("click", () => {
  currentHour = (currentHour + 1) % 24;
  updateDisplay();
});
document.getElementById("btnHourDown").addEventListener("click", () => {
  currentHour = (currentHour - 1 + 24) % 24;
  updateDisplay();
});
document.getElementById("btnMinuteUp").addEventListener("click", () => {
  currentMinute = (currentMinute + 5) % 60;
  updateDisplay();
});
document.getElementById("btnMinuteDown").addEventListener("click", () => {
  currentMinute = (currentMinute - 5 + 60) % 60;
  updateDisplay();
});

updateDisplay(); // Sayfa açılışında saat dolsun

// =========================================================
// 3. SAAT KUTUSUNU AÇMA (Event Delegation)
// =========================================================
fieldsetContainer.addEventListener("click", (event) => {
  // Senin HTML'indeki buton class'ı olan ".set-time" ı arıyoruz
  const tiklananButon = event.target.closest(".set-time");

  if (tiklananButon) {
    hedefButon = tiklananButon; // 1. Butonu hafızaya al
    calibrationBox.classList.remove("hidden"); // 2. Saat kutunu aç
    formElement.classList.add("hidden"); // 3. Formu gizle
  }
});

// =========================================================
// 4. SAATİ KAYDETME VE KUTUYU KAPATMA
// =========================================================
timePickerButton.addEventListener("click", () => {
  // 1. Dinamik Metin Oluşturucu (0'ları gizle)
  let finalTime = "";
  if (currentHour === 0 && currentMinute === 0) {
    finalTime = "00m";
  } else if (currentHour === 0) {
    finalTime = `${currentMinute}m`;
  } else if (currentMinute === 0) {
    finalTime = `${currentHour}h`;
  } else {
    finalTime = `${currentHour}h ${currentMinute}m`;
  }

  // 2. Hafızadaki butona yazdır (Senin butonun içindeki <span> etiketini bulup ona yazar)
  if (hedefButon) {
    const textSpan = hedefButon.querySelector("span"); // Resmin yanındaki yazıyı seçer
    if (textSpan) {
      textSpan.textContent = finalTime;
    } else {
      hedefButon.textContent = finalTime; // Span yoksa direkt butona yazar
    }
  }

  // 3. Senin saat kutunu kapat
  calibrationBox.classList.add("hidden");
  formElement.classList.remove("hidden");

  // 4. Asistanın hafızasını sıfırla
  hedefButon = null;
});

addStepBtn.addEventListener("click", () => {
  // 1. Şablonu klonla
  const newStepClone = template.content.cloneNode(true);

  // 2. Rakamı hesapla
  // Sadece numarası olanları sayıyoruz ki "Add" butonunu görev zannedip sayıyı bozmasın
  const currentStepCount =
    breakdownList.querySelectorAll(".list-item__number").length;
  const nextStepNumber = currentStepCount + 1;
  const formattedNumber = nextStepNumber.toString().padStart(2, "0");

  // 3. Klonlanan yapının içine bu yeni numarayı yaz
  newStepClone.querySelector(".list-item__number").textContent =
    formattedNumber;

  // 4. Mükemmel Ekleme (insertBefore)
  // breakdownList'in içine ekle, ama tam olarak "addStepContainer"ın ÜSTÜNE sıkıştır
  breakdownList.insertBefore(newStepClone, addStepBtn);
});
// FUNCTIONS

[activeButton, completedButton].forEach((button) => {
  button.addEventListener("click", (e) => {
    const isActive = e.target === activeButton;

    activeMissions.classList.toggle("hidden", !isActive);
    completedMissions.classList.toggle("hidden", isActive);

    activeButton.classList.toggle("btn--active", isActive);
    completedButton.classList.toggle("btn--active", !isActive);
  });
});

const ring = document.querySelector(".atomic-ring");
const newPercentage = 85; // Hedeflenen yeni yüzde

// Sadece bu iki satırla hem görseli hem de yazıyı güncellersin!
ring.style.setProperty("--val", newPercentage);
ring.textContent = `${newPercentage}%`;

const missionHeaders = document.querySelectorAll(".mission-header");

missionHeaders.forEach((header) => {
  header.addEventListener("click", function () {
    // Tıklanan başlığın ait olduğu "ana kartı" bul
    const card = this.closest(".mission-card");

    // Karta 'is-open' sınıfını ekle veya çıkar (Toggle)
    card.classList.toggle("is-open");
  });
});
