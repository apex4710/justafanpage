document.addEventListener("DOMContentLoaded", function () {
  // App deep-link opener
  const links = document.querySelectorAll(".tile, .link-card");

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const app = this.getAttribute("data-app");
      const webUrl = this.getAttribute("href");
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
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
        setTimeout(() => {
          window.open(webUrl, "_blank");
        }, 1500);
      }

      if (/android/i.test(userAgent)) {
        openApp();
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
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
      if (this.classList.contains("spin-once")) return; // prevent double-trigger
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

  // ── Dark/Light Mode Toggle ──────────────────────────────────────
  const toggleSwitch = document.getElementById("mode-toggle");

  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    toggleSwitch.checked = true;
  }

  initParticles();

  toggleSwitch.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("light-mode");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
    }
    initParticles();
  });

  // ── Particles ──────────────────────────────────────────────────
  function initParticles() {
    if (window.pJSDom && window.pJSDom.length > 0) {
      window.pJSDom[0].pJS.fn.vendors.destroypJS();
      window.pJSDom = [];
    }

    const isLight = document.body.classList.contains("light-mode");
    const particleColor = isLight ? "#6640e8" : "#b19dff";
    const lineColor = isLight ? "#6640e8" : "#b19dff";

    particlesJS("particles-js", {
      particles: {
        number: { value: 55, density: { enable: true, value_area: 800 } },
        color: { value: particleColor },
        shape: { type: "circle" },
        opacity: { value: isLight ? 0.3 : 0.35, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: lineColor,
          opacity: isLight ? 0.18 : 0.22,
          width: 1,
        },
        move: { enable: true, speed: 1.8, random: true, out_mode: "out" },
      },
      interactivity: {
        detect_on: "window", // captures mouse anywhere on page
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
        },
        modes: {
          grab: { distance: 220, line_linked: { opacity: 0.7 } },
          push: { particles_nb: 5 },
        },
      },
      retina_detect: true,
    });
  }
});
