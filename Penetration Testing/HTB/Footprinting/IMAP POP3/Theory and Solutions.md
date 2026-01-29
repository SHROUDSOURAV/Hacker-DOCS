
## IMAP/POP3

- SMTP is used for sending emails.
- IMAP/POP3 are email retrieval protocols or IMAP/POP3 is for receiving the emails.
- IMAP syncs mail across devices, leaving messages on the server while POP3 is for offline and local access.

## IMAP

- Allows access to emails from mail server and allows online management of emails directly on the server that supports folder structures.
- IMAP is a network protocol for the online management of emails in remote server.
- IMAP is text based and has extended functions, such as browsing emails directly on the server.
- IMAP synchronizes messages across multiple devices by storing them on a server, making it ideal for mobile access.

## POP3

- Doesn't have same functionality as IMAP.
- Provides listing, retrieving, and deleting emails as functions at the email server.
- POP3 downloads emails to a single device and usually removes them from the server, making it better for offline access.

## IMAP/POP3 Configurations

### Dangerous Configurations

|**Setting**|**Description**|
|---|---|
|`auth_debug`|Enables all authentication debug logging.|
|`auth_debug_passwords`|This setting adjusts log verbosity, the submitted passwords, and the scheme gets logged.|
|`auth_verbose`|Logs unsuccessful authentication attempts and their reasons.|
|`auth_verbose_passwords`|Passwords used for authentication are logged and can also be truncated.|
|`auth_anonymous_username`|This specifies the username to be used when logging in with the ANONYMOUS SASL mechanism.|

## IMAP/POP3 Ports

- `110` and `995` used by POP3.
- `143` and `993` used by IMAP.
- The higher ports `993` and `995` use TLS/SSL to encrypt the communication between client and server.

---
## Questions and Solutions

