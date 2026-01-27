// Review page - Question tracking and accordion functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize accordion functionality
    initAccordions();
    
    // Initialize question tracking
    initQuestionTracking();
    
    // Update progress statistics
    updateProgressStats();
});

function initAccordions() {
    const triggers = document.querySelectorAll('.accordion-trigger');
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const item = this.closest('.accordion-item');
            const content = item.querySelector('.accordion-content');
            const icon = this.querySelector('.accordion-icon');
            
            // Toggle active state
            const isActive = item.classList.contains('active');
            
            if (isActive) {
                item.classList.remove('active');
                content.style.maxHeight = null;
                icon.style.transform = 'rotate(0deg)';
            } else {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

function initQuestionTracking() {
    const checkboxes = document.querySelectorAll('.question-checkbox');
    
    // Load saved progress from localStorage
    checkboxes.forEach(checkbox => {
        const questionId = checkbox.closest('.accordion-item').dataset.questionId;
        const isCompleted = localStorage.getItem(questionId) === 'true';
        checkbox.checked = isCompleted;
    });
    
    // Save progress when checkbox is clicked
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const questionId = this.closest('.accordion-item').dataset.questionId;
            localStorage.setItem(questionId, this.checked);
            updateProgressStats();
            updateChapterProgress();
        });
    });
}

function updateProgressStats() {
    const allQuestions = document.querySelectorAll('.question-checkbox');
    const completedQuestions = document.querySelectorAll('.question-checkbox:checked');
    
    const total = allQuestions.length;
    const completed = completedQuestions.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    document.getElementById('totalQuestions').textContent = total;
    document.getElementById('completedQuestions').textContent = completed;
    document.getElementById('progressPercent').textContent = percent + '%';
}

function updateChapterProgress() {
    // Update chapter 1 progress
    updateSingleChapterProgress('ch1', 'chuong1');
    
    // Update chapter 2 progress
    updateSingleChapterProgress('ch2', 'chuong2');
    
    // Update chapter 3 progress
    updateSingleChapterProgress('ch3', 'chuong3');
}

function updateSingleChapterProgress(chapterPrefix, chapterId) {
    const chapterSection = document.getElementById(chapterId);
    if (!chapterSection) return;
    
    const chapterQuestions = chapterSection.querySelectorAll('.question-checkbox');
    const chapterCompleted = chapterSection.querySelectorAll('.question-checkbox:checked');
    
    const total = chapterQuestions.length;
    const completed = chapterCompleted.length;
    
    const progressElement = document.getElementById(`${chapterPrefix}-progress`);
    if (progressElement) {
        progressElement.textContent = `${completed}/${total}`;
    }
}

// Reset progress function (can be called from console if needed)
function resetProgress() {
    if (confirm('Bạn có chắc muốn xóa toàn bộ tiến độ ôn tập?')) {
        const checkboxes = document.querySelectorAll('.question-checkbox');
        checkboxes.forEach(checkbox => {
            const questionId = checkbox.closest('.accordion-item').dataset.questionId;
            localStorage.removeItem(questionId);
            checkbox.checked = false;
        });
        updateProgressStats();
        updateChapterProgress();
        alert('Đã xóa tiến độ ôn tập!');
    }
}
