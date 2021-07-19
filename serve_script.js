// Store vars
var emojis = null;

// Define Renderers

// 'Location' column renderers
function renderLocation(location, $cell) {
  const emoji = renderEmojis(location[0].countryFlag, $cell);
  return `${location[0].city} ${emoji}`;
}
// Render emojis on load
function renderEmojis (shortcode, cellRef, $cell) {
  let returnText = shortcode;
  if (emojis) {
    for (let emoji in emojis) {
      if (shortcode === emojis[emoji].shortname) {
        returnText = emojis[emoji].emoji;
        cellRef.children[0].classList.add('loaded');
        break;
      }
    }
  }
  return returnText;
}

// 'Monitor Status' column renderer
function renderMonitorStatus(value) {
  return createContent(value, ['Not Listed','Up']);
}

// 'Status' column renderer
function renderStatus(value) {
  return createContent(value, ['Active']);
}

// Helper Method
function createContent(value, match) {
	const isMatch = match.indexOf(value) > -1;
  const classType = isMatch ? 'fa-caret-up' : 'fa-caret-down';
  const valType = isMatch ? 'up' : 'down';
  return `<i class="fas ${classType} ${valType}"></i> <span class="${valType}">${value}</span>`;
}

window.onload = () => {
  // get reference to grid
  const zgRef = document.querySelector('zing-grid');
  // fetch emojis
  zgRef.executeOnLoad(function() {
    const endpoint = 'https://gist.githubusercontent.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb/raw/ac8dde8a374066bcbcf44a8296fc0522c7392244/emojis.json';
    fetch(endpoint)
      .then(r => r.json())
      .then(r => {
        emojis = r.emojis;
        // Refresh the grid with the new emojis
        if (zgRef) zgRef.refresh();
      });
  });
};