
# BEACH SPACE
 
## Intro

Beach space allows its members to meet in real life via groups united by a common interest, which in this case, connect with people who are passionate about the beach and all its interactions such as: surfing, paddle surfing, beach volley, swimming, foot volley, In addition, organize events for beach cleaning, competitions, after works, etc.

![](https://media.giphy.com/media/mCJkHm7o6vSoAKcLY7/giphy.gif)


## Functional Description

### Use Cases

- add events
- update events
- remove eventos
- subcriber on events publication
- unsubcribe on events publication

### Wireframes

![](./final-project/doc/images/beach-space.svg)

## Technical Description

### Data Model

#### User
- id (ObjectId)
- name (String)
- usermame (String)
- email (String)
- password (String)
- events([Events])
- favorites([Favorites])

#### Event
- user (ObjectId)
- Id (ObjectId)
- creatorId(ObjectId)
- photo(String)
- title(String)
- description(String)
- date (Date)
- direction(String)
- category(String)
- participants([Participants])

![](./final-project/doc/images/data-model.svg)
