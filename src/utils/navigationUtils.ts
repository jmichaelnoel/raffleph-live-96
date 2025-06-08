
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

export const navigateAndScrollToTop = (navigate: (path: string) => void, path: string) => {
  navigate(path);
  // Use setTimeout to ensure the navigation completes before scrolling
  setTimeout(scrollToTop, 100);
};
