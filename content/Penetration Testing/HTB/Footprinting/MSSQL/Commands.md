
## Footprinting the Service

### Using NMAP

```bash
sudo nmap --script ms-sql-info,ms-sql-empty-password,ms-sql-xp-cmdshell,ms-sql-config,ms-sql-ntlm-info,ms-sql-tables,ms-sql-hasdbaccess,ms-sql-dac,ms-sql-dump-hashes --script-args mssql.instance-port=1433,mssql.username=sa,mssql.password=,mssql.instance-name=MSSQLSERVER -sV -p 1433 <TARGET IP>
```

### Using METASPLOIT

```bash
msfconsole
use auxiliary/scanner/mssql/mssql_ping
set RHOSTS <TARGET IP>
run
```

## Connect to MSSQL

```bash
python3 mssqlclient.py <username>@<TARGET IP> -windows-auth
```

### Setup for mssqlclient.py

- To run the program we need to install the `impacket` library in python.
- Its always safer to do all of this is a safe virtual environment.

```bash
git clone https://github.com/fortra/impacket.git
cd impacket
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install .
```

### mssqlclient.py Location

- After the setup procedure the `mssqlclient.py` will be inside `impacket/examples/mssqlclient.py`.
- So move or copy that file into your current working directory and then run the command to connect to the MSSQL server.


## MSSQL Commands

| SQL Query                                           | Purpose                         |
| --------------------------------------------------- | ------------------------------- |
| `SELECT name FROM sys.databases;`                   | List all databases              |
| `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES;` | List tables in current database |
| `SELECT SYSTEM_USER;`                               | Check SQL login (server level)  |
| `SELECT USER_NAME();`                               | Check database user (DB level)  |
