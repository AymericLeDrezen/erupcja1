document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".content-section");

  function activateSection(id) {
    sections.forEach((section) => {
      const isActive = section.id === id;
      section.classList.toggle("is-active", isActive);
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("data-section") === id;
      link.classList.toggle("is-active", isActive);
    });
  }

  // Handle nav clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("data-section");
      if (!target) return;

      activateSection(target);

      // Update URL hash without jumping around
      if (history.replaceState) {
        history.replaceState(null, "", "#" + target);
      } else {
        window.location.hash = target;
      }

      // Scroll to top for better continuity
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // Activate section based on URL hash on load
  const initialHash = window.location.hash.replace("#", "");
  const validIds = Array.from(sections).map((s) => s.id);
  const initialSection = validIds.includes(initialHash) ? initialHash : "intro";
  activateSection(initialSection);

  // --- Edit mode functionality ---

  const editToggle = document.getElementById("edit-toggle");

  if (editToggle) {
    const editableSelectors = [
      ".section-header h1",
      ".section-header h2",
      ".section-header .section-lead",
      ".block p",
      ".block li",
      ".card p",
      ".bullet-list li",
      ".figure-card figcaption",
      ".table-wrapper caption",
      ".table-wrapper th",
      ".table-wrapper td",
      ".site-footer p"
    ].join(", ");

    function setEditing(on) {
      document.documentElement.classList.toggle("is-editing", on);
      editToggle.setAttribute("aria-pressed", on ? "true" : "false");

      const editableNodes = document.querySelectorAll(editableSelectors);
      editableNodes.forEach((el) => {
        el.setAttribute("contenteditable", on ? "true" : "false");
        el.classList.toggle("editable", on);
      });
    }

    let isEditing = false;

    editToggle.addEventListener("click", () => {
      isEditing = !isEditing;
      setEditing(isEditing);
    });
  }
});
