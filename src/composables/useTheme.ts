import { ref, watch, onMounted, onUnmounted } from "vue";

export function useTheme() {
  const theme = ref(localStorage.getItem("theme") ?? "dark");

  const toggleTheme = (mode?: string) => {
    const altTheme = theme.value === "light" ? "dark" : "light";
    const newTheme = mode ?? altTheme;
    localStorage.setItem("theme", newTheme);
    theme.value = newTheme;
    document.body.className = newTheme;
  };

  // Prevents flashing of light theme on page load.
  onMounted(() => {
    const timeout = setTimeout(() => {
      document.body.style.transition = "all 0.3s ease";
    }, 300);
    onUnmounted(() => clearTimeout(timeout));
  });

  // Watch for changes in the theme and handle system preference changes.
  watch(theme, (newValue) => {
    document.body.className = newValue;
  });

  onMounted(() => {
    const updateTheme = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? "dark" : "light";
      toggleTheme(newTheme);
    };

    // Get user's preference from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const defaultTheme = savedTheme || (prefersDarkMode ? "dark" : "light");
    theme.value = defaultTheme;
    document.body.className = defaultTheme;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", updateTheme);

    onUnmounted(() => media.removeEventListener("change", updateTheme));
  });

  return { theme, toggleTheme };
}
