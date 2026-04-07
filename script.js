const navItems = document.querySelectorAll(".nav-list-item");

navItems.forEach((item) => {
  item.addEventListener("click", function () {
    // 1. Önce hepsinden "active" sınıfını çıkar (Işıkları söndür)
    navItems.forEach((nav) => nav.classList.remove("active"));

    // 2. Sadece tıkladığına "active" sınıfını ekle (Seçileni yak)
    this.classList.add("active");
  });
});
