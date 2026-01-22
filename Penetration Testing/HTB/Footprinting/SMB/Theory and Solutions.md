
## SMB

- **SMB** stands for **Server Message Block**.
- Client server protocol that regulates access to files, directories and other network resources like printers, routers or interfaces released for the SMB network. 
- The SMB protocol enables the client to communicate with other participants in the same network to access files or services shared with it on the network.
- Access rights are maintained by **Access Control Lists (ACL)**. They are controlled on the basis of **read**, **write**, **full access** for individual users or groups. 
- These files, directories or other network resources are called **shares** in SMB. **ACL**s are defined over these **shares**.


## Samba

- Alternative implementation of the SMB protocol developed for Unix based operating systems.
- Samba implements **CIFS** which allows it to communicate with Windows systems.
- When SMB commands are transmitted over Samba in older NetBIOS service, connections typically occur in TCP ports `137`, `138`, `139`.
- **CIFS** operates over TCP port `445` exclusively.
- **SMB** is the protocol and **Samba** is the implementation of the **SMB** protocol.
- **The NetBIOS API** provided a blueprint for an application to connect and share data with other computers. A group or collection of computers in the **SMB** protocol is called a **workgroup**.

## samba.conf Configurations

- Configuration file location -> `/etc/samba/samba.conf` 

### Dangerous Settings

|**Setting**|**Description**|
|---|---|
|`browseable = yes`|Allow listing available shares in the current share?|
|`read only = no`|Forbid the creation and modification of files?|
|`writable = yes`|Allow users to create and modify files?|
|`guest ok = yes`|Allow connecting to the service without using a password?|
|`enable privileges = yes`|Honor privileges assigned to specific SID?|
|`create mask = 0777`|What permissions must be assigned to the newly created files?|
|`directory mask = 0777`|What permissions must be assigned to the newly created directories?|
|`logon script = script.sh`|What script needs to be executed on the user's login?|
|`magic script = script.sh`|Which script should be executed when the script gets closed?|
|`magic output = script.out`|Where the output of the magic script needs to be stored?|




