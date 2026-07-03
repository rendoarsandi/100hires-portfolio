const fs = require('fs');
const path = require('path');

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start
    .replace(/-+$/, '');            // Trim - from end
}

function processPosts() {
  const rawPostsFile = path.join('research', 'scripts', 'raw_posts.json');
  const baseDir = path.join('research', 'linkedin-posts');

  if (!fs.existsSync(rawPostsFile)) {
    console.error(`Raw posts file not found at ${rawPostsFile}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(rawPostsFile, 'utf-8');
  const posts = JSON.parse(rawData);

  fs.mkdirSync(baseDir, { recursive: true });

  console.log(`Processing ${posts.length} LinkedIn posts...`);

  posts.forEach((post, index) => {
    const author = post.author;
    const date = post.date;
    const url = post.url;
    const title = post.title;
    const content = post.content;

    const authorDir = path.join(baseDir, author);
    fs.mkdirSync(authorDir, { recursive: true });

    const slugTitle = slugify(title || `post-${index}`);
    const outputFile = path.join(authorDir, `${date}-${slugTitle}.md`);

    let markdownContent = `---\ntitle: "${title}"\n`;
    markdownContent += `author: "${author.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}"\n`;
    markdownContent += `date: "${date}"\n`;
    markdownContent += `source_url: "${url}"\n---\n\n`;
    markdownContent += `# ${title}\n\n`;
    markdownContent += `**Source**: [LinkedIn Post](${url})\n`;
    markdownContent += `**Date**: ${date}\n\n`;
    markdownContent += `## Post Content\n\n`;
    markdownContent += content;
    markdownContent += `\n`;

    fs.writeFileSync(outputFile, markdownContent, 'utf-8');
    console.log(`  Processed: ${title} -> ${outputFile}`);
  });

  console.log('LinkedIn posts processing completed successfully.');
}

processPosts();
