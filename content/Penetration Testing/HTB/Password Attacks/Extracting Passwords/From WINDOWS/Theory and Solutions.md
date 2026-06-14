

## Windows Authentication Process


### Windows Authentication Process Diagram

![Windows Authentication Process Diagram](./Images/img1.png)

### LSA

- LSA stands for Local Security Authority.
- Authenticates local users, local logins and oversees all aspects of local security and provides services for translating between usernames and security identifiers(SIDs).
- Credentials are stored in `LSASS`, `SAM Database` or `Active Directory`.
- LSA is conceptual while LSASS is the actual implementation.

### LSASS

- Responsible for handling local security policy, authenticating users, and forwards security related events like logins, or failed logins etc. to `Event Log`.
- Located at `%SystemRoot%\System32\Lsass.exe`in the file system.

### WinLogon

- `WinLogon` handles the local logon process.
- The logon UI is handled by `logonUI`.

|**Authentication Packages**|**Description**|
|---|---|
|`Lsasrv.dll`|The LSA Server service both enforces security policies and acts as the security package manager for the LSA. The LSA contains the Negotiate function, which selects either the NTLM or Kerberos protocol after determining which protocol is to be successful.|
|`Msv1_0.dll`|Authentication package for local machine logons that don't require custom authentication.|
|`Samsrv.dll`|The Security Accounts Manager (SAM) stores local security accounts, enforces locally stored policies, and supports APIs.|
|`Kerberos.dll`|Security package loaded by the LSA for Kerberos-based authentication on a machine.|
|`Netlogon.dll`|Network-based logon service.|
|`Ntdsa.dll`|Directory System Agent (DSA) that manages the Active Directory database (ntds.dit), processes LDAP queries, and handles replication between domain controllers. Only loaded on Domain Controllers.|

### SAM Database

- Its a database in windows which stores user account credentials.
- It is used to authenticate both local and remote users and uses cryptographic protections to prevent unauthorized access.
- User passwords are stored as hashes in the registry, typically in the form of either `LM` or `NTLM` hashes.
- Located at `%SystemRoot%\system32\config\SAM` and is mounted under `HKLM\SAM`.

### NTDS

- `NTDS.dit` is a database file which stores Active Directory data. This data consists of the following stuff and more :-
	- user accounts (usernames and password hashes)
	- group accounts
	- computer accounts
	- group policy objects
- This `NTDS` is maintained by a Domain Controller in the Windows Domain network which is responsible to main authorization and authentication in this network. It controls the Active Directory forest. Each domain controller has a `NTDS.dit` file which is synchronized across all Domain Controllers. 