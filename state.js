/* ==========================================================================
   EDUVANTA - STATE MANAGEMENT & LOCAL STORAGE PERSISTENCE
   Persistent theme, enrollments, bookmarks, lessons completion, and notes
   ========================================================================== */

const EduvantaState = (function() {
  const STORAGE_KEYS = {
    THEME: 'eduvanta_theme',
    ENROLLED: 'eduvanta_enrolled_courses',
    BOOKMARKS: 'eduvanta_bookmarked_courses',
    COMPLETED_LESSONS: 'eduvanta_completed_lessons',
    NOTES: 'eduvanta_course_notes',
    USER: 'eduvanta_current_user'
  };

  // Initial Seed Data for Instant Realistic Feel
  const defaultUser = {
    name: 'Alex Morgan',
    email: 'alex.morgan@frontier.io',
    title: 'Senior Systems Engineer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    streakDays: 14,
    hoursLearned: 128.5,
    certificatesEarned: 2
  };

  const defaultEnrolled = ['course-ai-101', 'course-dev-201'];
  const defaultBookmarks = ['course-design-301'];
  const defaultCompletedLessons = {
    'course-ai-101': ['l1', 'l2', 'l4'],
    'course-dev-201': ['l10', 'l11']
  };

  // Helper for localStorage get with fallback
  function getStorage(key, fallback) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (e) {
      console.warn('Storage read failed:', e);
      return fallback;
    }
  }

  // Helper for localStorage set
  function setStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage write failed:', e);
    }
  }

  return {
    // Theme Management
    getTheme() {
      return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    },

    setTheme(theme) {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      document.documentElement.setAttribute('data-theme', theme);
      window.dispatchEvent(new CustomEvent('eduvanta:theme-change', { detail: { theme } }));
    },

    toggleTheme() {
      const current = this.getTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      this.setTheme(next);
      return next;
    },

    // User Session
    getUser() {
      return getStorage(STORAGE_KEYS.USER, defaultUser);
    },

    setUser(user) {
      setStorage(STORAGE_KEYS.USER, user);
      window.dispatchEvent(new CustomEvent('eduvanta:user-change', { detail: { user } }));
    },

    // Enrollment Management
    getEnrolledCourses() {
      return getStorage(STORAGE_KEYS.ENROLLED, defaultEnrolled);
    },

    isEnrolled(courseId) {
      const list = this.getEnrolledCourses();
      return list.includes(courseId);
    },

    enrollCourse(courseId) {
      const list = this.getEnrolledCourses();
      if (!list.includes(courseId)) {
        list.push(courseId);
        setStorage(STORAGE_KEYS.ENROLLED, list);
        window.dispatchEvent(new CustomEvent('eduvanta:enrollment-change', { detail: { courseId, enrolled: true } }));
        return true;
      }
      return false;
    },

    // Bookmark / Wishlist Management
    getBookmarks() {
      return getStorage(STORAGE_KEYS.BOOKMARKS, defaultBookmarks);
    },

    isBookmarked(courseId) {
      const list = this.getBookmarks();
      return list.includes(courseId);
    },

    toggleBookmark(courseId) {
      let list = this.getBookmarks();
      const exists = list.includes(courseId);
      if (exists) {
        list = list.filter(id => id !== courseId);
      } else {
        list.push(courseId);
      }
      setStorage(STORAGE_KEYS.BOOKMARKS, list);
      window.dispatchEvent(new CustomEvent('eduvanta:bookmark-change', { detail: { courseId, isBookmarked: !exists } }));
      return !exists;
    },

    // Lesson Progression
    getCompletedLessons(courseId) {
      const map = getStorage(STORAGE_KEYS.COMPLETED_LESSONS, defaultCompletedLessons);
      return map[courseId] || [];
    },

    isLessonCompleted(courseId, lessonId) {
      const completed = this.getCompletedLessons(courseId);
      return completed.includes(lessonId);
    },

    toggleLessonComplete(courseId, lessonId) {
      const map = getStorage(STORAGE_KEYS.COMPLETED_LESSONS, defaultCompletedLessons);
      if (!map[courseId]) map[courseId] = [];
      const index = map[courseId].indexOf(lessonId);
      const isNowComplete = index === -1;

      if (isNowComplete) {
        map[courseId].push(lessonId);
      } else {
        map[courseId].splice(index, 1);
      }

      setStorage(STORAGE_KEYS.COMPLETED_LESSONS, map);
      window.dispatchEvent(new CustomEvent('eduvanta:lesson-change', { detail: { courseId, lessonId, isNowComplete } }));
      return isNowComplete;
    },

    getCourseProgress(courseId) {
      const course = EDUVANTA_DATA.courses.find(c => c.id === courseId);
      if (!course) return 0;
      
      let totalLessons = 0;
      course.curriculum.forEach(m => totalLessons += m.lessons.length);
      if (totalLessons === 0) return 0;

      const completed = this.getCompletedLessons(courseId);
      const percentage = Math.round((completed.length / totalLessons) * 100);
      return Math.min(percentage, 100);
    },

    // Student Notes
    getNotes(courseId) {
      const notesMap = getStorage(STORAGE_KEYS.NOTES, {
        'course-ai-101': '• Attention is all you need: Query, Key, Value vectors computed via dot-product.\n• LoRA drastically reduces fine-tuning VRAM by decomposing weight matrices W into low-rank matrices A and B.'
      });
      return notesMap[courseId] || '';
    },

    saveNotes(courseId, text) {
      const notesMap = getStorage(STORAGE_KEYS.NOTES, {});
      notesMap[courseId] = text;
      setStorage(STORAGE_KEYS.NOTES, notesMap);
      return true;
    }
  };
})();
