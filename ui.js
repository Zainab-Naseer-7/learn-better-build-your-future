/* ==========================================================================
   EDUVANTA - UI CONTROLLERS & INTERACTIVE OVERLAYS
   Toasts, Auth Modal, Command Palette (Ctrl+K), Certificate & Theme Toggle
   ========================================================================== */

const EduvantaUI = (function() {
  // Toast Notification System
  function showToast(message, type = 'info', duration = 3500) {
    let container = document.getElementById('eduvanta-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'eduvanta-toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    } else if (type === 'danger') {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
    } else {
      iconSvg = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    }

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 200);
    }, duration);
  }

  // Modal Manager
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      const input = modal.querySelector('input:not([type="hidden"])');
      if (input) setTimeout(() => input.focus(), 100);
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function initModals() {
    // Backdrop clicks to close
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal.id);
        }
      });
      const closeBtn = modal.querySelector('.modal-close-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => closeModal(modal.id));
      }
    });

    // Escape key listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open').forEach(m => closeModal(m.id));
        closeMobileDrawer();
      }
    });
  }

  // Mobile Drawer Manager
  function openMobileDrawer() {
    const drawer = document.getElementById('mobileDrawer');
    const backdrop = document.getElementById('mobileDrawerBackdrop');
    if (drawer && backdrop) {
      drawer.classList.add('open');
      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileDrawer() {
    const drawer = document.getElementById('mobileDrawer');
    const backdrop = document.getElementById('mobileDrawerBackdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // Global Command Palette (Ctrl+K)
  function initCommandPalette() {
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openModal('searchModal');
      }
    });

    const searchInput = document.getElementById('commandSearchInput');
    const resultsContainer = document.getElementById('commandSearchResults');

    if (searchInput && resultsContainer) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (!query) {
          renderQuickNavCommandResults(resultsContainer);
          return;
        }

        const matchedCourses = EDUVANTA_DATA.courses.filter(c => 
          c.title.toLowerCase().includes(query) || 
          c.categoryName.toLowerCase().includes(query) ||
          c.instructor.name.toLowerCase().includes(query)
        );

        const matchedInstructors = EDUVANTA_DATA.instructors.filter(i =>
          i.name.toLowerCase().includes(query) ||
          i.role.toLowerCase().includes(query)
        );

        if (matchedCourses.length === 0 && matchedInstructors.length === 0) {
          resultsContainer.innerHTML = `
            <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 0.75rem auto; opacity: 0.6;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <p style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem;">No results found</p>
              <p style="font-size: 0.85rem;">Try searching for "AI", "Kubernetes", "Design", or an instructor name.</p>
            </div>
          `;
          return;
        }

        let html = '<div style="display: flex; flex-direction: column; gap: 0.5rem;">';
        
        if (matchedCourses.length > 0) {
          html += '<div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); padding: 0.5rem 0.5rem 0.2rem 0.5rem;">Courses</div>';
          matchedCourses.forEach(c => {
            html += `
              <a href="course-detail.html?id=${c.id}" class="command-result-item" style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; border-radius: var(--radius-md); background: var(--bg-subtle); transition: background-color var(--transition-fast);">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <span style="font-size: 1.1rem;">📘</span>
                  <div>
                    <div style="font-weight: 600; font-size: 0.92rem; color: var(--text-primary);">${c.title}</div>
                    <div style="font-size: 0.78rem; color: var(--text-muted);">${c.categoryName} • ${c.instructor.name}</div>
                  </div>
                </div>
                <span class="badge badge-primary">${c.level}</span>
              </a>
            `;
          });
        }

        if (matchedInstructors.length > 0) {
          html += '<div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); padding: 0.85rem 0.5rem 0.2rem 0.5rem;">Instructors</div>';
          matchedInstructors.forEach(i => {
            html += `
              <a href="instructors.html" class="command-result-item" style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; border-radius: var(--radius-md); background: var(--bg-subtle);">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <img src="${i.avatar}" alt="${i.name}" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover;">
                  <div>
                    <div style="font-weight: 600; font-size: 0.92rem; color: var(--text-primary);">${i.name}</div>
                    <div style="font-size: 0.78rem; color: var(--text-muted);">${i.role}</div>
                  </div>
                </div>
                <span style="font-size: 0.8rem; color: var(--amber-rating); font-weight: 600;">★ ${i.rating}</span>
              </a>
            `;
          });
        }

        html += '</div>';
        resultsContainer.innerHTML = html;
      });
    }
  }

  function renderQuickNavCommandResults(container) {
    container.innerHTML = `
      <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.75rem;">Quick Navigation</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem;">
        <a href="courses.html" style="padding: 0.75rem; background: var(--bg-subtle); border-radius: var(--radius-md); font-size: 0.88rem; font-weight: 600; color: var(--text-primary); display: flex; align-items: center; gap: 0.5rem;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          Browse All Courses
        </a>
        <a href="dashboard.html" style="padding: 0.75rem; background: var(--bg-subtle); border-radius: var(--radius-md); font-size: 0.88rem; font-weight: 600; color: var(--text-primary); display: flex; align-items: center; gap: 0.5rem;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>
          Student Dashboard
        </a>
        <a href="classroom.html" style="padding: 0.75rem; background: var(--bg-subtle); border-radius: var(--radius-md); font-size: 0.88rem; font-weight: 600; color: var(--text-primary); display: flex; align-items: center; gap: 0.5rem;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          Live LMS Classroom
        </a>
        <a href="instructors.html" style="padding: 0.75rem; background: var(--bg-subtle); border-radius: var(--radius-md); font-size: 0.88rem; font-weight: 600; color: var(--text-primary); display: flex; align-items: center; gap: 0.5rem;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
          World-Class Faculty
        </a>
      </div>
    `;
  }

  // Theme Sync & Toggle
  function initThemeToggle() {
    const savedTheme = EduvantaState.getTheme();
    document.documentElement.setAttribute('data-theme', savedTheme);

    const updateIcons = (theme) => {
      document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
        btn.innerHTML = theme === 'dark' 
          ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
          : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
      });
    };

    updateIcons(savedTheme);

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const next = EduvantaState.toggleTheme();
        updateIcons(next);
        showToast(`Theme switched to ${next} mode`, 'info', 2000);
      });
    });
  }

  // Initialize Global Components on Document Ready
  function init() {
    initThemeToggle();
    initModals();
    initCommandPalette();

    // Mobile Hamburger
    const hamburger = document.getElementById('hamburgerBtn');
    if (hamburger) {
      hamburger.addEventListener('click', openMobileDrawer);
    }
    const mobileClose = document.getElementById('mobileDrawerClose');
    if (mobileClose) {
      mobileClose.addEventListener('click', closeMobileDrawer);
    }
    const mobileBackdrop = document.getElementById('mobileDrawerBackdrop');
    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', closeMobileDrawer);
    }

    // Trigger buttons for Auth Modal
    document.querySelectorAll('.trigger-auth-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('authModal');
      });
    });

    // Trigger buttons for Search
    document.querySelectorAll('.trigger-search-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('searchModal');
      });
    });

    // Newsletter subscription forms
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.value && input.value.includes('@')) {
          showToast('Thank you! You are subscribed to EduVanta Engineering Insights.', 'success');
          input.value = '';
        } else {
          showToast('Please enter a valid email address', 'danger');
        }
      });
    });
  }

  return {
    init,
    showToast,
    openModal,
    closeModal,
    openMobileDrawer,
    closeMobileDrawer
  };
})();

// Auto-run when DOM is parsed
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', EduvantaUI.init);
} else {
  EduvantaUI.init();
}
