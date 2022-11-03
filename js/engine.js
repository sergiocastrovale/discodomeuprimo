const buildList = async (file = 'list') => {
  const header = document.querySelector('.metadata');
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

      header.innerHTML = `${count} artists listed. Last updated ${timestamp}.`;

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

const hideNonMatchingArtists = () => {
  const search = document.querySelector('input[type=search]');
  const elements = document.querySelectorAll('dd');

  elements.forEach(element => {
    let content = element.innerHTML.trim();
    const parent = element.parentNode;

    // Hide non-matching
    !content.includes(search.value)
      ? element.classList.add('hidden')
      : element.classList.remove('hidden');

    // Hide entire list if no items
    parent.querySelectorAll('.hidden').length + 1 === parent.children.length
      ? parent.classList.add('hidden')
      : parent.classList.remove('hidden');
  });
}

buildList();
