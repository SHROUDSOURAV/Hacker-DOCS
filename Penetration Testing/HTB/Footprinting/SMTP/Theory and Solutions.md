
## SMTP

- SMTP stands for Simple Mail Transfer Protocol.
- Used by email client or users and the mail server or between 2 SMTP servers. SMTP often combines with IMAP or POP3 protocols to fetch and send emails.
- SMTP works unencrypted without further measures and transmits all commands, data, or authentication information in plain text. 
- To prevent unauthorized reading of data, SMTP is used with SSL/TLS encryption. During such scenarios the `TCP Port 465` is used.
- SMTP servers use `Port 25` and `TCP Port 587` in newer versions.

## Relay Server

- When we send mail it doesn't directly go to the recipient.
- Instead it goes through a relay server (here **SMTP**) which forwards our mail to the recipient.
- But first we must authenticate ourselves in a trusted network first like Gmail or SMTP asking for username and password. 


## SMTP Configurations

### Default Configuration

- The default location of the SMTP server.
- The below commands helps us view the configuration settings given the file is located in that place.

```bash
cat /etc/postfix/main.cf | grep -v "#" | sed -r "/^\s*$/d"
```

### Dangerous Settings

- To prevent the sent emails from being filtered by spam filters and not reaching the recipient, the sender can use a relay server that the recipient trusts.
- Often, administrators have no overview of which IP ranges they have to allow. This results in a misconfiguration of the SMTP server. 
- So if the SMTP server has the below config it means all IP addresses connected to the SMTP server are trusted and their is no filtration  **“Allow ANYONE, from ANYWHERE, to send emails through this SMTP server.”**

```bash
mynetworks = 0.0.0.0/0
```

---
## Questions and Solutions

