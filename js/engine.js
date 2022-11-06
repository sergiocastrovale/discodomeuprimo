/**
 * Main function of the project. Fetches the list assembled via
 * bash script, calls a function that turns it into letter-indexed
 * lists and builds the HTML accordingly. *
 */

const buildList = async (file = 'list') => {
  const total = document.querySelector('.total > b');
  const update = document.querySelector('.updated');
  const section = document.querySelector('section');
  const search = document.querySelector('input[type=search]');
  let count, timestamp;
  let items = [];

  try {
    const response = await fetch(file);

    if (response?.text) {
      const text = await response.text();

      items = text.trim().split("\n");

      // Metadata is stored in the first line
      [count, timestamp] = items[0].split('|');

      total.innerHTML = count;
      update.innerHTML = `Last updated ${timestamp}`;

      // Build lists
      getSections(items).forEach(block => {
        const dl = document.createElement('dl');
        const dt = document.createElement('dt');

        dt.innerHTML = block.title;
        dl.appendChild(dt);

        block.items.forEach(item => {
          const dd = document.createElement('dd');
          dd.innerHTML = item;
          dl.appendChild(dd);
        });

        section.appendChild(dl);
      });

      // Build search
      search.onkeyup = hideNonMatchingArtists;
    } else {
      throw new Error('Invalid response');
    }
  } catch (err) {
    console.error(`Unable to fetch ${file}: ${err}`);
  }
}

/**
 * Manipulates the raw list and turns it into an object
 * with arrays of irst-letter indexed objects.
 */

const getSections = (list = []) => {
  // Remove first line (saved for metadata)
  list.shift();

  // Build alphabetically-ordered lists
  const data = Object.values(
    list.reduce((acc, item) => {
      let letter = item[0].toLocaleUpperCase();
      const title = isNaN(letter) ? letter : '0-9';

      if (!acc[title]) {
        acc[title] = { title, items: [item] };
      } else {
        acc[title].items.push(item);
      }

      return acc;
    }, {})
  );

  // Push numeric names to last position
  data.push(data.shift());

  return data;
}

/**
 * "Reverse" search. Applies a 'hidden' class to all elements that do not
 * match the query given by the search input.
 *
 * If not a single artist starting with a specific letter is found, the column
 * itself is hidden to optimize space.
 *
 * This method also updates the counters inside the header as new results are
 * found while searching.
 */

const hideNonMatchingArtists = () => {
  let total = 0;
  let nonMatching = 0;
  const result = document.querySelector('.total > b');
  const search = document.querySelector('input[type=search]');
  const elements = document.querySelectorAll('dd');

  elements.forEach(element => {
    let content = element.innerHTML.trim();
    const parent = element.parentNode;

    // Hide non-matching
    if (!content.toLowerCase().includes(search.value.toLowerCase())) {
      element.classList.add('hidden');
      nonMatching++;
    } else {
      element.classList.remove('hidden');
    }

    // Hide entire list if no items
    parent.querySelectorAll('.hidden').length + 1 === parent.children.length
      ? parent.classList.add('hidden')
      : parent.classList.remove('hidden');

    total++;
  });

  // Update the counter
  result.innerHTML = nonMatching
    ? `${total-nonMatching}/${total}`
    : result.innerHTML = total
}

buildList();
