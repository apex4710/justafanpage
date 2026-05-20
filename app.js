document.addEventListener("DOMContentLoaded", function () {
  // ── App deep-link opener ───────────────────────────────────────
  const links = document.querySelectorAll(".link-card");

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const app = this.getAttribute("data-app");
      const webUrl = this.getAttribute("href");
      const ua = navigator.userAgent || navigator.vendor || window.opera;
      let appUrlScheme;

      switch (app) {
        case "youtube":
          appUrlScheme = "vnd.youtube://www.youtube.com/@justafan1017";
          break;
        case "instagram":
          appUrlScheme = "instagram://user?username=justafanofficialig";
          break;
        case "twitter":
          appUrlScheme = "twitter://user?screen_name=JustAFan1017";
          break;
        default:
          appUrlScheme = webUrl;
      }

      function openApp() {
        window.location = appUrlScheme;
        setTimeout(() => window.open(webUrl, "_blank"), 1500);
      }

      if (/android/i.test(ua)) {
        openApp();
      } else if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
        openApp();
      } else {
        window.open(webUrl, "_blank");
      }
    });
  });

  // ── Logo spin on click ─────────────────────────────────────────
  const profilePic = document.querySelector(".profile-pic");
  if (profilePic) {
    profilePic.addEventListener("click", function () {
      if (this.classList.contains("spin-once")) return;
      this.classList.add("spin-once");
      this.addEventListener(
        "animationend",
        () => {
          this.classList.remove("spin-once");
        },
        { once: true },
      );
    });
  }

  // ── Custom cursor ──────────────────────────────────────────────
  const dot = document.getElementById("cursor-dot");
  const trail = document.getElementById("cursor-trail");

  // Only run on non-touch devices
  if (window.matchMedia("(hover: hover)").matches && dot && trail) {
    let mouseX = 0,
      mouseY = 0; // real mouse position
    let trailX = 0,
      trailY = 0; // lagging trail position

    // Move the sharp dot instantly
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    });

    // Lerp the trail smoothly behind
    (function animateTrail() {
      trailX += (mouseX - trailX) * 0.12;
      trailY += (mouseY - trailY) * 0.12;
      trail.style.left = trailX + "px";
      trail.style.top = trailY + "px";
      requestAnimationFrame(animateTrail);
    })();

    // Grow trail when hovering links/buttons
    const interactiveEls = document.querySelectorAll(
      "a, button, label, .profile-pic",
    );
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        trail.style.transform = "translate(-50%, -50%) scale(1.7)";
        trail.style.borderColor = "rgba(177,157,255,0.85)";
      });
      el.addEventListener("mouseleave", () => {
        trail.style.transform = "translate(-50%, -50%) scale(1)";
        trail.style.borderColor = "";
      });
    });

    // Hide when mouse leaves the window
    document.addEventListener("mouseleave", () => {
      dot.style.opacity = "0";
      trail.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
      dot.style.opacity = "1";
      trail.style.opacity = "1";
    });
  }

  const toggleSwitch = document.getElementById("mode-toggle");

  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    toggleSwitch.checked = true;
  }

  toggleSwitch.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    }
  });
});
