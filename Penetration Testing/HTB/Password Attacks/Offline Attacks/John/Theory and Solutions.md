
## John The Ripper

### Single Crack Mode

- Rule based password cracking technique used against Linux credentials.
- It generates passwords based on the victim's username, home directory name, and `GECHOS` values. (**fullname**, **room number**, **phone number** .etc.) 

**Example** : 

```bash
r0lf:$6$ues25dIanlctrWxg$nZHVz2z4kCy1760Ee28M1xtHdGoy0C2cYzZ8l2sVa1kIa8K9gAcdBP.GI6ng/qA4oaMrgElZ1Cb9OeXO4Fvy3/:0:0:Rolf Sebastian:/home/r0lf:/bin/bash
```

Based on the contents of the file, it can be inferred that the victim has the username `r0lf`, the real name `Rolf Sebastian`, and the home directory `/home/r0lf`. Single crack mode will use this information to generate candidate passwords and test them against the hash. 

