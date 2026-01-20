
## TFTP Commands

|**Commands**|**Description**|
|---|---|
|`connect`|Sets the remote host, and optionally the port, for file transfers.|
|`get`|Transfers a file or set of files from the remote host to the local host.|
|`put`|Transfers a file or set of files from the local host onto the remote host.|
|`quit`|Exits tftp.|
|`status`|Shows the current status of tftp, including the current transfer mode (ascii or binary), connection status, time-out value, and so on.|
|`verbose`|Turns verbose mode, which displays additional information during file transfer, on or off.|

## Anonymous Login

- **username** => `anonymous`
- **password** => **just press enter blank password**

```bash
ftp <FTP server IP>
```


## Footprinting the Service

```bash
sudo nmap -sV -p21 -sC -A <TARGET IP>
```

