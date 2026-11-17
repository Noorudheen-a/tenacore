# Contact form

Production: https://tenacore.in/contact.html

The two-column page contains the contact details and enquiry form. `contact-send.php` sends messages through the PHP host mail service to `info@tenacore.com`, with the visitor's email as Reply-To and `website@tenacore.in` as From. It validates input, restricts origins, uses a honeypot and limits successful sends per IP to one per minute. No mail passwords are stored in the repository.

The production endpoint is enabled only on tenacore.in and its subdomains. Static previews retain the mailto draft fallback; they do not run PHP.

The deployment test was accepted by PHP mail(). This verifies server handoff, not inbox placement. Check the inbox and spam folder for “New website enquiry | Tenacore”. If mail does not arrive, configure authenticated SMTP and domain SPF/DKIM in the hosting mail panel.
