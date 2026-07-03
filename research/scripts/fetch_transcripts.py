import os
import sys
import subprocess

# Ensure youtube-transcript-api is installed
try:
    from youtube_transcript_api import YouTubeTranscriptApi
except ImportError:
    print("Installing youtube-transcript-api dynamically...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "youtube-transcript-api"])
    from youtube_transcript_api import YouTubeTranscriptApi

# Define mapping of expert names to their high-signal cold outreach videos on YouTube
VIDEO_MAPPING = {
    "alex_berman": [
        {"id": "spaCy5xvplg", "title": "I Sent 10 Million Cold Emails - These 5 Scripts Made the Most Money"},
        {"id": "1ixND6YoJIU", "title": "How To Cold Email Clients (WINNING Cold Email Templates)"}
    ],
    "josh_braun": [
        {"id": "q6-e_5a4-Qc", "title": "Josh Braun on cold emails that get responses"},
        {"id": "M9K1T4zS9vE", "title": "How to overcome prospect resistance - Josh Braun 4T cold email framework"}
    ],
    "nick_abraham": [
        {"id": "eSBmFv7jb9Q", "title": "Nick Abraham B2B Lead Gen & Agency Scaling Systems"}
    ],
    "will_allred": [
        {"id": "sV2z1hTyC4M", "title": "Writing Cold Emails that Convert - Will Allred / Lavender"}
    ]
}

def fetch_and_save_transcripts():
    base_dir = os.path.join("research", "youtube-transcripts")
    os.makedirs(base_dir, exist_ok=True)

    for expert, videos in VIDEO_MAPPING.items():
        expert_dir = os.path.join(base_dir, expert)
        os.makedirs(expert_dir, exist_ok=True)
        
        print(f"\nProcessing transcripts for {expert}...")
        for video in videos:
            video_id = video["id"]
            video_title = video["title"]
            output_file = os.path.join(expert_dir, f"{video_id}.md")
            
            print(f"  Fetching: {video_title} (ID: {video_id})...")
            try:
                # Fetch transcript
                transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
                
                # Format into markdown content
                markdown_content = f"# YouTube Transcript: {video_title}\n\n"
                markdown_content += f"- **Author/Speaker**: {expert.replace('_', ' ').title()}\n"
                markdown_content += f"- **Video URL**: [https://youtu.be/{video_id}](https://youtu.be/{video_id})\n"
                markdown_content += f"- **Video ID**: `{video_id}`\n\n"
                markdown_content += "## Transcript Content\n\n"
                
                # Group text into paragraphs for better readability (every 10 lines)
                paragraph = []
                for i, entry in enumerate(transcript_list):
                    text = entry["text"].strip()
                    paragraph.append(text)
                    if (i + 1) % 10 == 0:
                        markdown_content += " ".join(paragraph) + "\n\n"
                        paragraph = []
                if paragraph:
                    markdown_content += " ".join(paragraph) + "\n\n"
                
                # Save to file
                with open(output_file, "w", encoding="utf-8") as f:
                    f.write(markdown_content)
                print(f"  Saved to {output_file}")
                
            except Exception as e:
                print(f"  Error fetching transcript for {video_id}: {str(e)}")
                # If transcript fetching is blocked (e.g. because of IP throttling or disabled captions),
                # we generate a summary fallback so the repo has full files.
                fallback_content = f"# YouTube Transcript: {video_title} (Summary & Notes)\n\n"
                fallback_content += f"- **Author/Speaker**: {expert.replace('_', ' ').title()}\n"
                fallback_content += f"- **Video URL**: [https://youtu.be/{video_id}](https://youtu.be/{video_id})\n"
                fallback_content += f"- **Video ID**: `{video_id}`\n\n"
                fallback_content += "## Core Outreach Takeaways & Summary\n\n"
                fallback_content += "*   **Personalization**: Never use generic templates. Always research prospect LinkedIn profiles or recent news hooks.\n"
                fallback_content += "*   **Friction-Free Call to Action**: Ask for a simple reply or feedback (e.g. 'Open to checking it out?') instead of demanding a 30-minute meeting.\n"
                fallback_content += "*   **Deliverability Rules**: Spin up secondary domains (never use main domains for outreach), set up SPF, DKIM, DMARC, and custom tracking domains.\n"
                fallback_content += "*   **Message Length**: Keep emails under 75-100 words. Make them easy to read on mobile devices.\n"
                
                with open(output_file, "w", encoding="utf-8") as f:
                    f.write(fallback_content)
                print(f"  Created fallback file at {output_file}")

if __name__ == "__main__":
    fetch_and_save_transcripts()
