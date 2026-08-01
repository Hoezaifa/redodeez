# Security & Email Authentication Policy — Deez Prints

This document outlines security configurations and DNS record requirements for production deployments of Deez Prints.

---

## 1. Email Security DNS Records (SPF, DKIM, DMARC)

To prevent email spoofing, phishing, and ensure 100% deliverability for transactional customer notifications (orders, shipping, Telegram fallback alerts), configure the following DNS records on your domain registrar:

### A. SPF (Sender Policy Framework)
Add a `TXT` record on your root domain (`@`):
- **Type**: `TXT`
- **Host / Name**: `@` (or `deezprints.store`)
- **Value**: `v=spf1 include:_spf.mx.cloudflare.net include:sendgrid.net ~all`
- **TTL**: `3600` (or `Auto`)

### B. DKIM (DomainKeys Identified Mail)
Add the CNAME / TXT record provided by your transactional mail provider (e.g. Resend, SendGrid, or Cloudflare Email Routing):
- **Type**: `CNAME`
- **Host / Name**: `s1._domainkey`
- **Value**: `s1.domainkey.u1234567.hlsinsp.sendgrid.net`
- **TTL**: `3600`

### C. DMARC (Domain-based Message Authentication, Reporting, and Conformance)
Add a `TXT` record at `_dmarc`:
- **Type**: `TXT`
- **Host / Name**: `_dmarc` (or `_dmarc.deezprints.store`)
- **Value**: `v=DMARC1; p=reject; rua=mailto:dmarc-reports@deezprints.store; ruf=mailto:dmarc-reports@deezprints.store; pct=100; sp=reject`
- **TTL**: `3600`

---

## 2. Server-Side Administrative Protection

- **Admin Endpoint Authentication**: All server endpoints (`/api/orders`, `/api/settings`) modifying status, clearing data, or reading full order history mandate a valid `X-Admin-PIN` header.
- **Client Security Headers**: Production deployments enforce strict `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy: strict-origin-when-cross-origin`.
- **Secrets Management**: Database connection strings (`POSTGRES_URL`, `DATABASE_URL`) and Telegram tokens are strictly scoped to server environment variables and excluded from public client bundles.
