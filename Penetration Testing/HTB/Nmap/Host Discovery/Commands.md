
## Host Discovery

- `-sn` disables port scanning.
- `-oA` stores results in all formats starting with the name 'host'.
- This scanning method works only if the firewalls of the hosts allow it


```bash
sudo nmap <ip range> -sn -oA host | grep for | cut -d" " -f5
```



