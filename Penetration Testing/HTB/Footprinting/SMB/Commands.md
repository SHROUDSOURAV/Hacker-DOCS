
## Bruteforce Attack

```bash
hydra -L <user/user wordlist> -P <password/password wordlist> smb://TARGET IP
```


## Non Anonymous Share Listing

- password for the user may be prompted later.

```bash
smbclient -U <username> -L //<TARGET IP>
```
## Anonymous Share Listing

- `-N` is for NULL session or anonymous access without username or password.
- `-L` is for listing shares.

```bash
smbclient -N -L //<TARGET IP>
```

**OR**

```bash
nxc smb <TARGET IP> --shares -u '' -p ''
```

## Connecting to Share

```bash
smbclient //<TARGET IP>/<share_name>
```

**OR**

- May require a password. The below command incase a certain share is only accessible by a particular user.

```bash
smbclient -U <username> //<TARGET IP>/<share_name>
```

## Download files from SMB

- When you are inside the SMB server, use the below command to download the file.

```bash
get <filename>
```

## Footprinting the Service

```bash
 sudo nmap <TARGET IP> -sV -sC -p139,445
```

## Connecting with rpcclient

- Tool can be used to perform administrative tasks, enumerate users in the SMB server .etc.

```bash
rpcclient -U "" <TARGET IP>
```

## rpcclient Commands

| **Query**                 | **Description**                                                    |
| ------------------------- | ------------------------------------------------------------------ |
| `srvinfo`                 | Server information.                                                |
| `enumdomains`             | Enumerate all domains that are deployed in the network.            |
| `querydominfo`            | Provides domain, server, and user information of deployed domains. |
| `netshareenumall`         | Enumerates all available shares.                                   |
| `netsharegetinfo <share>` | Provides information about a specific share.                       |
| `enumdomusers`            | Enumerates all domain users.                                       |
| `queryuser <RID>`         | Provides information about a specific user.                        |

## SMB enumeration (USERS, GROUP RIDS, etc)

- Used for enumerating users in SMB server.
- Used for finding Group RIDs.
- Used for enumerating SMB shares and their permissions.

```bash
enum4linux <TARGET IP> -A
```



