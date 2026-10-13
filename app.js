/* ==========================================================================
   EDUVANTA - APPLICATION BUSINESS LOGIC & INTERACTION ENGINE
   Course Catalog Filters, LMS Player, Dashboard Sync, and Auth Handlers
   ========================================================================== */

const EduvantaApp = (function() {
  // Common Course Card Generator
  function renderCourseCard(course) {
    const isBookmarked = EduvantaState.isBookmarked(course.id);
    const isEnrolled = EduvantaState.isEnrolled(course.id);
    const progress = EduvantaState.getCourseProgress(course.id);

    return `
      <div class="card course-card" data-category="${course.category}" data-level="${course.level}" data-course-id="${course.id}">
        <div class="course-thumbnail">
          <img src="${course.thumbnail}" alt="${course.title}" loading="lazy">
          <div class="course-thumb-overlay">
            <div class="course-thumb-top">
              <span class="badge badge-${course.badge ? course.badge.toLowerCase() : 'primary'}">${course.badge || course.categoryName}</span>
              <button class="course-bookmark-btn ${isBookmarked ? 'active' : ''}" data-bookmark-id="${course.id}" title="${isBookmarked ? 'Remove from Saved' : 'Save to Wishlist'}" aria-label="Bookmark course">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              </button>
            </div>
            <div class="course-thumb-bottom">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>${course.duration}</span>
              <span>•</span>
              <span>${course.lessonsCount} lessons</span>
            </div>
          </div>
        </div>

        <div class="course-card-body">
          <div class="course-meta-row">
            <span class="badge badge-level">${course.level}</span>
            <div class="course-rating">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span>${course.rating}</span>
              <span style="color: var(--text-muted); font-size: 0.78rem;">(${course.ratingCount})</span>
            </div>
          </div>

          <h3 class="course-title">
            <a href="course-detail.html?id=${course.id}">${course.title}</a>
          </h3>
          <p class="course-desc">${course.description}</p>

          <div class="course-instructor">
            <img src="${course.instructor.avatar}" alt="${course.instructor.name}" class="instructor-avatar">
            <div>
              <div class="instructor-name">${course.instructor.name}</div>
              <div class="instructor-title">${course.instructor.company}</div>
            </div>
          </div>

          ${isEnrolled ? `
            <div style="margin-top: auto; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 600; margin-bottom: 0.4rem;">
                <span style="color: var(--accent-primary);">In Progress</span>
                <span style="color: var(--text-primary);">${progress}%</span>
              </div>
              <div class="progress-bar-wrap" style="margin-bottom: 0.85rem;">
                <div class="progress-bar-fill" style="width: ${progress}%;"></div>
              </div>
              <a href="classroom.html?id=${course.id}" class="btn btn-primary btn-sm" style="width: 100%;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                Resume Course
              </a>
            </div>
          ` : `
            <div class="course-card-footer">
              <div class="course-price-wrap">
                <span class="course-price">$${course.price}</span>
                <span class="course-price-original">$${course.originalPrice}</span>
              </div>
              <div style="display: flex; gap: 0.4rem;">
                <a href="course-detail.html?id=${course.id}" class="btn btn-secondary btn-sm">Syllabus</a>
                <button class="btn btn-primary btn-sm enroll-btn" data-enroll-id="${course.id}">Enroll</button>
              </div>
            </div>
          `}
        </div>
      </div>
    `;
  }

  // Bind Global Card Action Listeners (Bookmarks & Quick Enroll)
  function bindCourseCardActions() {
    document.addEventListener('click', (e) => {
      // Bookmark Click
      const bookmarkBtn = e.target.closest('[data-bookmark-id]');
      if (bookmarkBtn) {
        e.preventDefault();
        e.stopPropagation();
        const courseId = bookmarkBtn.getAttribute('data-bookmark-id');
        const course = EDUVANTA_DATA.courses.find(c => c.id === courseId);
        const isNowBookmarked = EduvantaState.toggleBookmark(courseId);
        
        bookmarkBtn.classList.toggle('active', isNowBookmarked);
        bookmarkBtn.querySelector('svg').setAttribute('fill', isNowBookmarked ? 'currentColor' : 'none');
        
        EduvantaUI.showToast(
          isNowBookmarked ? `Added "${course ? course.title.slice(0, 30) + '...' : 'Course'}" to Saved Courses` : 'Removed from Saved Courses',
          isNowBookmarked ? 'success' : 'info'
        );
      }

      // Quick Enroll Click
      const enrollBtn = e.target.closest('.enroll-btn');
      if (enrollBtn) {
        e.preventDefault();
        e.stopPropagation();
        const courseId = enrollBtn.getAttribute('data-enroll-id');
        const course = EDUVANTA_DATA.courses.find(c => c.id === courseId);
        
        if (EduvantaState.isEnrolled(courseId)) {
          EduvantaUI.showToast('You are already enrolled in this curriculum!', 'info');
          window.location.href = `classroom.html?id=${courseId}`;
          return;
        }

        EduvantaState.enrollCourse(courseId);
        EduvantaUI.showToast(`🎉 Enrolled in "${course ? course.title.slice(0, 35) + '...' : 'Course'}"! Access granted.`, 'success');
        
        setTimeout(() => {
          window.location.href = `classroom.html?id=${courseId}`;
        }, 1200);
      }
    });
  }

  // Setup Catalog Page Filter & Search Logic
  function initCatalogPage() {
    const grid = document.getElementById('catalogCoursesGrid');
    if (!grid) return;

    const categoryChips = document.querySelectorAll('.filter-chip[data-category-filter]');
    const levelCheckboxes = document.querySelectorAll('input[name="levelFilter"]');
    const sortSelect = document.getElementById('catalogSortSelect');
    const searchInput = document.getElementById('catalogSearchInput');
    const countDisplay = document.getElementById('catalogCountDisplay');
    const resetBtn = document.getElementById('catalogResetFilters');

    let activeCategory = 'all';
    let activeLevels = [];
    let searchQuery = '';
    let activeSort = 'popular';

    function filterAndRender() {
      let filtered = EDUVANTA_DATA.courses.slice();

      // Category filter
      if (activeCategory !== 'all') {
        filtered = filtered.filter(c => c.category === activeCategory);
      }

      // Level filter
      if (activeLevels.length > 0) {
        filtered = filtered.filter(c => activeLevels.includes(c.level));
      }

      // Search Query
      if (searchQuery) {
        filtered = filtered.filter(c => 
          c.title.toLowerCase().includes(searchQuery) ||
          c.description.toLowerCase().includes(searchQuery) ||
          c.instructor.name.toLowerCase().includes(searchQuery)
        );
      }

      // Sort
      if (activeSort === 'popular') {
        filtered.sort((a, b) => b.studentsCount - a.studentsCount);
      } else if (activeSort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      } else if (activeSort === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (activeSort === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
      }

      // Update count display
      if (countDisplay) {
        countDisplay.textContent = `Showing ${filtered.length} of ${EDUVANTA_DATA.courses.length} courses`;
      }

      // Render grid
      if (filtered.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; background: var(--bg-surface); border: 1px dashed var(--border-medium); border-radius: var(--radius-xl);">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
            <h3 style="margin-bottom: 0.5rem;">No courses match your criteria</h3>
            <p style="color: var(--text-secondary); max-width: 420px; margin: 0 auto 1.5rem auto;">We could not find any courses matching your combination of filters. Try clearing your filters.</p>
            <button class="btn btn-outline btn-sm" id="emptyStateResetBtn">Reset All Filters</button>
          </div>
        `;
        document.getElementById('emptyStateResetBtn')?.addEventListener('click', resetFilters);
      } else {
        grid.innerHTML = filtered.map(renderCourseCard).join('');
      }
    }

    function resetFilters() {
      activeCategory = 'all';
      activeLevels = [];
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      if (sortSelect) sortSelect.value = 'popular';
      categoryChips.forEach(chip => {
        chip.classList.toggle('active', chip.dataset.categoryFilter === 'all');
      });
      levelCheckboxes.forEach(cb => cb.checked = false);
      filterAndRender();
    }

    if (resetBtn) resetBtn.addEventListener('click', resetFilters);

    categoryChips.forEach(chip => {
      chip.addEventListener('click', () => {
        categoryChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeCategory = chip.dataset.categoryFilter;
        filterAndRender();
      });
    });

    levelCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        activeLevels = Array.from(levelCheckboxes).filter(c => c.checked).map(c => c.value);
        filterAndRender();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterAndRender();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        activeSort = e.target.value;
        filterAndRender();
      });
    }

    filterAndRender();
  }

  // Setup Course Detail Page Logic
  function initCourseDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id') || 'course-ai-101';
    const course = EDUVANTA_DATA.courses.find(c => c.id === courseId) || EDUVANTA_DATA.courses[0];

    // Populate Dynamic Content
    document.querySelectorAll('[data-course-field]').forEach(el => {
      const field = el.dataset.courseField;
      if (field === 'title') el.textContent = course.title;
      if (field === 'description') el.textContent = course.description;
      if (field === 'categoryName') el.textContent = course.categoryName;
      if (field === 'level') el.textContent = course.level;
      if (field === 'rating') el.textContent = course.rating;
      if (field === 'ratingCount') el.textContent = course.ratingCount;
      if (field === 'studentsCount') el.textContent = course.studentsCount.toLocaleString();
      if (field === 'price') el.textContent = `$${course.price}`;
      if (field === 'originalPrice') el.textContent = `$${course.originalPrice}`;
      if (field === 'duration') el.textContent = course.duration;
      if (field === 'lessonsCount') el.textContent = `${course.lessonsCount} lessons`;
      if (field === 'instructorName') el.textContent = course.instructor.name;
      if (field === 'instructorTitle') el.textContent = course.instructor.title;
      if (field === 'instructorCompany') el.textContent = course.instructor.company;
      if (field === 'instructorAvatar') el.src = course.instructor.avatar;
      if (field === 'thumbnail') el.src = course.thumbnail;
    });

    // Populate "What You'll Learn"
    const learnList = document.getElementById('courseLearnList');
    if (learnList && course.whatYouLearn) {
      learnList.innerHTML = course.whatYouLearn.map(item => `
        <li style="display: flex; gap: 0.75rem; font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" style="flex-shrink: 0; margin-top: 2px;"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>${item}</span>
        </li>
      `).join('');
    }

    // Populate Curriculum Accordion
    const curriculumContainer = document.getElementById('courseCurriculumAccordion');
    if (curriculumContainer && course.curriculum) {
      curriculumContainer.innerHTML = course.curriculum.map((mod, idx) => `
        <div class="accordion-item ${idx === 0 ? 'active' : ''}">
          <button class="accordion-header" type="button">
            <div class="curriculum-module-header">
              <span style="font-size: 1.02rem; font-weight: 700;">${mod.module}</span>
              <span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 500;">${mod.lessons.length} lessons</span>
            </div>
            <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          <div class="accordion-content">
            <div class="accordion-inner">
              ${mod.lessons.map(lesson => `
                <div class="curriculum-lesson-item">
                  <div class="lesson-left">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                    <span style="font-weight: 500; color: var(--text-primary);">${lesson.title}</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 0.75rem;">
                    ${lesson.isPreview ? '<span class="badge badge-primary" style="font-size: 0.7rem;">Free Preview</span>' : ''}
                    <span style="font-size: 0.82rem; color: var(--text-muted);">${lesson.duration}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `).join('');

      // Accordion click bindings
      curriculumContainer.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
          const item = header.closest('.accordion-item');
          item.classList.toggle('active');
        });
      });
    }

    // Check enrollment state for sticky CTA
    const enrollMainBtn = document.getElementById('courseDetailEnrollBtn');
    if (enrollMainBtn) {
      const isAlready = EduvantaState.isEnrolled(course.id);
      if (isAlready) {
        enrollMainBtn.textContent = 'Go to Classroom';
        enrollMainBtn.className = 'btn btn-primary btn-lg';
        enrollMainBtn.addEventListener('click', () => {
          window.location.href = `classroom.html?id=${course.id}`;
        });
      } else {
        enrollMainBtn.addEventListener('click', () => {
          EduvantaState.enrollCourse(course.id);
          EduvantaUI.showToast(`🎉 Congratulations! You are enrolled in ${course.title}`, 'success');
          setTimeout(() => {
            window.location.href = `classroom.html?id=${course.id}`;
          }, 1000);
        });
      }
    }
  }

  // Setup Student Dashboard
  function initDashboardPage() {
    const enrolledGrid = document.getElementById('dashboardEnrolledGrid');
    const statsContainer = document.getElementById('dashboardStats');
    if (!enrolledGrid) return;

    const user = EduvantaState.getUser();
    const enrolledIds = EduvantaState.getEnrolledCourses();
    const enrolledCourses = EDUVANTA_DATA.courses.filter(c => enrolledIds.includes(c.id));

    // Render Enrolled Courses
    if (enrolledCourses.length === 0) {
      enrolledGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; background: var(--bg-surface); border: 1px dashed var(--border-medium); border-radius: var(--radius-xl);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🎓</div>
          <h3>You haven't enrolled in any courses yet</h3>
          <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Explore top-tier curricula designed by industry leaders.</p>
          <a href="courses.html" class="btn btn-primary">Browse Courses</a>
        </div>
      `;
    } else {
      enrolledGrid.innerHTML = enrolledCourses.map(renderCourseCard).join('');
    }

    // Render Saved / Wishlist Tab
    const savedGrid = document.getElementById('dashboardSavedGrid');
    if (savedGrid) {
      const bookmarkIds = EduvantaState.getBookmarks();
      const bookmarkedCourses = EDUVANTA_DATA.courses.filter(c => bookmarkIds.includes(c.id));
      if (bookmarkedCourses.length === 0) {
        savedGrid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
            <p>No saved courses yet. Click the bookmark icon on any course to save it for later.</p>
          </div>
        `;
      } else {
        savedGrid.innerHTML = bookmarkedCourses.map(renderCourseCard).join('');
      }
    }

    // Certificate Preview Trigger
    document.querySelectorAll('.view-certificate-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const courseTitle = btn.dataset.certCourse || 'Generative AI Systems & LLM Architecture';
        document.getElementById('certStudentName').textContent = user.name;
        document.getElementById('certCourseTitle').textContent = courseTitle;
        document.getElementById('certIssueDate').textContent = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        EduvantaUI.openModal('certificateModal');
      });
    });
  }

  // Setup Classroom LMS Logic
  function initClassroomPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id') || 'course-ai-101';
    const course = EDUVANTA_DATA.courses.find(c => c.id === courseId) || EDUVANTA_DATA.courses[0];

    const lessonsListContainer = document.getElementById('classroomLessonsList');
    const progressBar = document.getElementById('classroomProgressBar');
    const progressText = document.getElementById('classroomProgressPercent');
    const notesArea = document.getElementById('classroomNotesArea');
    const notesSaveBtn = document.getElementById('classroomNotesSaveBtn');
    const activeLessonTitle = document.getElementById('activeLessonTitle');

    // Update Overall Progress
    function refreshProgress() {
      const pct = EduvantaState.getCourseProgress(course.id);
      if (progressBar) progressBar.style.width = `${pct}%`;
      if (progressText) progressText.textContent = `${pct}% completed`;
    }

    // Render Sidebar Curriculum
    if (lessonsListContainer && course.curriculum) {
      let html = '';
      course.curriculum.forEach(mod => {
        html += `<div style="padding: 0.85rem 1.25rem; font-size: 0.82rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; background: var(--bg-subtle); color: var(--text-muted);">${mod.module}</div>`;
        mod.lessons.forEach(l => {
          const isDone = EduvantaState.isLessonCompleted(course.id, l.id);
          html += `
            <div class="classroom-lesson-row" data-lesson-id="${l.id}">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <input type="checkbox" class="lesson-checkbox" data-course="${course.id}" data-lesson="${l.id}" ${isDone ? 'checked' : ''} style="width: 17px; height: 17px; accent-color: var(--accent-primary); cursor: pointer;">
                <span class="lesson-name-span" style="font-size: 0.9rem; font-weight: 500; color: var(--text-primary);">${l.title}</span>
              </div>
              <span style="font-size: 0.78rem; color: var(--text-muted);">${l.duration}</span>
            </div>
          `;
        });
      });
      lessonsListContainer.innerHTML = html;

      // Checkbox Lesson Completion
      lessonsListContainer.querySelectorAll('.lesson-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
          const cId = cb.dataset.course;
          const lId = cb.dataset.lesson;
          const isComplete = EduvantaState.toggleLessonComplete(cId, lId);
          refreshProgress();
          EduvantaUI.showToast(isComplete ? 'Lesson marked completed! 🚀' : 'Lesson marked incomplete', isComplete ? 'success' : 'info', 2000);
        });
      });

      // Lesson Row Click to Switch Active Lesson
      lessonsListContainer.querySelectorAll('.classroom-lesson-row').forEach(row => {
        row.addEventListener('click', (e) => {
          if (e.target.type === 'checkbox') return;
          lessonsListContainer.querySelectorAll('.classroom-lesson-row').forEach(r => r.classList.remove('active'));
          row.classList.add('active');
          const title = row.querySelector('.lesson-name-span').textContent;
          if (activeLessonTitle) activeLessonTitle.textContent = title;
          EduvantaUI.showToast(`Switched to: ${title}`, 'info', 1800);
        });
      });

      // Select first lesson by default
      const firstRow = lessonsListContainer.querySelector('.classroom-lesson-row');
      if (firstRow) firstRow.classList.add('active');
    }

    refreshProgress();

    // Notes Taker Auto-Save
    if (notesArea) {
      notesArea.value = EduvantaState.getNotes(course.id);
      
      let typingTimer;
      notesArea.addEventListener('input', () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
          EduvantaState.saveNotes(course.id, notesArea.value);
          const badge = document.getElementById('notesStatusBadge');
          if (badge) {
            badge.textContent = 'Saved';
            badge.style.color = '#10b981';
            setTimeout(() => { badge.textContent = 'Auto-saved to device'; badge.style.color = ''; }, 2000);
          }
        }, 800);
      });

      if (notesSaveBtn) {
        notesSaveBtn.addEventListener('click', () => {
          EduvantaState.saveNotes(course.id, notesArea.value);
          EduvantaUI.showToast('Notes saved successfully!', 'success');
        });
      }
    }

    // Classroom Tab Navigation
    document.querySelectorAll('.classroom-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.classroom-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.classroom-tab-pane').forEach(p => p.style.display = 'none');
        btn.classList.add('active');
        const targetId = btn.dataset.classroomTab;
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.style.display = 'block';
      });
    });

    // Custom Video Playback Speed
    const speedSelect = document.getElementById('videoPlaybackSpeed');
    if (speedSelect) {
      speedSelect.addEventListener('change', (e) => {
        EduvantaUI.showToast(`Playback speed set to ${e.target.value}x`, 'info', 1500);
      });
    }

    // Play/Pause button simulation
    const playPauseBtn = document.getElementById('videoPlayPauseBtn');
    let isPlaying = false;
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playPauseBtn.innerHTML = isPlaying 
          ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>'
          : '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
        EduvantaUI.showToast(isPlaying ? 'Playback started' : 'Playback paused', 'info', 1200);
      });
    }
  }

  // Setup Auth Modal & Tabs
  function initAuthModal() {
    const authTabs = document.querySelectorAll('.auth-tab-btn');
    const loginForm = document.getElementById('authLoginForm');
    const registerForm = document.getElementById('authRegisterForm');

    authTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        authTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const isLogin = btn.dataset.authMode === 'login';
        if (loginForm) loginForm.style.display = isLogin ? 'block' : 'none';
        if (registerForm) registerForm.style.display = isLogin ? 'none' : 'block';
      });
    });

    // Login Submission
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail')?.value;
        const pass = document.getElementById('loginPassword')?.value;
        
        if (!email || !pass) {
          EduvantaUI.showToast('Please fill in all credentials', 'danger');
          return;
        }

        EduvantaState.setUser({
          name: 'Alex Morgan',
          email: email,
          title: 'Senior Systems Engineer',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
          streakDays: 15,
          hoursLearned: 130,
          certificatesEarned: 2
        });

        EduvantaUI.showToast(`Welcome back, Alex Morgan!`, 'success');
        EduvantaUI.closeModal('authModal');
      });
    }

    // Register Submission
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('regName')?.value;
        const email = document.getElementById('regEmail')?.value;
        const pass = document.getElementById('regPassword')?.value;

        if (!name || !email || !pass) {
          EduvantaUI.showToast('Please fill out all fields', 'danger');
          return;
        }

        EduvantaState.setUser({
          name: name,
          email: email,
          title: 'Member Learner',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
          streakDays: 1,
          hoursLearned: 0,
          certificatesEarned: 0
        });

        EduvantaUI.showToast(`Account created for ${name}! Welcome to EduVanta.`, 'success');
        EduvantaUI.closeModal('authModal');
      });
    }
  }

  // Setup Contact Form
  function initContactPage() {
    const contactForm = document.getElementById('eduvantaContactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value.trim();
      const email = document.getElementById('contactEmail')?.value.trim();
      const subject = document.getElementById('contactSubject')?.value;
      const message = document.getElementById('contactMessage')?.value.trim();

      if (!name || !email || !message) {
        EduvantaUI.showToast('Please fill in all required fields.', 'danger');
        return;
      }

      EduvantaUI.showToast(`Thank you, ${name}! Your inquiry has been routed to our academic advisors.`, 'success', 5000);
      contactForm.reset();
    });
  }

  // General FAQ Accordion Handlers
  function initGeneralAccordions() {
    document.querySelectorAll('.accordion-header').forEach(header => {
      // Don't re-bind if already handled
      if (header.dataset.bound) return;
      header.dataset.bound = 'true';
      header.addEventListener('click', () => {
        const item = header.closest('.accordion-item');
        if (item) item.classList.toggle('active');
      });
    });
  }

  // Master Init
  function init() {
    bindCourseCardActions();
    initCatalogPage();
    initCourseDetailPage();
    initDashboardPage();
    initClassroomPage();
    initAuthModal();
    initContactPage();
    initGeneralAccordions();
  }

  return {
    init,
    renderCourseCard
  };
})();

// Auto-run when DOM is parsed
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', EduvantaApp.init);
} else {
  EduvantaApp.init();
}
