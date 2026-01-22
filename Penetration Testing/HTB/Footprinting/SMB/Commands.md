
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

- Connecting to a share may require a password and username.

```bash
smbclient //<TARGET IP>/<share_name>
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



