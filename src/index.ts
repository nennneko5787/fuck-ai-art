function createAIContentWarning(): HTMLDivElement {
  const container = document.createElement("div");
  container.setAttribute("aria-live", "polite");
  container.setAttribute("role", "status");
  container.className =
    "css-175oi2r r-1xfd6ze r-6koalj r-18u37iz r-1mmae3n r-3pj75a r-13qz1uu r-rgqbpe";
  container.style.marginTop = "10px";

  const thumbnailContainer = document.createElement("div");
  thumbnailContainer.className = "css-175oi2r r-13awgt0 r-18u37iz";
  thumbnailContainer.setAttribute("data-testid", "thumbnail");

  const iconContainer = document.createElement("div");
  iconContainer.className =
    "css-175oi2r r-1awozwy r-1777fci r-sdzlij r-h0d30l r-1iww7jx r-l5o3uw r-1l6c170 r-1mlwlqe r-dlybji";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute(
    "class",
    "r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-10ptun7 r-1janqcz r-jwli3a"
  );

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zM13 17h-2v-5h2v5zm-1-7c-.83 0-1.5-.67-1.5-1.5S11.17 7 12 7s1.5.67 1.5 1.5S12.83 10 12 10z"
  );

  g.appendChild(path);
  svg.appendChild(g);
  iconContainer.appendChild(svg);

  const textContainer = document.createElement("div");
  textContainer.className = "css-175oi2r r-1habvwh r-13awgt0 r-1777fci";

  const messageDiv = document.createElement("div");
  messageDiv.setAttribute("dir", "ltr");
  messageDiv.className =
    "css-146c3p1 r-bcqeeo r-1ttztb7 r-qvutc0 r-1tl8opc r-1b43r93 r-1cwl3u0 r-16dba41";
  messageDiv.style.color = "rgb(231, 233, 234)";

  const messageSpan = document.createElement("span");
  messageSpan.className = "css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-1tl8opc";
  messageSpan.textContent =
    "ポストにAIイラストが含まれている可能性があるため、このポストに警告を表示しています。";

  messageDiv.appendChild(messageSpan);

  const link = document.createElement("a");
  link.href = "https://github.com/nennneko5787/fuck-ai-art/issues/new";
  link.setAttribute("dir", "ltr");
  link.setAttribute("role", "link");
  link.className =
    "css-146c3p1 r-bcqeeo r-1ttztb7 r-qvutc0 r-1tl8opc r-1b43r93 r-1cwl3u0 r-b88u0q r-1q142lx r-1s2bzr4 r-iphfwy r-13orzya r-3s2u2q r-1ddef8g r-tjvw6i r-1loqt21";
  link.style.color = "rgb(231, 233, 234)";

  const linkSpan = document.createElement("span");
  linkSpan.className = "css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-1tl8opc";
  linkSpan.textContent = "この警告に異議申し立てをする";

  link.appendChild(linkSpan);

  textContainer.appendChild(messageDiv);
  textContainer.appendChild(link);

  thumbnailContainer.appendChild(iconContainer);
  thumbnailContainer.appendChild(textContainer);

  container.appendChild(thumbnailContainer);

  return container;
}

function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

document.addEventListener("DOMContentLoaded", () => {
  const seen = new WeakSet();

  function scan() {
    const description = document.querySelector(
      'div[data-testid="UserDescription"]'
    );

    document.querySelectorAll("article").forEach(async (article) => {
      if (seen.has(article)) return;
      seen.add(article);

      let aiFlag = false;
      const userLink = article.querySelector('a[role="link"]');
      if (userLink) {
        const screenName = userLink.getAttribute("href")?.slice(1);
        if (screenName?.toLowerCase().includes("ai")) {
          console.log(screenName?.toLowerCase());
          aiFlag = true;
        }
      }

      await sleep(1000);

      if (aiFlag) {
        const image = article.querySelector("div[aria-labelledby]");
        if (image) {
          image.outerHTML += createAIContentWarning().outerHTML;
        } else {
          const text = article.querySelector('[data-testid="tweetText"]');

          if (text) {
            text.outerHTML += createAIContentWarning().outerHTML;
          }
        }
      }
    });
  }

  scan();

  const observer = new MutationObserver(() => {
    scan();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
