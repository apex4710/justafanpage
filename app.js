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
        case "threads":
          // Threads app URL scheme
          appUrlScheme = "threads://user-profile/justafanofficialig";
          break;
        case "facebook":
          // Facebook app URL scheme using fb://profile/
          appUrlScheme = "fb://profile/juastafan";
          break;
        case "tiktok":
          // TikTok app URL scheme
          appUrlScheme = "tiktok://user/@justafan1017";
          break;
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
