(function () {
  const selectors = {
    filterTermButton: '[data-filter-button]',
    filterTermSelect: '[data-filter-select]',
    filterItem: '[data-filter-tags]',
  };

  let activeFilter = null;

  const init = () => {
    document.querySelectorAll(selectors.filterTermButton).forEach((el) => {
      el.addEventListener('click', handleFilterClick);
    });

    const select = document.querySelector(selectors.filterTermSelect);
    if (select) {
      select.addEventListener('change', handleSelectChange);
    }
  };

  const handleFilterClick = (e) => {
    e.preventDefault();
    const term = e.currentTarget.dataset.filterButton;

    // Toggle logic
    activeFilter = activeFilter === term ? null : term;

    // Sync dropdown
    const select = document.querySelector(selectors.filterTermSelect);
    if (select) {
      select.value = activeFilter || "null";
    }

    updateFilters();
  };

  const handleSelectChange = (e) => {
    const term = e.target.value;
    activeFilter = term === "null" ? null : term;

    updateFilters();
  };

  const updateFilters = () => {
    const items = document.querySelectorAll(selectors.filterItem);

    items.forEach((el) => {
      const tags = el.dataset.filterTags.split(',');
      const matches = activeFilter && tags.includes(activeFilter);

      if (!activeFilter || matches) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });

    // Update pill styles
    document.querySelectorAll(selectors.filterTermButton).forEach((el) => {
      const term = el.dataset.filterButton;
      if (term === activeFilter) {
        el.classList.add('!bg-granite', 'text-white');
      } else {
        el.classList.remove('!bg-granite', 'text-white');
      }
    });
  };

  if (
    document.querySelector(selectors.filterTermButton) ||
    document.querySelector(selectors.filterTermSelect)
  ) {
    init();
  }
})();
