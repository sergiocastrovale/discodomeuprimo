const buildList = async (file = 'list') => {
  const header = document.querySelector('header > .metadata');
  const section = document.querySelector('section');
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

buildList();
