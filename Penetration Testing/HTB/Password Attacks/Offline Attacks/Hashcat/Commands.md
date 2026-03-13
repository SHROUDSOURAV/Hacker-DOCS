
## Identify the Hash type

```bash
hashid -m <hash to crack>
```

## Wordlist Attack

```bash
hashcat -a 0 -m <hash type number> <hash to crack/hash file to crack> <wordlist path>
```

## Wordlist Attack + Rules

- `hashcat` rule LOCATION -> `/usr/share/hashcat/rules` 
- From there you can choose the rule you want to include.

```bash
hashcat -a 0 -m <hash type number> <hash to crack/hash file to crack> <wordlist path> -r <hashcat rule>
```

## Mask Attack

Hashcat includes several built-in character sets :
### Character Set

| Symbol | Charset                             |
| ------ | ----------------------------------- |
| ?l     | abcdefghijklmnopqrstuvwxyz          |
| ?u     | ABCDEFGHIJKLMNOPQRSTUVWXYZ          |
| ?d     | 0123456789                          |
| ?h     | 0123456789abcdef                    |
| ?H     | 0123456789ABCDEF                    |
| ?s     | «space»!"#$%&'()*+,-./:;<=>?@[]^_`{ |
| ?a     | ?l?u?d?s                            |
| ?b     | 0x00 - 0xff                         |

```bash
hashcat -a 3 -m <hash type number> <hash to crack/hash file to crack> '<character set>'
```

