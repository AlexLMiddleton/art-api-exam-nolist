# Getting Started

| **Getting Started** | **Basics Documentation** |
|-----------------|----------------------|
|[Create a Database](#create-a-database)|[Base URL](#base-url)
|[Clone your repo](#clone-your-repo)|[Scheme](#scheme)
|[Install dependencies](#install-dependencies)|[HTTP Verbs](#http-verbs)
|[Establish environment variables](#establish-environment-variables)|[Content Types](#content-types)
|[Load your data](#load-your-data)|[Response Status Codes](#response-status-codes)
|[Start the API](#start-the-api)
|[Make your first GET call](#make-your-first-get-call-within-the-browser)
## Create a database
Database creation is simple, assuming you already have a Roo account.  To create your database, simply open your Terminal window and type `roo db add <database name>`.  For example:
```
roo db add artists-database
```
> **IMPORTANT: When you create your account, keep an eye out for these important lines:**

>**database url:** (a web address)

>**database key:** (an alphanumeric key)

>**database secret:** (an alphanumeric key)

>**Keep these accessible.  You will need them momentarily.**


If you don't presently have Roo installed, contact Trip Ottinger at tripott@awesomesauce.com to request an account.
## Clone your repo
To clone the repo, visit [https://github.com/AlexLMiddleton/art-api-exam-nolist](https://github.com/AlexLMiddleton/art-api-exam-nolist) and click the green 'Clone or download' button on the right-hand side.
Then, open your terminal and copy and paste the following into the command line:
```
git clone https://github.com/AlexLMiddleton/art-api-exam-nolist
cd art-api-exam-nolist
```
## Install dependencies
Once you've cloned the repo and switched into the directory, install your dependencies by calling `npm install` in the terminal.  This creates a package.json file in your project.

At this point, you should also run the following:
```
echo 'node_modules .env' > .gitignore
touch .env
```
The first command creates a `.gitignore` file and loads it with items you don't want to commit to Github.
The second command creates your `.env` file.
## Establish environment variables
This is where you'll use that `.env` file you just created.

Remember those `database url`, `database key`, and `database secret` items that appeared when you created your database?  Highlight all three of them and copy and paste them into your `.env` file.

Rename the `database url` to `COUCHDB_URL`.  It should look like this:

>COUCHDB_URL: https://johnq.roo.land/artists-database

Add a colon `:` and an `@` sign after the two forward-slashes.  For example:

>COUCHDB_URL: https://:@johnq.roo.land/artists-database

Now, highlight everything in your `database key` after the colon `:`.  Copy it.

Next, paste that code after the two forward-slashes and before the colon.  For example:

>COUCHDB_URL: https://ea135d2d-00d5-4dcf-873b-8b0b379df482:@johnq.roo.land/artists-database

Do the same with the `database secret`, but paste it after the colon `:` and before the `@` sign.

>COUCHDB_URL: https://ea135d2d-00d5-4dcf-873b-8b0b379df482:ee2ce0e1-9363-48d6-8885-1254f18cd258@johnq.roo.land/artists-database

Finally, you'll want to add `PORT=4000` on a new line in your file.

## Load your data
The `load-data.js` file is where we upload our bulk data to our database.  You may use the existing data as a template.

When you've finished adding your initial data, save the file and run `npm run load` in your Terminal.  If successful, it will say "Documents successfully uploaded!", along with information about each uploaded object.

## Start the API
Finally, to start the API, type `npm start` into your Terminal.  You should see a message that says "App is now listening on port 4000."

## Make your first GET call within the browser
Once your server is running, open your browser and navigate to `http://localhost:4000/`.  You should see a message that says 'Welcome to the Art API. Manage all the paintings for much win.'  Congratulations!  You've just run your first `GET`!

## Basics
## Base URL
All endpoints within the paintings are located at the following base URL:
```
http://localhost:4000/
```
Within this API, there are two main types of database entries: artists and paintings.

## Scheme
This API communicates exclusively over HTTP.

## HTTP Verbs
| Verbs   | Description | Sample Routes |
|---------|-------------|-------------|
|`POST`   | Pushes an item into the database.| /artists
|`GET`    | Retrieves an item from the database.| /artists/{id}
|`PUT`    | Updates an item in the database.| /paintings/{id}
|`DELETE` | Deletes an item from the database.| /paintings/{id}

## Content types
All endpoints within this API require JSON data.

## Response status codes
| Status code | Description|
|-------------|------------|
|`200 OK`| Your request was successful.
|`201 Created`| Your resource was created.
|`400 Bad Request`| The request failed due to an error in your content.
|`403 Forbidden`| You may not have permission to perform the action.  It could also be that the API has reached its quota.
|`404 Not Found`| The requested resource could not be found.  Check your URL and try again.
|`409 Conflict`| The action you're attempting causes a conflict.
|`500 Internal Server Error`| This is a generic error message.  It's shown when no more specific message is available.
