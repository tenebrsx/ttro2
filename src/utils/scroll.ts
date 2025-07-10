/**
 * Function to manually scroll to top
 * @param smooth Whether to use smooth scrolling
 */
export const scrollToTop = (smooth: boolean = false) => {
  if (smooth) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  } else {
    window.scrollTo(0, 0);
  }
};

/**
 * Function to scroll to a specific element
 * @param elementId The ID of the element to scroll to
 * @param smooth Whether to use smooth scrolling
 * @param offset Optional offset from the top
 */
export const scrollToElement = (elementId: string, smooth: boolean = true, offset: number = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    if (smooth) {
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, offsetPosition);
    }
  }
};
