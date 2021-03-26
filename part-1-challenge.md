# Administration Platform for Contests

# Problem

Pretend you are the head engineer of a gaming company, and you have been asked by the CEO to build something. The CEO wants you to build an administration platform to go along with some of the new games your company is releasing in the future. This administration platform would allow employees of your company to create and release contests for users of the application to play. Design this administration system.

# Duration

26 March, 2021

# Proposers

- Aaron Southammavong

# Detail

Two immediate things came to mind after reading the feature specs.

1. The employee's experience during the process of creating a contest and consumer experience with the public application.

- consider different alternatives in which an employee can set up a contest
- consider what information is needed for the contest
- consider employee single sign-on or individual credentials
- consider data required from consumers for contests
- consider the application UI for contests
- consider how the consumer can participate in the contest

2. How would the data be handled within the Administration Platform's database and with other games.

- consider the expected shape of the data expected from consumers
- consider how the data will be aggregated
- consider how a new contest notifies to applicable games
- consider consider how the consumer would be notified of a contest
- consider the communication between employee administrative platform to a database
- consider the communication between database to a consumer app

# Proposal

## Administration Contest Platform

I've considered a lot of different ways to implement events, like these contests, for the current platform I work on. First and foremost, I think there should be an incentive for employees to create these contests for the general consumers and that the experience in creating them should be fun (so as to promote more employee involvement).

Access/Login:
With that said, the permissions for the Administration Platform should be discussed. A single sign-on service would provide the easiest solution, being that all employees have access to a single set of credentials that can be used to access the Administration Platform. However, if there were incentives for creating contests, individual credentials would be the way to go - it would allow us to track who has contributed what contest. I opt for the individual credentials. Although open to all employees, I'd implement higher administrative roles that can oversee and edit contests as needed.

Front-End:
A login screen with the company logo and necessary fields for validation would suffice. There would be a dashboard that displays all active contests with a sidebar. The active contests pane would display metrics like number of players, likes, shares, etc. Within the sidebar, employees would be able to visit their settings and create a contest.

Clicking the "create contest" button would route employees to a service that serves the contest creation interface. Instead of a basic form, I would break the contest creation process into a few modules.

The first would set up what the contest is, ie: the name, related assets, tagline, and a description. A second module would handle what games can be selected to participate in the contest, as not all games may be eligible. The third and last module would be components that have fields requiring data from the selected games. 
 
The components should be modular in that adding a component would request for data that is intended to be used for the contest, ie: a contest for "most games won" may only need a component for "games won" that the employee can expect and set the value of to be numerical; a "best photo" contest may only need a component for submitted files that the employee can set the value of to be a file and specify a file type; a "guess this week's biggest mover" may only need a component that expects a string value to be recorded. Whatever the case, the component would have a drop down of expected values and any subsequent drop downs if applicable (ie specifying file types). I think the most important part of setting these values is determining how the outcome is decided. There may be a few loaded selections for contest type, ie: determining highest and/or lowest value for number-based contests, a matching parameter for something like guess games, and a general type for subjective contests that require manual review.
 
There would be a field to check whether the contest is general (not involving any direct information from the games) or if the contest expects a value that can be found from communicating with the respective apis. This is crucial, as it assigns responsibility for the data, whether the Administration Platform asks consumers to supply data or if the data will be populated from the games.

Higher administrative roles can view all contests and add/edit/delete them freely.

Back-End:
The back-end would immediately verify the credentials provided. Contests would be recorded under the employee's account "ID" along with the respective properties. Each contest would be assigned a contest "ID" that the Administration Platform database could use to communicate with the databases of various games. The input received from employees during time of contest creation are queried into the Administration Platform's database with respective fields (ie: name, auto-generated ID, assets). It's important to set up queries in a modular way, such that, any created contest in the Administration Platform's database could effortlessly accept and pass dynamic values to and from individual games' databases. We would have to set up the database to explicitly form a relationship with other games apis. This is where the field for "generic" or "specified data" comes into play, as it'll let the database know whether the values are coming from the users or if the values need to be queried from individual games' databases.

Each contest would, at minimum, require:
- a name, ID, description, related assets
- a list of games that can participate
- contest specific data (ie: submitted photo, number of wins/losses, etc and what player it came from and what game, if applicable)
- prizes
- logic the contest requires
- contest start and end time

At time of contest creation, the Administration Platform's database should talk to the selected games to let them know there's a new contest. The consumer application or web app can choose what to do with the assets and how the contest data is used to notify it's users. If the contest is asking for generic data, let the user's input post directly to the Administration Platform's database, otherwise, the Administration Platform's database can source the required information from the games. At contest end, the games can use the provided contest data to remove the contest from their applications.

# Questions, Comments, Concerns, Feedback

Please feel free to respond with any of the above. Constructive criticism is appreciated.