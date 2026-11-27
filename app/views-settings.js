// Settings: display preferences and saved data.
import { pageHead, card } from './views-common.js';
import { getState, setCurrency, resetAll } from './store.js';

export function render() {
  const st = getState();
  return `
  ${pageHead('Settings', 'How figures are shown, and what this site remembers on your device. Everything is stored only in your browser — nothing leaves it.')}
  ${card('Display', `
    <form id="settings-form">
      <fieldset>
        <legend>GDP figures shown in</legend>
        <label class="radio"><input type="radio" name="currency" value="usd" ${st.currency === 'usd' ? 'checked' : ''}> US dollars (US$4.03T for 2024)</label>
        <label class="radio"><input type="radio" name="currency" value="yen" ${st.currency === 'yen' ? 'checked' : ''}> Japanese yen (¥610T for 2024)</label>
      </fieldset>
      <button type="submit" class="btn">Save display</button>
      <p class="form-note" id="settings-saved" hidden>Saved — the Economy page will use your choice.</p>
    </form>`)}
  ${card('Your saved data', `
    <p>Atlas remembers three things on this device: your Compare picks (${getState().compareCountryA} vs ${getState().compareCountryB}, ${getState().compareIndicator}), this display choice, and nothing else. There is no account and no tracking.</p>
    <button id="reset-btn" class="btn danger">Reset everything</button>
    <p class="form-note" id="reset-done" hidden>Done — saved picks and display choices are cleared.</p>`)}
  ${card('About Atlas', `<p>Atlas is a demonstration statistics explorer: a static site that runs entirely from its own files. Figures are rounded public approximations, labelled with their year and source on the Guide page. Built as an entry for the make.fun "best national statistics site" competition.</p>`)}`;
}

export function bind() {
  const form = document.getElementById('settings-form');
  if (form) {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const c = form.querySelector('input[name="currency"]:checked');
      if (c) setCurrency(c.value);
      const note = document.getElementById('settings-saved');
      if (note) note.hidden = false;
    });
  }
  const reset = document.getElementById('reset-btn');
  if (reset) {
    reset.addEventListener('click', () => {
      resetAll();
      const note = document.getElementById('reset-done');
      if (note) note.hidden = false;
      setTimeout(() => { location.hash = '#/'; }, 600);
    });
  }
}
