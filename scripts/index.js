import { stickyHeader, smoothScroll } from './sticky-header.js';
import { initializeForm } from './form.js';

stickyHeader();
smoothScroll();

document.addEventListener('DOMContentLoaded', () => {
  initializeForm();
});