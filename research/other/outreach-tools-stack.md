# B2B SaaS Cold Outreach Stack: Modern Tooling & Playbooks

To turn this research database into a functional playbook, a modern sales team needs a stack of tools categorized by lead generation, deliverability/infrastructure, copy assistance, and sequence orchestration.

---

## 🛠️ The Core Outreach Tool Stack

### 1. Sourcing & Data Enrichment
*   **Clay**: Used for programmatic enrichment, custom scraping, and AI personalization. Clay acts as a database hub, connecting API services (like Apollo, Hunter, Findymail, LinkedIn) to enrich leads with triggers (e.g. recent hires, technology changes, web signals).
*   **Apollo.io / ZoomInfo**: Standard databases for pulling verified emails, phone numbers, and job titles.

### 2. Verification & List Cleaning
*   **Scrubby**: Specifically used to verify "catch-all" or "unverifiable" emails. It tests them by sending a real email simulation without bouncing, protecting sender domain reputation.
*   **NeverBounce / ZeroBounce**: Standard SMTP check lists to clean hard bounces before launching sequences.

### 3. Inboxing & Infrastructure
*   **Porkbun / Namecheap**: For purchasing secondary domains (e.g., if main domain is `getlemlist.com`, outbound domains are `trylemlist.com` or `lemlisthq.com`).
*   **Cloudflare**: To manage DNS records (SPF, DKIM, DMARC, and custom tracking domains) with low latency.
*   **Google Workspace & Microsoft 365**: The most trusted email service providers (ESPs). Setting up a mix of both ensures that email deliverability is balanced.

### 4. Copywriting & Writing Psychology
*   **Lavender**: An AI-powered email writing assistant that scores your cold emails on length, reading level, tone, formatting, and spam triggers. Lavender's data shows that keep-it-short copywriting generates the highest reply rates.

### 5. Sending & Multi-Channel Orchestration
*   **Smartlead.io**: An enterprise-grade sequence tool that features master inbox rotation, automatic warmups, and unified reply management. It allows scale outreach without burning individual domain reputation.
*   **lemlist**: Excellent for localized campaigns requiring hyper-personalized images, custom landing pages, or multi-channel LinkedIn touches.

---

## 📋 The 2026 Deliverability Playbook

| Check / Setting | Value | Rationale |
| --- | --- | --- |
| **Max Emails/Inbox/Day** | 30 - 40 | Exceeding this triggers ESP spam filters. |
| **Max Inboxes/Domain** | 2 | If one inbox gets flagged, it limits domain exposure. |
| **DMARC Record** | `v=DMARC1; p=quarantine;` | Essential security configuration required by Gmail & Yahoo. |
| **Warmup Duration** | 14 - 21 Days | Gradually builds sending volume and domain reputation. |
| **Bounce Rate Limit** | < 2% | Bounces higher than 2% immediately damage deliverability. |
