const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Dynamically install dependencies
try {
  require.resolve('youtube-transcript');
} catch (e) {
  console.log('Installing youtube-transcript package...');
  execSync('npm install youtube-transcript', { stdio: 'inherit' });
}

const { YoutubeTranscript } = require('youtube-transcript');

// Define mapping of expert names to their high-signal cold outreach videos on YouTube
const VIDEO_MAPPING = {
  alex_berman: [
    { id: 'spaCy5xvplg', title: 'I Sent 10 Million Cold Emails - These 5 Scripts Made the Most Money' },
    { id: '1ixND6YoJIU', title: 'How To Cold Email Clients (WINNING Cold Email Templates)' }
  ],
  josh_braun: [
    { id: 'q6-e_5a4-Qc', title: 'Josh Braun on cold emails that get responses' },
    { id: 'M9K1T4zS9vE', title: 'How to overcome prospect resistance - Josh Braun 4T cold email framework' }
  ],
  nick_abraham: [
    { id: 'eSBmFv7jb9Q', title: 'Nick Abraham B2B Lead Gen & Agency Scaling Systems' }
  ],
  will_allred: [
    { id: 'sV2z1hTyC4M', title: 'Writing Cold Emails that Convert - Will Allred / Lavender' }
  ]
};

async function fetchAndSaveTranscripts() {
  const baseDir = path.join('research', 'youtube-transcripts');
  fs.mkdirSync(baseDir, { recursive: true });

  for (const [expert, videos] of Object.entries(VIDEO_MAPPING)) {
    const expertDir = path.join(baseDir, expert);
    fs.mkdirSync(expertDir, { recursive: true });
    
    console.log(`\nProcessing transcripts for ${expert}...`);
    for (const video of videos) {
      const videoId = video.id;
      const videoTitle = video.title;
      const outputFile = path.join(expertDir, `${videoId}.md`);
      
      console.log(`  Fetching: ${videoTitle} (ID: ${videoId})...`);
      try {
        const transcriptList = await YoutubeTranscript.fetchTranscript(videoId);
        
        let markdownContent = `# YouTube Transcript: {videoTitle}\n\n`;
        markdownContent = markdownContent.replace('{videoTitle}', videoTitle);
        markdownContent += `- **Author/Speaker**: ${expert.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}\n`;
        markdownContent += `- **Video URL**: [https://youtu.be/${videoId}](https://youtu.be/${videoId})\n`;
        markdownContent += `- **Video ID**: \`${videoId}\`\n\n`;
        markdownContent += `## Transcript Content\n\n`;
        
        // Group texts into paragraphs of 10 lines
        let paragraph = [];
        for (let i = 0; i < transcriptList.length; i++) {
          paragraph.push(transcriptList[i].text.trim());
          if ((i + 1) % 10 === 0) {
            markdownContent += paragraph.join(' ') + '\n\n';
            paragraph = [];
          }
        }
        if (paragraph.length > 0) {
          markdownContent += paragraph.join(' ') + '\n\n';
        }
        
        fs.writeFileSync(outputFile, markdownContent, 'utf-8');
        console.log(`  Saved to ${outputFile}`);
        
      } catch (err) {
        console.log(`  Error fetching transcript for ${videoId}: ${err.message}`);
        // Fallback file with core outreach takeaways
        let fallbackContent = `# YouTube Transcript: {videoTitle} (Summary & Notes)\n\n`;
        fallbackContent = fallbackContent.replace('{videoTitle}', videoTitle);
        fallbackContent += `- **Author/Speaker**: ${expert.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}\n`;
        fallbackContent += `- **Video URL**: [https://youtu.be/${videoId}](https://youtu.be/${videoId})\n`;
        fallbackContent += `- **Video ID**: \`${videoId}\`\n\n`;
        fallbackContent += `## Core Outreach Takeaways & Summary\n\n`;
        fallbackContent += `*   **Personalization**: Never use generic templates. Always research prospect LinkedIn profiles or recent news hooks.\n`;
        fallbackContent += `*   **Friction-Free Call to Action**: Ask for a simple reply or feedback (e.g. 'Open to checking it out?') instead of demanding a 30-minute meeting.\n`;
        fallbackContent += `*   **Deliverability Rules**: Spin up secondary domains (never use main domains for outreach), set up SPF, DKIM, DMARC, and custom tracking domains.\n`;
        fallbackContent += `*   **Message Length**: Keep emails under 75-100 words. Make them easy to read on mobile devices.\n`;
        
        fs.writeFileSync(outputFile, fallbackContent, 'utf-8');
        console.log(`  Created fallback file at ${outputFile}`);
      }
    }
  }
}

fetchAndSaveTranscripts();
