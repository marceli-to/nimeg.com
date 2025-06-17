(function () {
  const selectors = {
    filterTerm: '[data-filter]',
    filterItem: '[data-filter-tags]',
  };

  let activeFilter = null;

  const init = () => {
    document.querySelectorAll(selectors.filterTerm).forEach((el) => {
      el.addEventListener('click', handleFilterClick);
    });
  };

  const handleFilterClick = (e) => {
    e.preventDefault();
    const term = e.currentTarget.dataset.filter;

    // Toggle the active filter
    activeFilter = activeFilter === term ? null : term;

    updateFilters();
  };

  const updateFilters = () => {
    const items = document.querySelectorAll(selectors.filterItem);

    items.forEach((el) => {
      const tags = el.dataset.filterTags.split(',');
      const matches = activeFilter && tags.includes(activeFilter);

      // Show if no active filter, or if it matches
      if (!activeFilter || matches) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });

    // Update filter button styling
    document.querySelectorAll(selectors.filterTerm).forEach((el) => {
      if (el.dataset.filter === activeFilter) {
        el.classList.add('!bg-granite', 'text-white');
      } else {
        el.classList.remove('!bg-granite', 'text-white');
      }
    });
  };

  if (document.querySelector(selectors.filterTerm)) {
    init();
  }
})();
