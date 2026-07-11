
## Credential Manager

- It allows users to securely store credentials of other applications and websites the user uses or accesses.
- Credentials are stored in a special encrypted folder on the computer under the user and system profiles :
	- `%UserProfile%\AppData\Local\Microsoft\Vault\`
	- `%UserProfile%\AppData\Local\Microsoft\Credentials\`
	- `%UserProfile%\AppData\Roaming\Microsoft\Vault\`
	- `%ProgramData%\Microsoft\Vault\`
	- `%SystemRoot%\System32\config\systemprofile\AppData\Roaming\Microsoft\Vault\`
- Each vault folder contains a `Policy.vpl` file. 
	- This file contains AES keys that is protected by DPAPI (Windows mechanism to encrypt sensitive data).
	- These AES keys are used itself to encrypt credentials.
	- Newer version of Windows use `Credential Guard` to further encrypt DPAPI master keys by storing them in secured memory enclaves (**Virtualization-based Security**)

## Windows Vaults

- Windows vaults or Credential Lockers can be used to store the following stuff :-
	- Web Credentials
	- Windows Credentials


---
## Questions and Solutions

