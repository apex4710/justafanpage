document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".tile");

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
        //case "threads":
        // Threads app URL scheme
        //appUrlScheme = "threads://user-profile/justafanofficialig";
        //break;
        //case "facebook":
        // Facebook app URL scheme using fb://profile/
        //appUrlScheme = "fb://profile/juastafan";
        //break;
        //case "tiktok":
        // TikTok app URL scheme
        //appUrlScheme = "tiktok://user/@justafan1017";
        //break;
        default:
          appUrlScheme = webUrl;
      }

      // Function to open app or fallback to web
      function openApp() {
        window.location = appUrlScheme;
        setTimeout(() => {
          window.open(webUrl, "_blank");
        }, 1500);
      }

      if (/android/i.test(userAgent)) {
        // Android device
        openApp();
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        // iOS device
        openApp();
      } else {
        // Other devices
        window.open(webUrl, "_blank");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Existing code for app links...
  // Particles.js initialization with inline configuration
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: 5,
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 3,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        grab: {
          distance: 200,
          line_linked: {
            opacity: 1,
          },
        },
        push: {
          particles_nb: 4,
        },
      },
    },
    retina_detect: true,
  });
  // Dark Mode Toggle
  const toggleSwitch = document.getElementById("mode-toggle");

  // Load and apply saved theme preference
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggleSwitch.checked = true;
  }

  // Event listener for toggle switch
  toggleSwitch.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  });
});
