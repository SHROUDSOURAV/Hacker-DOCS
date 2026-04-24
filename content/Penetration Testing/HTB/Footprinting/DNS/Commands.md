
## Name Server Query

```bash
dig ns <domain name> 
```

**OR**

- You can specifically ask a **Authoritative Name Server** using `@<IP>` like -> `dig ns example.com @1.1.1.1`

```bash
dig ns <domain name> @<authoritative name server IP>
```

## Version Query

- Finding the DNS server version.
- This is only possible if the version info is present in the DNS server.

```bash
dig CH TXT version.bind <DNS server IP>
```

## All DNS Records Query

- Gives info of all types of available DNS records.

```bash
dig any <domain name>
```

**OR**

- Specifically query a DNS server which may not be publicly available. 

```bash
dig any <domain name> @<authoritative name server IP>
```

## AXFR Zone Transfer

- Performs Full Zone Transfer.

```bash
dig axfr <domain name> @<authoritative name server IP>
```

## Subdomain Brute Forcing

```bash
dnsenum --dnsserver <DNS server IP> --enum -p 0 -s 0 -o <filename to save subdomains> -f <wordlist path> <domain name>
```

