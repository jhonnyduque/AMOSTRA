let activeTag = null;

function renderAmostra() {
  const data = window.AMOSTRA_DATA;
  if (!data) return;

  const profile = document.getElementById("profile");
  const summary = document.getElementById("summary");
  const works = document.getElementById("works");

  profile.innerHTML = `
    <h1>${data.profile.name}</h1>
    <div class="role">${data.profile.role}</div>
    <p class="tagline">${data.profile.tagline}</p>
  `;

  summary.textContent = data.profile.summary;

  const sortedWorks = [...data.works].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const filteredWorks = activeTag
    ? sortedWorks.filter((work) => work.tags.includes(activeTag))
    : sortedWorks;

  works.innerHTML = filteredWorks
    .map((work) => {
      const formattedDate = new Date(work.date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const images = work.images
        .map(
          (src) =>
            `<img src="${src}" alt="Vista del trabajo ${work.title}" />`
        )
        .join("");

      const tags = work.tags
        .map((tag) => {
          const isActive = activeTag === tag ? "is-active" : "";
          return `<span class="chip ${isActive}" data-tag="${tag}">${tag}</span>`;
        })
        .join("");

      return `
        <article class="work-card">
          <div class="work-header">
            <div class="work-title">${work.title}</div>
            <div class="work-date">${formattedDate}</div>
          </div>
          <div class="work-body">
            <p class="work-description">${work.description}</p>
            <p class="work-context">${work.learningContext}</p>
            <div class="chips">${tags}</div>
            <div class="images">${images}</div>
          </div>
          <div class="feedback">
            <div class="feedback-item">
              <h4>Fortalezas</h4>
              <p>${work.feedback.strengths}</p>
            </div>
            <div class="feedback-item">
              <h4>Áreas de mejora</h4>
              <p>${work.feedback.improvements}</p>
            </div>
            <div class="feedback-item">
              <h4>Siguientes pasos</h4>
              <p>${work.feedback.nextSteps}</p>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function handleTagClick(event) {
  const tag = event.target.dataset.tag;
  if (!tag) return;
  activeTag = activeTag === tag ? null : tag;
  renderAmostra();
}

function handlePrintClick() {
  window.print();
}

document.getElementById("works").addEventListener("click", handleTagClick);
document.getElementById("printButton").addEventListener("click", handlePrintClick);

renderAmostra();
