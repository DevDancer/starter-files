# Wes Bos - Learn Node

## 07

### Explaining the Design Pattern

`Design Pattern` - how you design/architect your code

M - MODEL
        Code we write + data that is stored, which accesses the database
        Everything that interacts with our database, fetches data from it (queries)

V - VIEW
        VIEW represents our Pug files, which we are using to generate our appearance
        
C - CONTROLLER
        CONTROLLER sits between the MODEL and VIEW layer and is responsible for taking data from DB and passing it to the VIEW layer