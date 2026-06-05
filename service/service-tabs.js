document.addEventListener('DOMContentLoaded', function () {
  function initServiceTabs() {
    const tabList = document.querySelector('.service-cat-widget');
    if (!tabList) return;

    const buttons = tabList.querySelectorAll('.nav-link');
    const tabContent = document.querySelector('.tab-content');
    const panes = tabContent ? tabContent.querySelectorAll('.tab-pane') : [];

    function findPaneById(id) {
      if (!id) return null;
      let pane = document.getElementById(id);
      if (pane) return pane;
      pane = document.getElementById('pills-' + id);
      return pane;
    }

    function activate(targetId) {
      buttons.forEach(btn => {
        const parentLi = btn.closest('li');
        const is = (btn.getAttribute('data-bs-target') || '').replace('#', '') === targetId;
        if (parentLi) parentLi.classList.toggle('active', is);
        btn.classList.toggle('active', is);
        btn.setAttribute('aria-selected', is ? 'true' : 'false');
      });

      panes.forEach(p => {
        const isActive = (p.id === targetId) || (p.id === 'pills-' + targetId);
        p.classList.toggle('show', isActive);
        p.classList.toggle('active', isActive);
      });
    }

    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = (btn.getAttribute('data-bs-target') || '').replace('#', '');
        const pane = findPaneById(target);
        if (pane) activate(target);
      });
    });

    const activeBtn = tabList.querySelector('.nav-link.active') || buttons[0];
    const initialTarget = activeBtn ? (activeBtn.getAttribute('data-bs-target') || '').replace('#', '') : null;
    if (initialTarget) activate(initialTarget);
  }

  initServiceTabs();
});
