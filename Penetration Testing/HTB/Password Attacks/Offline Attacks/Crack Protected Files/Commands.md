
## Cracking SSH Key
### Forming Hash of SSH Private Key

- `SSH private key` => placeholder for the SSH private key you want to crack.
- `SSH private key hash filename` => placeholder for the hash file. Give filename as per your own wish.
- After forming hash **CRACK THE HASH!!!**.

```bash
ssh2john <SSH private key> <SSH private key hash filename>
```


## Cracking PDF File

### Forming Hash of PDF File

- `PDF filename` => placeholder for the PDF file you want to crack.
- `PDF hash filename` => placeholder for the PDF hash file. Give filename as per your own wish.
- After forming hash **CRACK THE HASH!!!**.

```bash
pdf2john <PDF filename> > <PDF hash filename>
```


## Cracking Zip Files

### Forming Hash of ZIP File

- `ZIP filename` => placeholder for the ZIP file you want to crack.
- `ZIP hash filename` => placeholder for the ZIP hash file. Give filename as per your own wish.
- After forming hash **CRACK THE HASH!!!**.

```bash
zip2john <ZIP filename> <ZIP hash filename>
```


## Cracking the Hash

- After forming your SSH hash, pdf hash, zip file hash or whatever run the below command to crack it.
- Specify your hash file and run the below command to crack it.

```bash
john --wordlist=<wordlist path> <hash filename>
```