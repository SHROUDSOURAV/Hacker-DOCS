
## SNMP

- SNMP stands for Simple Network Management Protocol.
- It is used to monitor network devices and handle configuration tasks and change settings remotely.
- SNMP-enabled hardware devices like routers, switches, servers, IoT devices and many other devices can be queried and controlled using this protocol.
- SNMP uses `UDP Port 161 and 162`.
	- `UDP Port 161`: Used for GET/SET operations :-
		- so basically **UDP Port 161** used by SNMP manager to sent requests to the SNMP agent to make config or modifications to the network device or fetch some info about it.
	- `UDP Port 162`: Used for traps :-
		- Used by the SNMP agent to send informs or notifications to the SNMP manager.


## SNMP Versions

- `SNMP version 1` passes data in plain text and uses community string as security mechanism.
- `SNMP version 2 ` passes data in plain text and uses community string as security mechanism but is more efficient in handling bulk data.
- `SNMP version 3` uses better security mechanisms like usernames and passwords and NOT community strings.


## The OID (Object Identifier)

- **What it is:** A unique, numeric address for a single piece of information on a device.
- **Appearance:** A string of numbers separated by dots, such as `.1.3.6.1.2.1.1.3.0` 
- **Function:** This is what the SNMP Manager actually sends in its "GET" request to pull a specific value like CPU temperature or fan speed for example.

## The MIB (Management Information Base)

- **What it is:** A text file (a "dictionary") that translates those ugly numeric OIDs into human-readable names.
- **Function:** It tells your monitoring software for example :- that `.1.3.6.1.2.1.1.5.0` actually means `sysName`.
- **Structure:** MIBs are organized in a tree hierarchy. 

## SNMP Community Strings

- Community Strings in SNMP walk act as username or Password which can be found out by bruteforcing SNMP service using tools like `snmpwalk`. 
- These Community Strings act as a form of authentication and by getting the correct community string we can access SNMP agents which are used to make config or other modifications to the network devices.


### Key Comparison

| Feature         | **OID**                       | **MIB**                                                      |
| --------------- | ----------------------------- | ------------------------------------------------------------ |
| **Analogy**     | A specific **GPS coordinate** | The entire **city map**                                      |
| **Format**      | Numeric (e.g., .1.3.6...)     | Text file (.mib or .txt)                                     |
| **Usage**       | Used by machines to talk      | Used by humans to understand                                 |
| **Requirement** | Always required for a query   | Optional (you can query by OID alone if you know the number) |

## SNMP Configurations

- Config file location -> `/etc/snmp/snmp.conf`
### Dangerous Settings

| **Settings**                                     | **Description**                                                                       |
| ------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `rwuser noauth`                                  | Provides access to the full OID tree without authentication.                          |
| `rwcommunity <community string> <IPv4 address>`  | Provides access to the full OID tree regardless of where the requests were sent from. |
| `rwcommunity6 <community string> <IPv6 address>` | Same access as with `rwcommunity` with the difference of using IPv6.                  |

---
## Questions and Solutions

